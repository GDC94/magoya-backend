import { Router } from "express";
import { createAccount } from "../controllers/createAccount.controller";
import { schemaValidator } from "../middlewares/schemaValidator.middleware";
import { accountZodSchema } from "../schemas/account.schema";

const router = Router();

router.post(
  "/account",
  schemaValidator(accountZodSchema),
  createAccount
);

export default router;
