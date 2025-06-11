import { DataTypes } from "sequelize";
import sequelize from "../config/Connect.js";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        // Cegah token tersimpan di kolom password
        if (value.startsWith("eyJ")) {
          throw new Error("Password tidak boleh berupa token JWT");
        }
        // Hash password sebelum disimpan
        const hashed = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hashed);
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export default User;
