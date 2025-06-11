import express from "express";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/accountController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Hanya admin yang bisa akses semua endpoint account
router.get(
  "/accounts",
  verifyToken,
  authorizeRoles("admin", "karyawan", "pemilik usaha"),
  getAccounts
);
router.post(
  "/accounts",
  verifyToken,
  authorizeRoles("admin", "karyawan", "pemilik usaha"),
  createAccount
);
router.put(
  "/accounts/:id",
  verifyToken,
  authorizeRoles("admin", "karyawan", "pemilik usaha"),
  updateAccount
);
router.delete(
  "/accounts/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteAccount
);

export default router;
