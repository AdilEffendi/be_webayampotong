import express from "express";
import {
  getInvoices,
  createInvoice,
  deleteInvoice,
  updateInvoice,
} from "../controllers/invoiceController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Hanya karyawan dan pemilik usaha yang bisa akses semua endpoint invoice
router.get(
  "/invoices",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  getInvoices
);
router.post(
  "/invoices",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  createInvoice
);
router.delete(
  "/invoices/:id",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  deleteInvoice
);
router.put(
  "/invoices/:id",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  updateInvoice
);

export default router;