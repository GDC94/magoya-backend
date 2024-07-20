import { Request, Response } from "express";
import { pool } from "../db";

export const postTransaction = async (req: Request, res: Response) => {
  try {
    const { accountNumber, type, amount } = req.body;

    if (typeof accountNumber !== 'string' || !accountNumber.trim()) {
      return res.status(400).json({ message: "Invalid account number" });
    }
    if (!["deposito", "transferencia"].includes(type)) {
      return res.status(400).json({ message: "Invalid transaction type" });
    }
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const accountQuery = await client.query(
        'SELECT * FROM accounts WHERE account_number = $1',
        [accountNumber]
      );

      if (accountQuery.rowCount === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ message: "Account not found" });
      }

      const account = accountQuery.rows[0];
      let newBalance;

      if (type === "transferencia") {
        if (Number(account.balance) < amount) {
          await client.query('ROLLBACK');
          return res.status(400).json({ message: "Insufficient balance" });
        }
        newBalance = Number(account.balance) - amount;
      } else {
        newBalance = Number(account.balance) + amount;
      }

      await client.query(
        'UPDATE accounts SET balance = $1 WHERE account_number = $2',
        [newBalance, accountNumber]
      );

      await client.query('COMMIT');

      res.status(200).json({
        message: "Transaction successful",
        newBalance: newBalance,
      });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error("Error processing transaction:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error processing transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};