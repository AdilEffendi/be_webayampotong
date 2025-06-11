import express from "express";
import {
  getDebtReceivables,
  createDebtReceivable,
  deleteDebtReceivable,
  updateDebtReceivable,
} from "../controllers/debtReceivablesController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

//usdah
router.get(
  "/debt-receivables",
  verifyToken,
  authorizeRoles("pemilik usaha", "karyawan"),
  getDebtReceivables
);
router.post(
  "/debt-receivables",
  verifyToken,
  authorizeRoles("pemilik usaha", "karyawan"),
  createDebtReceivable
);
router.delete(
  "/debt-receivables/:id",
  verifyToken,
  authorizeRoles("pemilik usaha"),
  deleteDebtReceivable
);
router.put(
  "/debt-receivables/:id",
  verifyToken,
  authorizeRoles("pemilik usaha"),
  updateDebtReceivable
);

export default router;
