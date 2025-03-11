import express from "express";
import * as EmployeesController from "../controllers/EmployeesController.js";

export const EmployeesRouter = express.Router();

// Routes
EmployeesRouter.get("/", EmployeesController.getAll);

export default EmployeesRouter;
