import DebtReceivables from "../models/debtReceivablesModel.js";

export const getDebtReceivables = async (req, res) => {
  try {
    const result = await DebtReceivables.findAll();
    // Format tanggal pada due_date: tanggal bulan tahun jam (tanpa hari)
    const mapped = result.map((item) => {
      const obj = item.toJSON ? item.toJSON() : item;
      if (obj.due_date) {
        const d = new Date(obj.due_date);
        // Format: 17 Juni 2024 14:30
        const tanggal = d.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const jam = d.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        });
        obj.due_date_formatted = `${tanggal} ${jam}`;
      }
      return obj;
    });
    res.json(mapped);
  } catch (error) {
    console.error("Error saat GET debt receivables:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createDebtReceivable = async (req, res) => {
  try {
    let { transaction_id, customer_id, type, amount, due_date, status } =
      req.body;

    // Pastikan transaction_id null jika tidak ada (bukan undefined/string kosong)
    if (!transaction_id) transaction_id = null;

    // Validasi minimal
    if (!customer_id || !type || !amount || !due_date) {
      return res.status(400).json({ message: "Data hutang tidak lengkap!" });
    }

    // Pastikan amount bertipe number/decimal
    amount = Number(amount);

    // Pastikan due_date format date & jam (jika hanya tanggal, tambahkan jam 23:59:59 agar tidak selalu jam 08:00)
    if (typeof due_date === "string") {
      // Jika hanya yyyy-mm-dd, tambahkan jam 23:59:59
      if (/^\d{4}-\d{2}-\d{2}$/.test(due_date)) {
        due_date = `${due_date}T23:59:59`;
      }
      due_date = new Date(due_date);
    }

    const newDebtReceivable = await DebtReceivables.create({
      transaction_id,
      customer_id,
      type,
      amount,
      due_date,
      status,
    });
    res.status(201).json(newDebtReceivable);
  } catch (error) {
    console.error("Error saat POST debt receivable:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// DELETE: Hapus debt receivable berdasarkan ID
export const deleteDebtReceivable = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await DebtReceivables.destroy({
      where: { debt_receivables_id: id },
    });

    if (deleted === 0) {
      return res
        .status(404)
        .json({ message: "Debt receivable tidak ditemukan" });
    }

    res.json({ message: "Debt receivable berhasil dihapus" });
  } catch (error) {
    console.error("Error saat DELETE debt receivable:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE: Update debt receivable berdasarkan ID
export const updateDebtReceivable = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, status } = req.body;

    // Hanya update amount dan status
    const updated = await DebtReceivables.update(
      { amount, status },
      { where: { debt_receivables_id: id } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({
        message: "Debt receivable tidak ditemukan atau tidak ada perubahan",
      });
    }

    res.json({ message: "Debt receivable berhasil diupdate" });
  } catch (error) {
    console.error("Error saat UPDATE debt receivable:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
