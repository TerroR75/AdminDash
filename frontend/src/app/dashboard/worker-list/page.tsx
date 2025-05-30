"use client";

import Image from "next/image";
import { Mail, Phone, CalendarCheck, CheckCircle, Users, Monitor, Briefcase, Megaphone } from "lucide-react";
import { useEffect, useState } from "react";
import defaulAvatar from '../../../../public/avatar.png';

const departmentIcons: Record<string, JSX.Element> = {
  "Dział HR": <Users className="text-white w-6 h-6" />,
  "Dział IT": <Monitor className="text-white w-6 h-6" />,
  "Dział Sprzedaży": <Briefcase className="text-white w-6 h-6" />,
  "Dział Marketingu": <Megaphone className="text-white w-6 h-6" />,
};

const departmentColors: Record<string, string> = {
  "Dział HR": "from-blue-500 to-blue-700",
  "Dział IT": "from-purple-500 to-purple-700",
  "Dział Sprzedaży": "from-orange-500 to-orange-600",
  "Dział Marketingu": "from-pink-500 to-pink-600",
};

type User = {
  name: string;
  email: string;
  phone: number;
  status: string;
  tasks: number;
}

type Departments = {
  name: string;
  employees: User[];
}


const StatusBadge = ({ status }: { status: string }) => {
  const isOnline = status === "ONLINE";
  return (
    <div className="flex items-center gap-1">
      <span className={`h-2 w-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`} />
      <span className="text-xs text-gray-600">{isOnline ? "Online" : "Offline"}</span>
    </div>
  );
};

const EmployeesPage = () => {
  const [departments, setDepartments] = useState<Departments[]>([]);

  useEffect(() => {
    const fetchUzytkownicy = async () => {
      try {
        const response = await fetch('http://localhost:8080/users'); // lub '/api/uzytkownicy' z proxy
        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }
        const data = await response.json();
        setDepartments(data);
      } catch (err: any) {
        console.log(err.message);
      } finally {
      }
    };

    fetchUzytkownicy();
  }, []);

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">Zespół Firmy</h1>

      <div className="space-y-16">
        {departments.map((dept) => (
          <div key={dept.name}>
            {/* Sekcja z nagłówkiem działu */}
            <div
              className={`rounded-xl p-6 mb-6 bg-gradient-to-r text-white flex items-center justify-between shadow-md ${departmentColors[dept.name]}`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full">{departmentIcons[dept.name]}</div>
                <h2 className="text-2xl font-semibold">{dept.name}</h2>
              </div>
              <span className="text-sm opacity-90">
                Liczba pracowników: {dept.employees.length}
              </span>
            </div>

            {/* Lista pracowników */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dept.employees.map((emp, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex gap-4 items-start border border-gray-100"
                >
                  <Image
                    src={defaulAvatar}
                    alt={emp.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover border shadow"
                  />
                  <div className="flex flex-col gap-1 text-sm">
                    <h3 className="text-lg font-semibold text-gray-800">{emp.name}</h3>
                    <p className="flex items-center gap-1 text-gray-600"><Mail size={14} /> {emp.email}</p>
                    <p className="flex items-center gap-1 text-gray-600"><Phone size={14} /> {emp.phone}</p>
                    <p className="flex items-center gap-1 text-gray-600">
                      <CheckCircle size={14} /> Zadania: <span className="font-medium">{emp.tasks}</span>
                    </p>
                    
                    <div className="mt-2"><StatusBadge status={emp.status} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;