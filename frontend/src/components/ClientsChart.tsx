"use client"

import Image from "next/image"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Styczeń', newClients: 120, activeClients: 300 },
  { name: 'Luty', newClients: 180, activeClients: 320 },
  { name: 'Marzec', newClients: 220, activeClients: 340 },
  { name: 'Kwiecień', newClients: 150, activeClients: 310 },
  { name: 'Maj', newClients: 260, activeClients: 360 },
  { name: 'Czerwiec', newClients: 300, activeClients: 390 },
  { name: 'Lipiec', newClients: 210, activeClients: 370 },
  { name: 'Sierpień', newClients: 240, activeClients: 410 },
  { name: 'Wrzesień', newClients: 280, activeClients: 420 },
  { name: 'Październik', newClients: 290, activeClients: 430 },
  { name: 'Listopad', newClients: 310, activeClients: 450 },
  { name: 'Grudzień', newClients: 350, activeClients: 470 },
];

// Tłumaczenie nazw dla tooltipa
const customTooltipFormatter = (value: number, name: string) => {
  const labelMap: Record<string, string> = {
    newClients: 'Nowi klienci',
    activeClients: 'Aktywni klienci',
  };
  return [`${value} osób`, labelMap[name] || name];
};

const ClientsChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-6">
      {/* Nagłówek */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-gray-800">Aktywność klientów</h1>
        <Image src="/moreDark.png" alt="więcej" width={20} height={20} />
      </div>

      {/* Wykres */}
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} tickLine={false} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip formatter={customTooltipFormatter} />
          <Legend
            verticalAlign="top"
            align="left"
            iconType="circle"
            wrapperStyle={{ paddingBottom: 16, fontSize: 13 }}
          />
          <Line type="monotone" dataKey="newClients" name="Nowi klienci" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="activeClients" name="Aktywni klienci" stroke="#94a3b8" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClientsChart;