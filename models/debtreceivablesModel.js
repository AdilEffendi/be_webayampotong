import { Sequelize } from "sequelize";
import db from "../config/Connect.js";
import Transaction from "./transactionModel.js";
import Customer from "./customerModel.js";

const { DataTypes } = Sequelize;

const DebtReceivables = db.define(
  "debt_receivables",
  {
    debt_receivables_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Ubah dari false ke true agar boleh null
      references: {
        model: Transaction,
        key: "transaction_id",
      },
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "customer_id",
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default DebtReceivables;
