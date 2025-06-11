import express from "express";
import { getIncomes, createIncome } from "../controllers/incomeController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Hanya karyawan dan pemilik usaha yang bisa akses
router.get("/incomes", verifyToken, authorizeRoles("karyawan", "pemilik usaha"), getIncomes);
router.post("/incomes", verifyToken, authorizeRoles("karyawan", "pemilik usaha"), createIncome);

export default router;
