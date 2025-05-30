"use client";

import Image from "next/image";
import { FaUserCheck, FaClipboardCheck, FaClock, FaCheckCircle } from "react-icons/fa";

const cardData = [
  {
    title: "Online teraz",
    value: 12,
    icon: <FaUserCheck className="text-green-400 text-xl" />,
    bg: "bg-gray-500",
  },
  {
    title: "Zadania dzisiaj",
    value: 34,
    icon: <FaClipboardCheck className="text-blue-400 text-xl" />,
    bg: "bg-red-200",
  },
  {
    title: "Oczekujące walidacje",
    value: 5,
    icon: <FaClock className="text-yellow-400 text-xl" />,
    bg: "bg-gray-200",
  },
  {
    title: "Zadania w tygodniu",
    value: 174,
    icon: <FaCheckCircle className="text-emerald-400 text-xl" />,
    bg: "bg-blue-200",
  },
];

const Cominfo = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cardData.map((item, i) => (
        <div
          key={i}
          className={`rounded-2xl p-5 ${item.bg} shadow-md text-white flex flex-col gap-2`}
        >
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">{item.title}</div>
            {item.icon}
          </div>
          <div className="text-3xl font-bold">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Cominfo;