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
    status: {
      type: DataTypes.ENUM(...StatusEnum),
      allowNull: false,
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
