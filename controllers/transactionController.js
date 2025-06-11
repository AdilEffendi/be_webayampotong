import Transaction from "../models/transactionModel.js";
import Income from "../models/incomeModel.js";
import Expense from "../models/expenseModel.js";
import DebtReceivable from "../models/debtReceivablesModel.js";
import LivestockTransaction from "../models/livestockTransactionModel.js";
import Sale from "../models/saleModel.js";
import Livestock from "../models/livestockModel.js";
import Customer from "../models/customerModel.js";

export const getTransactions = async (req, res) => {
  try {
    const result = await Transaction.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["customer_id", "name"],
        },
      ],
    });
    const mapped = result.map((trx) => {
      const trxObj = trx.toJSON();
      trxObj.customer_name = trxObj.customer ? trxObj.customer.name : null;
      if (trxObj.date) {
        const d = new Date(trxObj.date);
        const hari = d.toLocaleDateString("id-ID", { weekday: "long" });
        const tanggal = d.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const jam = d.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        });
        trxObj.date_formatted = `${tanggal}, ${hari} ${jam}`;
      }
      return trxObj;
    });
    res.json(mapped);
  } catch (error) {
    console.error("Error saat GET transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const {
      amount,
      date,
      type,
      category,
      description,
      user_id,
      account_id,
      source,
      customer_id,
      jumlah_ayam,
      status, // ambil status dari body jika ada
    } = req.body;

    // Validasi minimal
    if (amount === undefined || !date || !type || !user_id || !account_id) {
      return res.status(400).json({ message: "Data transaksi tidak lengkap!" });
    }

    // Pastikan amount bertipe number/decimal
    const amountNum = Number(amount);

    // Pastikan date format date
    const dateObj =
      typeof date === "string" && date.length === 10 ? new Date(date) : date;

    // Pastikan account_id number
    const accountIdNum = Number(account_id);

    // Pastikan customer_id number/null
    let customerIdNum = null;
    if (
      customer_id !== undefined &&
      customer_id !== "" &&
      customer_id !== null
    ) {
      customerIdNum = Number(customer_id);
    }

    // Set status: jika status dikirim dari frontend, gunakan itu, jika tidak dan type Income serta kategori Penjualan Kredit, set "kredit"
    let trxStatus = status;
    if (
      !trxStatus &&
      type === "Income" &&
      req.body.tipe_pembayaran === "Kredit"
    ) {
      trxStatus = "kredit";
    }
    if (
      !trxStatus &&
      type === "Income" &&
      req.body.tipe_pembayaran === "Non-Kredit"
    ) {
      trxStatus = "non-kredit";
    }

    // Buat transaksi
    const newTransaction = await Transaction.create({
      amount: amountNum,
      date: dateObj,
      type,
      category,
      description,
      user_id,
      account_id: accountIdNum,
      source,
      customer_id: customerIdNum,
      jumlah_ayam,
      status: trxStatus,
    });

    // Hanya buat expense jika type Expense dan belum ada expense untuk transaksi ini
    if (type === "Expense" || type === "expense") {
      // Cek apakah sudah ada expense untuk transaction_id ini
      const existingExpense = await Expense.findOne({
        where: { transaction_id: newTransaction.transaction_id },
      });
      if (!existingExpense) {
        await Expense.create({
          transaction_id: newTransaction.transaction_id,
          amount,
          category,
          description,
          user_id,
          date,
        });
      }
    }

    // Hanya buat income jika type Income dan status bukan kredit DAN belum ada income untuk transaksi ini
    if (
      (type === "Income" || type === "income") &&
      trxStatus !== "kredit"
    ) {
      const existingIncome = await Income.findOne({
        where: { transaction_id: newTransaction.transaction_id },
      });
      if (!existingIncome) {
        await Income.create({
          transaction_id: newTransaction.transaction_id,
          source: source || category || description || "",
          amount: amountNum,
          category: category || "",
        });
      }
    }

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error saat POST transaction:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete request for transaction_id:", id);

    await Income.destroy({ where: { transaction_id: id } });
    await Expense.destroy({ where: { transaction_id: id } });
    await DebtReceivable.destroy({ where: { transaction_id: id } });
    await LivestockTransaction.destroy({ where: { transaction_id: id } });
    await Sale.destroy({ where: { transaction_id: id } });

    const deleted = await Transaction.destroy({
      where: { transaction_id: id },
    });
    if (deleted === 0) {
      console.log("Transaksi tidak ditemukan untuk id:", id);
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }
    res.json({ message: "Transaksi berhasil dihapus" });
  } catch (error) {
    console.error("Error saat DELETE transaction:", error);
    res
      .status(500)
      .json({ message: "Gagal menghapus transaksi", error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    let {
      date,
      type,
      amount,
      description,
      user_id,
      account_id,
      category,
      customer_id,
    } = req.body;

    // Pastikan customer_id null jika kosong atau undefined
    if (customer_id === "" || customer_id === undefined) {
      customer_id = null;
    } else {
      customer_id = Number(customer_id);
    }

    const updated = await Transaction.update(
      {
        date,
        type,
        amount,
        description,
        user_id,
        account_id,
        category,
        customer_id,
      },
      { where: { transaction_id: id } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({
        message: "Transaksi tidak ditemukan atau tidak ada perubahan",
      });
    }

    if (type === "Income" || type === "income") {
      await Income.update(
        {
          amount,
          source: description,
        },
        { where: { transaction_id: id } }
      );
    }

    if (type === "Expense" || type === "expense") {
      await Expense.update(
        {
          amount,
          category: description,
        },
        { where: { transaction_id: id } }
      );
    }

    res.json({ message: "Transaksi berhasil diupdate" });
  } catch (error) {
    console.error("Error saat UPDATE transaction:", error);
    res
      .status(500)
      .json({ message: "Gagal mengupdate transaksi", error: error.message });
  }
};
