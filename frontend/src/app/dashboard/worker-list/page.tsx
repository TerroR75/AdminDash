"use client";

import Image from "next/image";
import { Mail, Phone, CalendarCheck, CheckCircle, Users, Monitor, Briefcase, Megaphone } from "lucide-react";

const departmentIcons: Record<string, JSX.Element> = {
  "Dział CEO": <Users className="text-white w-6 h-6" />,
  "Dział IT": <Monitor className="text-white w-6 h-6" />,
  "Dział Sprzedaży": <Briefcase className="text-white w-6 h-6" />,
  "Dział Marketingu": <Megaphone className="text-white w-6 h-6" />,
};

const departmentColors: Record<string, string> = {
  "Dział CEO": "from-blue-500 to-blue-700",
  "Dział IT": "from-purple-500 to-purple-700",
  "Dział Sprzedaży": "from-orange-500 to-orange-600",
  "Dział Marketingu": "from-pink-500 to-pink-600",
};

const departments = [
  {
    name: "Dział CEO",
    employees: [
      {
        name: "Adam Sucholski",
        email: "adam.sucholski@firma.pl",
        phone: "882 340 000",
        avatar: "/ceo.jpg",
        status: "ONLINE",
        nextEvent: "Spotkanie: Task #53453, 14:00–15:00",
        tasks: 52,
      },
    ],
  },
  {
    name: "Dział IT",
    employees: [
      {
        name: "Kamil Nowak",
        email: "kamil.nowak@firma.pl",
        phone: "883 223 000",
        avatar: "/dev1.jpg",
        status: "OFFLINE",
        nextEvent: "Praca nad funkcją – 14:00–15:00",
        tasks: 14,
      },
      {
        name: "Olga Wójcik",
        email: "olga.wojcik@firma.pl",
        phone: "885 224 000",
        avatar: "/dev2.jpg",
        status: "ONLINE",
        nextEvent: "Code review projektu X – 14:00–15:00",
        tasks: 9,
      },
    ],
  },
  {
    name: "Dział Sprzedaży",
    employees: [
      {
        name: "Michał Zieliński",
        email: "michal.zielinski@firma.pl",
        phone: "889 212 321",
        avatar: "/sales1.jpg",
        status: "ONLINE",
        nextEvent: "Spotkanie z klientem – 14:00–15:00",
        tasks: 6,
      },
    ],
  },
  {
    name: "Dział Marketingu",
    employees: [
      {
        name: "Anna Kowalska",
        email: "anna.kowalska@firma.pl",
        phone: "882 444 333",
        avatar: "/marketing1.jpg",
        status: "ONLINE",
        nextEvent: "Kampania promocyjna – Maj, 14:00–15:00",
        tasks: 12,
      },
    ],
  },
];

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
                    src={emp.avatar}
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
                    <p className="flex items-start text-gray-600 gap-1 mt-1">
                      <CalendarCheck size={14} className="mt-0.5" />
                      <span className="text-sm">{emp.nextEvent}</span>
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