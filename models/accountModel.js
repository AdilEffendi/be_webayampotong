import { Sequelize } from "sequelize";
import db from "../config/Connect.js";

const { DataTypes } = Sequelize;

const Account = db.define(
  "accounts",
  {
    account_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    account_name: {
      type: DataTypes.ENUM(
        "Aset (Harta)",
        "Kewajiban (Utang Usaha)",
        "Modal",
        "Pendapatan",
        "Beban"
      ),
      allowNull: false,
    },
    account_type: {
      type: DataTypes.ENUM(
        "Kas",
        "Piutang Usaha",
        "Persediaan",
        "Aset Tetap",
        "Utang Usaha",
        "Utang Bank",
        "Utang Gaji",
        "Modal Pemilik",
        "Pendapatan Penjualan",
        "Beban Pakan",
        "Beban Operasional"
      ),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Account;
