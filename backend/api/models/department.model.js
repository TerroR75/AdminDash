import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database.js";

const Department = sequelize.define(
  "Department",
  {
    department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    department_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "departments",
    timestamps: false,
  }
);

export default Department;
