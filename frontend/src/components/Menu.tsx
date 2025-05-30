"use client";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiCalendar,
  FiCheckSquare,
  FiMessageSquare,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiClipboard,
  FiCheck,
} from "react-icons/fi";

const menuItems = [
  {
    title: "NAWIGACJA",
    items: [
      { icon: <FiHome />, label: "Strona główna", href: "/dashboard/admin", visible: ["admin", "user"] },
      { icon: <FiUsers />, label: "Pracownicy", href: "/dashboard/worker-list", visible: ["admin", "user"] },
      { icon: <FiClipboard />, label: "Projekty", href: "/dashboard/projects", visible: ["admin", "user"] },
      { icon: <FiCheckSquare />, label: "Zadania", href: "/dashboard/tasks", visible: ["admin", "user"] },
      { icon: <FiCheck />, label: "Status Zadań", href: "/dashboard/validationtasks", visible: ["admin", "user"] },
      { icon: <FiFileText />, label: "Dokumenty", href: "/dashboard/documents", visible: ["admin"] },
      { icon: <FiCalendar />, label: "Kalendarz", href: "/dashboard/calendar", visible: ["admin", "user"] },
      { icon: <FiMessageSquare />, label: "Wiadomości", href: "/dashboard/messages", visible: ["admin", "user"] },
      { icon: <FiBell />, label: "Powiadomienia", href: "/dashboard/announcements", visible: ["admin", "user"] },
      { icon: <UserPlus />, label: "Dodaj pracownika", href: "/dashboard/worker-add", visible: ["admin"] },
    ],
  },
  {
    title: "USTAWIENIA",
    items: [
      { icon: <FiUser />, label: "Profil", href: "/profile", visible: ["admin", "user"] },
      { icon: <FiSettings />, label: "Ustawienia", href: "/settings", visible: ["admin", "user"] },
      { icon: <FiLogOut />, label: "Wyloguj", href: "/logout", visible: ["admin", "user"] },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-2 px-4 text-base text-gray-700">
      {menuItems.map((section) => (
        <div className="mb-8" key={section.title}>
          <span className="hidden lg:block text-sm text-gray-400 font-semibold uppercase px-2 mb-3">
            {section.title}
          </span>
          <div className="flex flex-col gap-2">
            {section.items.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="flex items-center gap-4 hover:bg-gray-100 transition-all px-4 py-3 rounded-xl text-gray-800 font-medium"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="hidden lg:block text-base">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;