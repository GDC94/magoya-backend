import { Request, Response } from "express";
import { pool } from "../db";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { name, initialBalance, accountNumber } = req.body;

    const result = await pool.query(
      `INSERT INTO accounts (name, account_number, balance) 
       VALUES ($1, $2, $3) RETURNING *`,
      [name, accountNumber, initialBalance]
    );

    const newAccount = result.rows[0];

    res.status(201).json({
      id: newAccount.id,
      name: newAccount.name,
      accountNumber: newAccount.account_number,
      initialBalance: newAccount.balance,
      createdAt: newAccount.created_at
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};