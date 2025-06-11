import { Sequelize } from "sequelize";
import db from "../config/Connect.js";
import Customer from "./customerModel.js"; // tambahkan import ini

const { DataTypes } = Sequelize;

console.log("Memuat model Transaction..."); // log tambahan

const Transaction = db.define(
  "transactions",
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    jumlah_ayam: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Tambahkan relasi: Transaction belongsTo Customer
Transaction.belongsTo(Customer, {
  foreignKey: "customer_id",
  as: "customer",
});

console.log(
  "Transaction model loaded, fields:",
  Object.keys(Transaction.rawAttributes)
); // log tambahan

export default Transaction;
