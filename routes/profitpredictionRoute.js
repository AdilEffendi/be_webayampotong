import express from "express";
import {
  getProfitPredictions,
  createProfitPrediction,
  deleteProfitPrediction,
  updateProfitPrediction,
} from "../controllers/profitpredictionController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Hanya admin dan pemilik usaha yang bisa akses semua endpoint profit prediction
router.get(
  "/profit-predictions",
  verifyToken,
  authorizeRoles("admin", "pemilik usaha"),
  getProfitPredictions
);
router.post(
  "/profit-predictions",
  verifyToken,
  authorizeRoles("admin", "pemilik usaha"),
  createProfitPrediction
);
router.delete(
  "/profit-predictions/:id",
  verifyToken,
  authorizeRoles("admin", "pemilik usaha"),
  deleteProfitPrediction
);
router.put(
  "/profit-predictions/:id",
  verifyToken,
  authorizeRoles("admin", "pemilik usaha"),
  updateProfitPrediction
);

export default router;