import express from "express";

// Routes imports
import EmployeesRoute from "./routes/EmployeesRoute.js";

const app = express();
const port = 8080;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Routers
app.use("/employees", EmployeesRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
