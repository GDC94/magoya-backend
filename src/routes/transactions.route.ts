import { Router } from "express";
import { postTransaction } from "../controllers/postTransaction.controller";
import { schemaValidator } from "../middlewares/schemaValidator.middleware";
import { transactionZodSchema } from "../schemas/transaction.schema";

const router = Router();

router.post("/transactions", schemaValidator(transactionZodSchema), postTransaction);

export default router;
