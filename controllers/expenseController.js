import Expense from "../models/expenseModel.js";

export const getExpense = async (req, res) => {
  try {
    const result = await Expense.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error saat GET Expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { transaction_id, category, amount, description, user_id, date } = req.body;

    // Cek apakah sudah ada expense dengan transaction_id ini
    const existing = await Expense.findOne({
      where: { transaction_id }
    });
    if (existing) {
      return res.status(409).json({ message: "Expense untuk transaksi ini sudah ada." });
    }

    // Pastikan field yang dikirim sesuai model (category, amount, transaction_id)
    const newExpense = await Expense.create({
      transaction_id,
      category,
      amount,
      // description dan user_id tidak ada di model, jadi tidak perlu disimpan
    });
    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error saat POST Expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Tambahkan update (PUT)
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { transaction_id, source, amount } = req.body;
    const updated = await Expense.update(
      { transaction_id, source, amount },
      { where: { expense_id: id } }
    );
    if (updated[0] === 0) {
      return res.status(404).json({
        message: "Expense tidak ditemukan atau tidak ada perubahan",
      });
    }
    res.json({ message: "Expense berhasil diupdate" });
  } catch (error) {
    console.error("Error saat UPDATE Expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Tambahkan delete (DELETE)
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.destroy({ where: { expense_id: id } });
    if (deleted === 0) {
      return res.status(404).json({ message: "Expense tidak ditemukan" });
    }
    res.json({ message: "Expense berhasil dihapus" });
  } catch (error) {
    console.error("Error saat DELETE Expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
