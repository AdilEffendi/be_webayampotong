import express from "express";
import { getSales, createSale } from "../controllers/saleController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

//sudah
router.get(
  "/sales",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  getSales
);
router.post(
  "/sales",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  createSale
);

export default router;