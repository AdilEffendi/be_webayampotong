import express from "express";
import {
  getLivestockTransactions,
  createLivestockTransaction,
} from "../controllers/livestocktransactionController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Hanya pemilik usaha yang bisa akses semua endpoint livestock transaction
router.get(
  "/livestock-transactions",
  verifyToken,
  authorizeRoles("pemilik usaha"),
  getLivestockTransactions
);
router.post(
  "/livestock-transactions",
  verifyToken,
  authorizeRoles("pemilik usaha"),
  createLivestockTransaction
);

export default router;
