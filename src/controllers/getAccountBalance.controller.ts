import { Request, Response } from "express";
import { pool } from "../db";

export const getAccountBalance = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT balance FROM accounts WHERE id = $1",
      [id]
    );
    const account = result.rows[0];

    if (account) {
      res.json({ balance: account.balance });
    } else {
      res
        .status(404)
        .json({ message: "Account not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error" });
  }
};
