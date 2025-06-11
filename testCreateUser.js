import User from "../webta/models/userModel.js";

(async () => {
  try {
    await User.create({
      username: "admin99",
      password: "tes12345",
      role: "karyawan",
    });
    console.log("✅ User berhasil dibuat");
  } catch (err) {
    console.error("❌ Gagal:", err.message);
  }
})();
