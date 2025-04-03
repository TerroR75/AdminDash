import express from "express";
import { db } from "../database.js";

// Routes imports
import employeesRoute from "./routes/employeesRouter.js";

const app = express();
const port = 8080;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Routers
app.use("/employees", employeesRoute);

const initApp = async () => {
  // Test the connection.
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");

    app.listen(port, () => {
      console.log(`Server is running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};

initApp();
