import express from "express";
import * as employeesController from "../controllers/employeesController.js";

export const employeesRouter = express.Router();

// Routes
employeesRouter.get("/", employeesController.getAll);

export default employeesRouter;
