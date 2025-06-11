import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.user_id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal login", error: err.message });
  }
}

export async function register(req, res) {
  const { username, password, role } = req.body;

  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    const newUser = await User.create({
      username,
      password,
      role: role || "user",
    });

    res.status(201).json({
      message: "User berhasil dibuat",
      user: {
        id: newUser.user_id,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat user", error: err.message });
  }
}
