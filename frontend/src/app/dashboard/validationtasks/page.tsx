"use client";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

interface Task {
  id: number;
  assignedTo: string;
  assignedBy: string;
  deadline: string;
  description: string;
  status: "PENDING" | "REJECTED" | "COMPLETED" | "REASSIGNED" | string;
}

const employees = [
  { name: "Adam Sucholski", email: "adam.sucholski@firma.pl" },
  { name: "Kamil Nowak", email: "kamil.nowak@firma.pl" },
  { name: "Olga Wójcik", email: "olga.wojcik@firma.pl" },
  { name: "Michał Zieliński", email: "michal.zielinski@firma.pl" },
  { name: "Anna Kowalska", email: "anna.kowalska@firma.pl" },
];

const MyOrdersPage = () => {
  const loggedUserEmail = "kamil.nowak@firma.pl"; // aktualnie zalogowany
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const exampleTasks: Task[] = [
      {
        id: 1,
        assignedTo: "adam.sucholski@firma.pl",
        assignedBy: loggedUserEmail,
        deadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        description: "Przygotuj raport miesięczny",
        status: "COMPLETED",
      },
      {
        id: 2,
        assignedTo: "olga.wojcik@firma.pl",
        assignedBy: loggedUserEmail,
        deadline: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        description: "Napraw błąd w module X",
        status: "PENDING",
      },
      {
        id: 3,
        assignedTo: "michal.zielinski@firma.pl",
        assignedBy: loggedUserEmail,
        deadline: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
        description: "Zaktualizuj dokumentację",
        status: "REJECTED",
      },
    ];
    setTasks(exampleTasks);
  }, []);

  const myOrders = tasks.filter((t) => t.assignedBy === loggedUserEmail);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-600 font-semibold";
      case "REJECTED":
        return "text-red-600 font-semibold";
      case "REASSIGNED":
        return "text-yellow-600 font-semibold";
      case "PENDING":
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
          {myOrders.map((task) => (
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