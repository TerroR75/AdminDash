"use client";

import { Calendar, dateFnsLocalizer, Event as RBCEvent } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { pl } from "date-fns/locale";
import { useState } from "react";
import { addHours } from "date-fns";

const locales = { pl };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

type EventType = {
  title: string;
  start: Date;
  end: Date;
};

const initialEvents: EventType[] = [
  {
    title: "Daily Standup",
    start: new Date(2025, 4, 5, 9, 0),
    end: new Date(2025, 4, 5, 9, 30),
  },
  {
    title: "Sprint Planning",
    start: new Date(2025, 4, 6, 11, 0),
    end: new Date(2025, 4, 6, 12, 30),
  },
];

const BigCalendar = () => {
  const [events, setEvents] = useState<EventType[]>(initialEvents);

  const handleSelectSlot = ({ start }: { start: Date }) => {
    const title = prompt("Podaj tytuł wydarzenia:");
    if (title) {
      const end = addHours(start, 1);
      setEvents((prev) => [...prev, { title, start, end }]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-[800px]">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📆 Plan tygodnia</h2>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={["week"]}
        startAccessor="start"
        endAccessor="end"
        step={30}
        timeslots={2}
        style={{ height: "700px" }}
        selectable
        onSelectSlot={handleSelectSlot}
        messages={{
          next: "Następny",
          previous: "Poprzedni",
          today: "Dziś",
          month: "Miesiąc",
          week: "Tydzień",
          day: "Dzień",
          date: "Data",
          time: "Czas",
          event: "Wydarzenie",
          noEventsInRange: "Brak wydarzeń w tym zakresie",
        }}
        min={new Date(2025, 0, 1, 7, 0)}   // dzień zaczyna się o 7:00
        max={new Date(2025, 0, 1, 20, 0)}  // dzień kończy się o 20:00
        popup
      />
    </div>
  );
};

export default BigCalendar;