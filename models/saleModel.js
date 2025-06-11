import { Sequelize } from "sequelize";
import db from "../config/Connect.js";
import Transaction from "./transactionModel.js";
import Customer from "./customerModel.js";
import Livestock from "./livestockModel.js"; // Uncomment setelah tabel livestock dibuat

const { DataTypes } = Sequelize;

const Sale = db.define(
  "sales",
  {
    sale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Transaction,
        key: "transaction_id",
      },
    },
    livestock_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Livestock,
        key: "livestock_id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_per_unit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // Tidak wajib diisi
    },
    payment_method: {
      type: DataTypes.ENUM("cash", "kredit"),
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "customer_id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Sale;
