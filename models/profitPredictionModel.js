import { Sequelize } from "sequelize";
import db from "../config/Connect.js";
import User from "./userModel.js";
import Transaction from "./transactionModel.js";

const { DataTypes } = Sequelize;

const ProfitPrediction = db.define(
  "profit_prediction",
  {
    profit_prediction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    predicted_profit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    actual_profit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // Boleh kosong kalau belum ada data aktual
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Boleh kosong kalau tidak terkait transaksi
      references: {
        model: Transaction,
        key: "transaction_id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default ProfitPrediction;
