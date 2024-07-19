import { transactionZodSchema } from "../schemas/transaction.schema";
import { Request, Response } from "express";


interface Account {
  id: string;
  name: string;
  initialBalance: number;
}
// Simulando una base de datos con un objeto en memoria
const accountsDB: { [key: string]: Account } = {
  account_1: { id: "account_1", name: "John", initialBalance: 1000 },
  // Add more dummy accounts if needed
};

export const postTransaction = (req: Request, res: Response) => {
  try {
    const { accountId, type, amount } = req.body;
    const account = accountsDB[accountId];

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (type === "withdraw" && account.initialBalance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    account.initialBalance =
      type === "deposit"
        ? account.initialBalance + amount
        : account.initialBalance - amount;

    res.status(200).json({ message: "Transaction successful", newBalance: account.initialBalance });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};