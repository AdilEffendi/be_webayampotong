import Livestock from "../models/livestockModel.js";

export const getLivestock = async (req, res) => {
  try {
    const result = await Livestock.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error saat GET livestock:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createLivestock = async (req, res) => {
  try {
    const { type, quantity, entry_date, exit_date } = req.body;
    const newLivestock = await Livestock.create({
      type,
      quantity,
      entry_date,
      exit_date,
    });
    res.status(201).json(newLivestock);
  } catch (error) {
    console.error("Error saat POST livestock:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE: Hapus livestock berdasarkan ID
export const deleteLivestock = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Livestock.destroy({
      where: { livestock_id: id },
    });

    if (deleted === 0) {
      return res.status(404).json({ message: "Livestock tidak ditemukan" });
    }

    res.json({ message: "Livestock berhasil dihapus" });
  } catch (error) {
    console.error("Error saat DELETE livestock:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE: Update livestock berdasarkan ID
export const updateLivestock = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, quantity, entry_date, exit_date } = req.body;

    const updated = await Livestock.update(
      { type, quantity, entry_date, exit_date },
      { where: { livestock_id: id } }
    );

    if (updated[0] === 0) {
      return res
        .status(404)
        .json({
          message: "Livestock tidak ditemukan atau tidak ada perubahan",
        });
    }

    res.json({ message: "Livestock berhasil diupdate" });
  } catch (error) {
    console.error("Error saat UPDATE livestock:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
