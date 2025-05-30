import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database.js";
import Department from "./department.model.js";

const Employee = sequelize.define(
  "Employee",
  {
    employee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.NUMERIC(9, 0),
    },
  },
  {
    tableName: "employees",
    timestamps: false,
  }
);

Department.hasMany(Employee, {
  foreignKey: "department_id",
  sourceKey: "department_id",
  as: "employees",
});

Employee.belongsTo(Department, {
  foreignKey: "department_id",
  targetKey: "department_id",
  as: "department",
});

export default Employee;
