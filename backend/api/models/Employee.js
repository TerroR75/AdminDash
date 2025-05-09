import { db } from "../../database";

const Employee = db.define(
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
    department: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...RolaEnum),
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

export default Employee;
