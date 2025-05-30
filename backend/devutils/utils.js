import Employee from "../api/models/employee.model.js";
import Department from "../api/models/department.model.js";
import { departments, employees } from "./sample.data.js";

export const generateSampleData = async () => {
  try {
    // Create sample departments
    for (const dept of departments) {
      await Department.findOrCreate({
        where: { department_name: dept.department_name },
        defaults: dept,
      });
    }

    // Create sample employees
    for (const emp of employees) {
      await Employee.findOrCreate({
        where: { email: emp.email },
        defaults: emp,
      });
    }

    console.log("Sample data generated successfully!");
  } catch (error) {
    console.error("Error generating sample data:", error);
  }
};
