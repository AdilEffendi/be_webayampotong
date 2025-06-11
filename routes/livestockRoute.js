import express from "express";
import {
  getLivestock,
  createLivestock,
  deleteLivestock,
  updateLivestock,
} from "../controllers/livestockController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

//sudah
router.get(
  "/livestock",
  verifyToken,
  authorizeRoles("pemilik usaha", "karyawan"),
  getLivestock
);
router.post(
  "/livestock",
  verifyToken,
  authorizeRoles("pemilik usaha", "karyawan"),
  createLivestock
);
router.delete(
  "/livestock/:id",
  verifyToken,
  authorizeRoles("pemilik usaha", "karyawan"),
  deleteLivestock
);
router.put(
  "/livestock/:id",
  verifyToken,
  authorizeRoles("pemilik usaha", "karyawan"),
  updateLivestock
);

export default router;
