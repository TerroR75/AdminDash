"use client";
import { useState } from "react";
import { BellIcon, AlertTriangleIcon, InfoIcon, CalendarIcon } from "lucide-react";

type AnnouncementType = "info" | "alert" | "event" | "update";

type Announcement = {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  type: AnnouncementType;
};

const typeStyles: Record<AnnouncementType, { bg: string; icon: JSX.Element }> = {
  info: {
    bg: "bg-blue-100",
    icon: <InfoIcon className="text-blue-600" size={20} />,
  },
  alert: {
    bg: "bg-red-100",
    icon: <AlertTriangleIcon className="text-red-600" size={20} />,
  },
  event: {
    bg: "bg-green-100",
    icon: <CalendarIcon className="text-green-600" size={20} />,
  },
  update: {
    bg: "bg-yellow-100",
    icon: <BellIcon className="text-yellow-600" size={20} />,
  },
};

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Nowy sprint",
      content: "W poniedziałek rozpoczynamy nowy sprint projektowy.",
      date: "2025-05-01",
      author: "Adam Sucholski",
      type: "event",
    },
    {
      id: 2,
      title: "Zmiana polityki urlopowej",
      content: "Od czerwca obowiązują nowe zasady przyznawania urlopów.",
      date: "2025-05-03",
      author: "Dział HR",
      type: "alert",
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    author: "",
    type: "info" as AnnouncementType,
  });

  const handleAddAnnouncement = () => {
    const { title, content, author, type } = newAnnouncement;
    if (!title || !content || !author) return;

    const newAnn: Announcement = {
      id: announcements.length + 1,
      title,
      content,
      author,
      type,
      date: new Date().toISOString().slice(0, 10),
    };

    setAnnouncements([newAnn, ...announcements]);
    setNewAnnouncement({ title: "", content: "", author: "", type: "info" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Panel ogłoszeń</h1>

      {/* FORMULARZ */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Dodaj ogłoszenie</h2>
        <div className="flex flex-col gap-2">
          <input
            className="border rounded-md p-2"
            placeholder="Tytuł"
            value={newAnnouncement.title}
            onChange={(e) =>
              setNewAnnouncement((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <textarea
            className="border rounded-md p-2"
            placeholder="Treść"
            value={newAnnouncement.content}
            onChange={(e) =>
              setNewAnnouncement((prev) => ({ ...prev, content: e.target.value }))
            }
          />
          <input
            className="border rounded-md p-2"
            placeholder="Autor"
            value={newAnnouncement.author}
            onChange={(e) =>
              setNewAnnouncement((prev) => ({ ...prev, author: e.target.value }))
            }
          />
          <select
            className="border rounded-md p-2"
            value={newAnnouncement.type}
            onChange={(e) =>
              setNewAnnouncement((prev) => ({
                ...prev,
                type: e.target.value as AnnouncementType,
              }))
            }
          >
            <option value="info">Informacja</option>
            <option value="alert">Alert</option>
            <option value="event">Wydarzenie</option>
            <option value="update">Aktualizacja</option>
          </select>
          <button
            onClick={handleAddAnnouncement}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Dodaj
          </button>
        </div>
      </div>

      {/* OGŁOSZENIA */}
      <div className="space-y-4">
        {announcements.map((a) => (
          <div
            key={a.id}
            className={`p-4 rounded-lg shadow flex gap-4 items-start ${typeStyles[a.type].bg}`}
          >
            <div>{typeStyles[a.type].icon}</div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-md font-semibold">{a.title}</h3>
                <span className="text-xs text-gray-600">{a.date}</span>
              </div>
              <p className="text-sm text-gray-700">{a.content}</p>
              <p className="text-xs text-gray-500 mt-1">Autor: {a.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;