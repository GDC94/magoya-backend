import { z } from "zod";

export const accountZodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    initialBalance: z.string().min(1, "Initial balance is required"),
    accountNumber: z.string().min(1, "Account number is required"),
  });