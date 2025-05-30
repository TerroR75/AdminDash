import express from "express";
import Employee from "./models/employee.model.js";
import Task from "./models/task.model.js";
import Department from "./models/department.model.js";
import { sequelize } from "../database.js";
import { generateSampleData } from "../devutils/utils.js";

// Routes imports
import employeesRoute from "./routes/employee.route.js";
import departmentRoute from "./routes/department.route.js";

const app = express();
const port = 8080;

// Middleware
app.use(express.json()); // Obsługuje body w formacie JSON
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/employees", employeesRoute);
app.use("/departments", departmentRoute);

const initApp = async () => {
  // Test the connection.
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // UPDATE DATABASE TABLES
    await sequelize.sync({ force: true });

    // Sample data generation
    generateSampleData();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

initApp();
