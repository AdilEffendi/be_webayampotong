import Income from "../models/incomeModel.js";
import Transaction from "../models/transactionModel.js";
import Customer from "../models/customerModel.js";

export const getIncomes = async (req, res) => {
  try {
    // JOIN ke Transaction dan Customer agar dapat nama pelanggan
    const result = await Income.findAll({
      include: [
        {
          model: Transaction,
          as: "transaction",
          include: [
            {
              model: Customer,
              as: "customer",
              attributes: ["customer_id", "name"],
            },
          ],
        },
      ],
    });
    // Format agar ada customer_name dan customer_id di response
    const mapped = result.map((income) => {
      const obj = income.toJSON ? income.toJSON() : income;
      obj.customer_name =
        obj.transaction && obj.transaction.customer
          ? obj.transaction.customer.name
          : null;
      obj.customer_id =
        obj.transaction && obj.transaction.customer
          ? obj.transaction.customer.customer_id
          : null;
      return obj;
    });
    res.json(mapped);
  } catch (error) {
    console.error("Error saat GET income:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createIncome = async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug
    const {
      source,
      amount,
      user_id,
      account_id,
      category,
      description,
      jumlah_ayam,
      status,
      customer_id, // pastikan ambil dari body
    } = req.body;

    // Simpan category & jumlah_ayam ke Transaction
    // Hanya buat Transaction jika memang tidak ada transaction_id (misal pembayaran hutang)
    let newTransaction = null;
    if (!req.body.transaction_id) {
      newTransaction = await Transaction.create({
        date: new Date(),
        type: "Income",
        amount: amount,
        description: description,
        user_id: user_id,
        account_id: account_id,
        category: category,
        jumlah_ayam: jumlah_ayam,
        status: status === "kredit" ? "kredit" : "non-kredit",
        customer_id: customer_id || null, // tambahkan customer_id ke transaksi
      });
    }
    // Simpan juga category ke Income jika model mendukung
    const newIncome = await Income.create({
      transaction_id: newTransaction
        ? newTransaction.transaction_id
        : req.body.transaction_id,
      source,
      amount,
      category,
    });

    res.status(201).json({ transaction: newTransaction, income: newIncome });
  } catch (error) {
    console.error("Error saat POST Income:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
