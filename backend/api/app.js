import express from "express";

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
