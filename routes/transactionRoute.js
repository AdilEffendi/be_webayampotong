import express from "express";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction, // tambahkan ini
} from "../controllers/transactionController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/transactions",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  getTransactions
);
router.post(
  "/transactions",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  (req, res, next) => {
    console.log("POST /transactions route called, body:", req.body);
    next();
  },
  createTransaction
);
router.delete(
  "/transactions/:id",
  verifyToken,
  authorizeRoles("pemilik usaha"),
  deleteTransaction
);
// Tambahkan route update:
router.put(
  "/transactions/:id",
  verifyToken,
  authorizeRoles("pemilik usaha"),
  updateTransaction
);

export default router;
