"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Phone, Lock, User, Building2 } from "lucide-react";

const saveEmployeeToLocalStorage = (employee: any) => {
  const existing = JSON.parse(localStorage.getItem("") || "[]");
  localStorage.setItem("", JSON.stringify([...existing, employee]));
};

const AddEmployeePage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    login: "",
    password: "",
    status: "OFFLINE",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEmployee = {
      ...form,
      id: Date.now().toString(),
      events: [],
      tasks: [],
    };

    saveEmployeeToLocalStorage(newEmployee);
    router.push("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <UserPlus size={28} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Dodaj nowego pracownika</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center gap-2 border rounded-md p-2">
            <User className="text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Imię i nazwisko"
              className="flex-1 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 border rounded-md p-2">
            <Mail className="text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="flex-1 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 border rounded-md p-2">
            <Phone className="text-gray-400" size={18} />
            <input
              type="text"
              name="phone"
              placeholder="Numer telefonu"
              className="flex-1 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* Department */}
          <div className="flex items-center gap-2 border rounded-md p-2">
            <Building2 className="text-gray-400" size={18} />
            <select
              name="department"
              className="flex-1 outline-none bg-transparent"
              onChange={handleChange}
              required
            >
              <option value="">Wybierz dział</option>
              <option value="CEO">CEO</option>
              <option value="IT">IT</option>
              <option value="Sprzedaż">Sprzedaż</option>
              <option value="Marketing">Marketing</option>
              <option value="Finanse">Finanse</option>
              <option value="HR">HR</option>
            </select>
          </div>

          {/* Login */}
          <div className="flex items-center gap-2 border rounded-md p-2">
            <User className="text-gray-400" size={18} />
            <input
              type="text"
              name="login"
              placeholder="Login"
              className="flex-1 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-2 border rounded-md p-2">
            <Lock className="text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Hasło"
              className="flex-1 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
          >
            Dodaj pracownika
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;