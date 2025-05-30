export const fetchDepartmentsWithEmployees = async () => {
  try {
    const response = await fetch("/api/departments");
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};
