import Income from "../models/incomeModel.js";
import Expense from "../models/expenseModel.js";
import Transaction from "../models/transactionModel.js";
import { Op } from "sequelize";

export const getBalance = async (req, res) => {
  try {
    const totalIncome = (await Income.sum("amount")) || 0;
    const totalExpense = (await Expense.sum("amount")) || 0;
    const balance = totalIncome - totalExpense;

    res.json({
      total_income: totalIncome,
      total_expense: totalExpense,
      balance,
    });
  } catch (error) {
    console.error("Error saat hitung saldo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Endpoint baru: /balance/summary?mode=day|week|month&date=YYYY-MM-DD
export const getBalanceSummary = async (req, res) => {
  try {
    const { mode = "day", date } = req.query;
    if (!date) return res.status(400).json({ message: "Parameter date wajib diisi" });

    // Hitung rentang tanggal
    const start = new Date(date);
    let end = new Date(date);
    if (mode === "day") {
      end.setHours(23, 59, 59, 999);
    } else if (mode === "week") {
      // Cari hari Senin minggu ini
      const day = start.getDay() || 7;
      const monday = new Date(start);
      monday.setDate(start.getDate() - day + 1);
      monday.setHours(0, 0, 0, 0);
      start.setTime(monday.getTime());
      end = new Date(monday);
      end.setDate(monday.getDate() + 6);
      end.setHours(23, 59, 59, 999);
    } else if (mode === "month") {
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setMonth(start.getMonth() + 1);
      end.setDate(0);
      end.setHours(23, 59, 59, 999);
    }

    // Filter income berdasarkan tanggal Transaction
    const incomeRows = await Income.findAll({
      include: [{
        model: Transaction,
        as: "transaction",
        where: {
          date: {
            [Op.between]: [start, end],
          },
        },
        attributes: [],
      }],
    });
    const totalIncome = incomeRows.reduce((sum, i) => sum + Number(i.amount), 0);

    // Filter expense berdasarkan tanggal Transaction
    const expenseRows = await Expense.findAll({
      include: [{
        model: Transaction,
        as: "transaction",
        where: {
          date: {
            [Op.between]: [start, end],
          },
        },
        attributes: [],
      }],
    });
    const totalExpense = expenseRows.reduce((sum, e) => sum + Number(e.amount), 0);

    const balance = totalIncome - totalExpense;

    res.json({
      total_income: totalIncome,
      total_expense: totalExpense,
      balance,
      start: start.toISOString(),
      end: end.toISOString(),
    });
  } catch (error) {
    console.error("Error saat hitung saldo summary:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
