import { Sequelize } from "sequelize";
import db from "../config/Connect.js";
import Sale from "./saleModel.js";
import Customer from "./customerModel.js";

const { DataTypes } = Sequelize;

const Invoice = db.define(
  "invoices",
  {
    invoice_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Sale,
        key: "sale_id",
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

export default Invoice;
