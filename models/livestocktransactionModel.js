import { Sequelize } from "sequelize";
import db from "../config/Connect.js";
import Livestock from "./livestockModel.js";
import Transaction from "./transactionModel.js";

const { DataTypes } = Sequelize;

const LivestockTransaction = db.define(
  "livestock_transactions",
  {
    livestock_transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    livestock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Livestock,
        key: "livestock_id",
      },
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Transaction,
        key: "transaction_id",
      },
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default LivestockTransaction;
