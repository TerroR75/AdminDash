import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database.js";

const Task = sequelize.define(
  "Task",
  {
    task_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descr: {
      type: DataTypes.TEXT,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    modified_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "tasks",
    timestamps: false,
  }
);

export default Task;
