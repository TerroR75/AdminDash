import express from "express";
import * as employeesController from "../controllers/employee.controller.js";

export const employeesRoute = express.Router();

// Routes
employeesRoute.get("/", employeesController.getAll);

export default employeesRoute;
