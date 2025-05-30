import express from "express";
import { db } from "../database.js";
import cors from 'cors';
// Routes imports
import uzytkownicyRoute from "./routes/uzytkownicy.routes.js";
import projectsRouter from './routes/projekty.routes.js';
import tasksRouter from './routes/zadania.routes.js';

export const app = express();
const port = 8080;

app.use(cors()); 
app.use(express.json()); // <-- to dodaje obsługę JSON-owego body
app.use(express.urlencoded({ extended: true })); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Routers
app.use("/users", uzytkownicyRoute);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);

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
