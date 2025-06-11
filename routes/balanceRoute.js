import express from "express";
import { getBalance, getBalanceSummary } from "../controllers/balanceController.js";

const router = express.Router();
router.get("/balance", getBalance);
// Route baru:
router.get("/balance/summary", getBalanceSummary);

export default router;
