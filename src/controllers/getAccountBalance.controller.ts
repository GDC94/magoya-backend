import { Request, Response } from "express";
import { z } from "zod";

export const schemaAccount = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  initialBalance: z.number().min(1),
});

export type AccountType = z.infer<
  typeof schemaAccount
>;

// Simulando una base de datos con un objeto en memoria
const accountsDB: { [key: string]: AccountType } =
  {
    account_1: {
      id: "account_1",
      name: "John",
      initialBalance: 1000,
    },
  };

export const getAccountBalance = (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const account = accountsDB[id];
  if (account) {
    res.json({ balance: account.initialBalance });
  } else {
    res
      .status(404)
      .json({ message: "Account not found" });
  }
};
