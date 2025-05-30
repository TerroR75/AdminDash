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

const EmployeeTasksPage = () => {
  const loggedUserEmail = "kamil.nowak@firma.pl"; // aktualnie zalogowany
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formAssignedTo, setFormAssignedTo] = useState(employees[0].email);
  const [formDescription, setFormDescription] = useState("");
  const [formDeadline, setFormDeadline] = useState("");

  const [showReassignModal, setShowReassignModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [newAssignee, setNewAssignee] = useState(employees[0].email);

  // Dodanie przykładowych tasków na start
  useEffect(() => {
    const exampleTasks: Task[] = [
      {
        id: 1,
        assignedTo: loggedUserEmail,
        assignedBy: "adam.sucholski@firma.pl",
        deadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2h od teraz
        description: "Przygotuj raport miesięczny",
        status: "PENDING",
      },
      {
        id: 2,
        assignedTo: loggedUserEmail,
        assignedBy: "olga.wojcik@firma.pl",
        deadline: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4h od teraz
        description: "Napraw błąd w module X",
        status: "PENDING",
      },
    ];
    setTasks(exampleTasks);
  }, []);

  const handleAddTask = () => {
    if (!formDescription || !formDeadline) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    const newTask: Task = {
      id: tasks.length + 1,
      assignedTo: formAssignedTo,
      assignedBy: loggedUserEmail,
      deadline: formDeadline,
      description: formDescription,
      status: "PENDING",
    };

    setTasks((prev) => [...prev, newTask]);
    setFormDescription("");
    setFormDeadline("");
    setFormAssignedTo(employees[0].email);
    alert("Task dodany!");
  };

  const handleComplete = (taskId: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "COMPLETED" } : t))
    );
  };

  const handleReject = (taskId: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "REJECTED" } : t))
    );
  };

  const openReassignModal = (taskId: number) => {
    setSelectedTaskId(taskId);
    setNewAssignee(employees[0].email);
    setShowReassignModal(true);
  };

  const confirmReassign = () => {
    if (selectedTaskId != null) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTaskId
            ? { ...t, assignedTo: newAssignee, status: "REASSIGNED" }
            : t
        )
      );
      setShowReassignModal(false);
      alert(`Task ${selectedTaskId} przekazano do ${newAssignee}`);
    }
  };

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

  const visibleTasks = tasks.filter((t) => t.assignedTo === loggedUserEmail);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Taski dla {loggedUserEmail}</h1>

      {/* FORMULARZ DODAWANIA */}
      <div className="bg-gray-50 p-4 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-medium">Dodaj Nowy Task</h2>
        <div className="flex flex-col gap-2">
          <label>
            Przypisz do:
            <select
              value={formAssignedTo}
              onChange={(e) => setFormAssignedTo(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {employees.map((emp) => (
                <option key={emp.email} value={emp.email}>
                  {emp.name} ({emp.email})
                </option>
              ))}
            </select>
          </label>
          <label>
            Opis:
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </label>
          <label>
            Deadline:
            <input
              type="datetime-local"
              value={formDeadline}
              onChange={(e) => setFormDeadline(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </label>
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Dodaj Task
          </button>
        </div>
      </div>

      {/* LISTA TASKÓW */}
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Kto Zlecił</th>
            <th className="p-2 border">Do Kiedy</th>
            <th className="p-2 border">Opis</th>
            <th className="p-2 border">Czas do realizacji</th>
            <th className="p-2 border">Status / Akcje</th>
          </tr>
        </thead>
        <tbody>
          {visibleTasks.map((task) => (
            <tr key={task.id} className="text-center">
              <td className="p-2 border">{task.id}</td>
              <td className="p-2 border">{task.assignedBy}</td>
              <td className="p-2 border">{new Date(task.deadline).toLocaleString()}</td>
              <td className="p-2 border">{task.description}</td>
              <td className="p-2 border">
                {task.status === "PENDING"
                  ? formatDistanceToNow(new Date(task.deadline), { addSuffix: true })
                  : "-"}
              </td>
              <td className="p-2 border space-x-2">
                {task.status === "PENDING" ? (
                  <>
                    <button
                      onClick={() => handleComplete(task.id)}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      ✔️
                    </button>
                    <button
                      onClick={() => handleReject(task.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      ❌
                    </button>
                    <button
                      onClick={() => openReassignModal(task.id)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded"
                    >
                      🔄
                    </button>
                  </>
                ) : (
                  <span className={getStatusColor(task.status)}>
                    {task.status === "REASSIGNED" ? "Przekazany" : task.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL PRZEKAZANIA */}
      {showReassignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-80">
            <h2 className="text-lg font-semibold">Przekaż Task #{selectedTaskId}</h2>
            <label className="block text-sm">Przypisz do:</label>
            <select
              value={newAssignee}
              onChange={(e) => setNewAssignee(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {employees.map((emp) => (
                <option key={emp.email} value={emp.email}>
                  {emp.name} ({emp.email})
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowReassignModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Anuluj
              </button>
              <button
                onClick={confirmReassign}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Potwierdź
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTasksPage;