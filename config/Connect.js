import { Sequelize } from "sequelize";

const sequelize = new Sequelize("webta", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
