"use client";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

interface Task {
  id: number;
  assignedTo: string;
  assignedBy: string;
  deadline: Date;
  description: string;
  status: "PENDING" | "REJECTED" | "COMPLETED" | "REASSIGNED" | string;
}

type Employee = {
  id:number;
  email: string;
  projects: Project[];
}

type Project = {
  id:number;
  name:string;
}

const EmployeeTasksPage = () => {
  const loggedUserEmail = "kamil.nowak@firma.pl"; // aktualnie zalogowany
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formAssignedTo, setFormAssignedTo] = useState<Employee | null>(null);
  const [formDescription, setFormDescription] = useState("");
  const [formDeadline, setFormDeadline] = useState("");
  const [selectedUserProject, setSelectedUserProject]= useState<Project | null>(null);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [newAssignee, setNewAssignee] = useState("");

  // Dodanie przykładowych tasków na start
useEffect(() => {
  const fetchUzytkownicy = async () => {
    try {
      const res = await fetch('http://localhost:8080/users/manager/2');
      const resTasks = await fetch('http://localhost:8080/tasks/user/1');
      if (!res.ok || !resTasks.ok) throw new Error(`Błąd HTTP: ${res.status}`);

      const users = await res.json();
      const tasks = await resTasks.json();
      if (!users || users.length === 0) return;

      setEmployees(users);
      console.log(tasks);
      const firstUser = users[0];
      setFormAssignedTo(firstUser);
      setTasks(tasks);
      console.log(formatDistanceToNow(new Date(tasks[0].deadline), { addSuffix: true }));
      if (firstUser.projects && firstUser.projects.length > 0) {
        setSelectedUserProject(firstUser.projects[0]);
      } else {
        setSelectedUserProject(null);
      }

    } catch (err) {
      console.error("Błąd pobierania użytkowników:", err);
    }
  };

  fetchUzytkownicy();
}, []);

  const getUserIdByEmail = (email: string) => {
    const user = employees.find((emp) => emp.email === email);
    return user?.id || null;
  };

  const handleAddTask = async () => {
    if (!formDescription || !formDeadline || !formAssignedTo || !selectedUserProject) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opis: formDescription,
          deadline: formDeadline,
          status: "do zrobienia",
          utworzone_przez: 2, // <- zamień na dynamiczne ID zalogowanego użytkownika, jeśli potrzebujesz
          projekt_id: selectedUserProject?.id, // <- ustaw odpowiedni ID projektu (możesz go też pobrać dynamicznie)
          wykonawca: getUserIdByEmail(formAssignedTo.email), // <- helper funkcja poniżej
          nazwa: `Zadanie - ${formDescription.slice(0, 20)}`,
        }),
      });

      if (!response.ok) throw new Error("Błąd podczas dodawania zadania.");

      const data = await response.json();
      console.log("Dodano zadanie:", data);

      alert("Zadanie zostało dodane!");

      setFormDescription("");
      setFormDeadline("");
      setFormAssignedTo(null);
    } catch (err: any) {
      console.error(err);
      alert("Nie udało się dodać zadania.");
    }
  };

  const handleStatusChange = async (taskId: number, newStatus: 'gotowe' | 'zablokowane') => {
  try {
    const response = await fetch(`http://localhost:8080/tasks/${taskId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error('Błąd aktualizacji statusu');
    }

    const { zadanie } = await response.json();

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: zadanie.status } : t))
    );
  } catch (err) {
    console.error(err);
    alert('Nie udało się zmienić statusu zadania');
  }
};

  const openReassignModal = (taskId: number) => {
    setSelectedTaskId(taskId);
    setNewAssignee(employees[0].email);
    setShowReassignModal(true);
  };

  const handleChangeSelectedUser = (email:string) => {
    setFormAssignedTo(employees.find((emp) => emp.email === email) || null);
  }

  const confirmReassign = async () => {
  if (selectedTaskId != null && newAssignee != null) {
    try {
      console.log(selectedTaskId, newAssignee);
      const response = await fetch(`http://localhost:8080/tasks/${selectedTaskId}/reassign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newAssigneeId: getUserIdByEmail(newAssignee)}),
      });

      if (!response.ok) {
        throw new Error('Nie udało się przypisać ponownie zadania');
      }

      const { zadanie } = await response.json();

      setTasks((prev) =>
        prev.filter((task)=> task.id != selectedTaskId)
      );

      setShowReassignModal(false);
      alert(`Zadanie ${selectedTaskId} przekazano do ${newAssignee}`);
    } catch (err) {
      console.error(err);
      alert('Błąd przypisania zadania');
    }
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

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Taski dla {loggedUserEmail}</h1>

      {/* FORMULARZ DODAWANIA */}
      <div className="bg-gray-50 p-4 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-medium">Dodaj Nowy Task</h2>
        <div className="flex flex-col gap-2">
          <label>
            Przypisz do użytkownika:
            <select
              value={formAssignedTo?.email || ""}
              onChange={(e)=> handleChangeSelectedUser(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {employees.map((emp) => (
                <option key={emp.email} value={emp.email}>
                  ({emp.email})
                </option>
              ))}
            </select>
          </label>
          
          
            <label>
              Przypisz do projektu:
              <select
                value={selectedUserProject?.id || ""}
                onChange={(e) => {
                  const selectedId = parseInt(e.target.value);
                  const foundProject = formAssignedTo?.projects.find((project) => project.id === selectedId);
                  setSelectedUserProject(foundProject || null);
                }}
                className="w-full p-2 border rounded"
              >
                <option value="">Wybierz projekt</option>
                {!!formAssignedTo?.projects
                  ? formAssignedTo.projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))
                  : <option disabled>Brak projektów</option>
                }
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
          {tasks.map((task) => (
            <tr key={task.id} className="text-center">
              <td className="p-2 border">{task.id}</td>
              <td className="p-2 border">{task.assignedBy}</td>
              <td className="p-2 border">{new Date(task.deadline).toLocaleString()}</td>
              <td className="p-2 border">{task.description}</td>
              <td className="p-2 border">
                {task.status === "do zrobienia"
                  ? formatDistanceToNow(new Date(task.deadline), { addSuffix: true })
                  : "-"}
              </td>
              <td className="p-2 border space-x-2">
                {task.status === "do zrobienia" ? (
                  <>
                    <button
                      onClick={() => handleStatusChange(task.id, 'gotowe')}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      ✔️
                    </button>
                    <button
                      onClick={() => handleStatusChange(task.id, 'zablokowane')}
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
                  ({emp.email})
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