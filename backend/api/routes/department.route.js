import express from "express";
import * as departmentController from "../controllers/department.controller.js";

export const departmentRoute = express.Router();

// Routes
departmentRoute.get("/", departmentController.getAll);
departmentRoute.get("/allWithEmployees", departmentController.getAllWithEmployees);

export default departmentRoute;
