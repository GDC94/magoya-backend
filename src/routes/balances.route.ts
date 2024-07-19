import { Router } from "express";
import { getAccountBalance } from "../controllers/getAccountBalance.controller";

const router = Router();

router.get(
  "/account-balance",
  getAccountBalance
);

export default router;
