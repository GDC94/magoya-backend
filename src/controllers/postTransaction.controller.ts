import { Request, Response } from "express";

interface Account {
  id: string;
  name: string;
  initialBalance: number;
}

const accountsDB: { [key: string]: Account } = {
  "1000": { id: "1000", name: "John", initialBalance: 1000 },
};


export const postTransaction = (req: Request, res: Response) => {
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
    const account = accountsDB[accountNumber];


    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (type === "transferencia" && account.initialBalance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }


    account.initialBalance =
      type === "deposito"
        ? account.initialBalance + amount
        : account.initialBalance - amount;


    res.status(200).json({
      message: "Transaction successful",
      newBalance: account.initialBalance,
    });
  } catch (error) {
    console.error("Error processing transaction:", error); 
    res.status(500).json({ message: "Internal server error" });
  }
};