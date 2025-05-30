"use client";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  assignedTo: string;
  assignedBy: string;
  deadline: string;
  description: string;
  status: "PENDING" | "REJECTED" | "COMPLETED" | "REASSIGNED" | string;
}

const MyOrdersPage = () => {
  const loggedUserEmail = "jan.kowalski@example.com"; // aktualnie zalogowany
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchUzytkownicy = async () => {
      try {
        const response = await fetch('http://localhost:8080/tasks/created-by/2'); // lub '/api/uzytkownicy' z proxy
        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data)
        setTasks(data);
      } catch (err: any) {
        console.log(err.message);
      } finally {
      }
    };

    fetchUzytkownicy();
  }, []);

  const myOrders = tasks.filter((t) => t.assignedBy === loggedUserEmail);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "GOTOWE":
        return "text-green-600 font-semibold";
      case "ZABLOKOWANE":
        return "text-red-600 font-semibold";
      case "W TRAKCIE":
        return "text-yellow-600 font-semibold";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Moje Zlecenia ({loggedUserEmail})</h1>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Przypisano do</th>
            <th className="p-2 border">Deadline</th>
            <th className="p-2 border">Opis</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="text-center">
              <td className="p-2 border">{task.id}</td>
              <td className="p-2 border">{task.assignedTo}</td>
              <td className="p-2 border">{new Date(task.deadline).toLocaleString()}</td>
              <td className="p-2 border">{task.description}</td>
              <td className={`p-2 border ${getStatusColor(task.status)}`}>
                {task.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrdersPage;