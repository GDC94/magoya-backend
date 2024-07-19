import { z } from "zod";

export const transactionZodSchema = z.object({
  accountId: z.string().min(1, "Account ID is required"),
  type: z.enum(["deposit", "withdraw"]),
  amount: z.number().min(1, "Amount must be at least 1").nonnegative(),
});