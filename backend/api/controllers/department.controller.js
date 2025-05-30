import Department from "../models/department.model.js";
import Employee from "../models/employee.model.js";

export const getAll = async (req, res) => {
  try {
    const departments = await Department.findAll({
      attributes: ["department_id", "department_name"],
    });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching departments" });
  }
};

export const getAllWithEmployees = async (req, res) => {
  try {
    const departments = await Department.findAll({
      include: [
        {
          model: Employee,
          as: "employees",
          attributes: ["employee_id", "name", "surname", "position", "email", "phone_number"],
        },
      ],
    });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching departments with employees" });
  }
};
