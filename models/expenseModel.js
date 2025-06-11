import { Sequelize } from "sequelize";
import db from "../config/Connect.js";
import Transaction from "./transactionModel.js";
//import livestocktransaction from "./livestockTransactionModel.js";

const { DataTypes } = Sequelize;

const Expense = db.define(
  "expense",
  {
    expense_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "transactions",
        key: "transaction_id",
      },
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Tambahkan relasi Expense belongsTo Transaction
Expense.belongsTo(Transaction, {
  foreignKey: "transaction_id",
  as: "transaction",
});

export default Expense;
