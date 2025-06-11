import LivestockTransaction from "../models/livestockTransactionModel.js";
import Livestock from "../models/livestockModel.js";

export const getLivestockTransactions = async (req, res) => {
  try {
    const result = await LivestockTransaction.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error saat GET livestock transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createLivestockTransaction = async (req, res) => {
  try {
    const { livestock_id, transaction_id, transaction_type, quantity, note } =
      req.body;

    const livestock = await Livestock.findByPk(livestock_id);
    if (!livestock) {
      return res.status(404).json({ message: "Data ternak tidak ditemukan" });
    }

    if (transaction_type === "sale") {
      if (livestock.quantity < quantity) {
        return res.status(400).json({ message: "Stok tidak mencukupi" });
      }
      livestock.quantity -= quantity;
    } else if (transaction_type === "purchase") {
      livestock.quantity += quantity;
    } else {
      return res.status(400).json({ message: "Tipe transaksi tidak valid" });
    }

    await livestock.save();

    const newLivestockTransaction = await LivestockTransaction.create({
      livestock_id,
      transaction_id,
      transaction_type,
      quantity,
      note,
    });

    res.status(201).json(newLivestockTransaction);
  } catch (error) {
    console.error("Error saat POST livestock transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
