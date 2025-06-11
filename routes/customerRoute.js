import express from "express";
import {
  getCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "../controllers/customerController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// sudah
router.get(
  "/customers",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  getCustomers
);
router.post(
  "/customers",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  createCustomer
);
router.delete(
  "/customers/:id",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  deleteCustomer
);
router.put(
  "/customers/:id",
  verifyToken,
  authorizeRoles("karyawan", "pemilik usaha"),
  updateCustomer
);

export default router;