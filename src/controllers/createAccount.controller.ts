import { Request, Response } from "express";
import { pool } from "../db";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { name, initialBalance, accountNumber } = req.body;

    if (!name || !initialBalance || !accountNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

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
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(409).json({ message: "Account number already exists" });
    }

    console.error("Error creating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};