import express from "express";
import {
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js"; // ✅ Tambah ini

const router = express.Router();

// ✅ Semua route hanya untuk admin
router.get("/user", verifyToken, authorizeRoles("admin"), getUser);
router.delete("/user/:id", verifyToken, authorizeRoles("admin"), deleteUser);
router.put("/user/:id", verifyToken, authorizeRoles("admin"), updateUser);
// Tambahkan endpoint logout (opsional, hanya untuk frontend, JWT stateless)
router.post("/logout", (req, res) => {
  // Tidak perlu hapus token di backend jika pakai JWT stateless,
  // cukup hapus token di frontend.
  res.json({ message: "Logout berhasil" });
});

export default router;
