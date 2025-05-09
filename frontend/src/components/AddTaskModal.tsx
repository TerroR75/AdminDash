"use client";
import { useState } from "react";

const users = ["Anna K.", "Marek B.", "Ola P."];

const AddTaskModal = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [receiver, setReceiver] = useState(users[0]);

  const handleSubmit = () => {
    const existing = JSON.parse(localStorage.getItem("sentTasks") || "[]");
    const newTask = {
      id: Date.now(),
      title,
      user: receiver,
      status: "assigned",
    };
    localStorage.setItem("sentTasks", JSON.stringify([...existing, newTask]));
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Dodaj nowe zadanie</h2>

        <input
          className="w-full mb-3 border px-3 py-2 rounded-md"
          placeholder="Tytuł zadania"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="w-full mb-4 border px-3 py-2 rounded-md"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        >
          {users.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-600 hover:underline">
            Anuluj
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Wyślij
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;