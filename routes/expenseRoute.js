import express from "express";
import {
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// sudah
router.get(
  "/expense",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  getExpense
);
router.post(
  "/expense",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  createExpense
);
router.put(
  "/expense/:id",
  verifyToken,
  authorizeRoles("pemilik usaha"),
  updateExpense
);
router.delete(
  "/expense/:id",
  verifyToken,
  authorizeRoles("pemilik usaha"),
  deleteExpense
);

export default router;
