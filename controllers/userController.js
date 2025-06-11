import user from "../models/userModel.js";

// GET: ambil semua data user
export const getUser = async (req, res) => {
  try {
    console.log("GET / User dipanggil");
    const result = await user.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error saat GET User:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE: hapus user berdasarkan ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log(`DELETE /user/${id} dipanggil`);

    const deleted = await user.destroy({
      where: { user_id: id },
    });

    if (deleted === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    console.error("Error saat DELETE User:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const { username, password, role } = req.body;

    const updated = await user.update(
      { username, password, role }, 
      { where: { user_id: id } }
    );

    if (updated[0] === 0) {
      return res
        .status(404)
        .json({ message: "User tidak ditemukan atau tidak ada perubahan" });
    }

    res.json({ message: "User berhasil diupdate" });
  } catch (error) {
    console.error("Error saat UPDATE User:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
