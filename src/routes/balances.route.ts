import { Router } from "express";
import { getAccountBalance } from "../controllers/getAccountBalance.controller";

const router = Router();

router.get("/account-balance/:id", getAccountBalance);

export default router;