import { z } from "zod";

export const transactionZodSchema = z.object({
  accountNumber: z.string().min(1, "Account ID is required"),
  type: z.enum(["deposito", "transferencia"]),
  amount: z.number().min(1, "Amount must be at least 1").nonnegative(),
});