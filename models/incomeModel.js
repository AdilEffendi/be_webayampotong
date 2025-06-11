import { Sequelize } from "sequelize";
import db from "../config/Connect.js";
import Transaction from "./transactionModel.js";

const { DataTypes } = Sequelize;

const Income = db.define(
  "income",
  {
    income_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "transactions", // gunakan nama tabel, bukan model
        key: "transaction_id",
      },
    },
    source: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Relasi: Income belongsTo Transaction
Income.belongsTo(Transaction, {
  foreignKey: "transaction_id",
  as: "transaction",
});

export default Income;
