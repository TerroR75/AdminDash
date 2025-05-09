"use client";
import Image from 'next/image';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const data = [
  { month: 'Sty', revenue: 4000, expense: 2400 },
  { month: 'Lut', revenue: 3000, expense: 1398 },
  { month: 'Mar', revenue: 5000, expense: 3200 },
  { month: 'Kwi', revenue: 4780, expense: 3908 },
  { month: 'Maj', revenue: 5890, expense: 4800 },
  { month: 'Cze', revenue: 4390, expense: 3800 }
];

const FinancialChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Finanse</h3>
        <Image src="/more.png" alt="więcej" width={20} height={20} />
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#d1d5db', fontSize: 12 }} />
            <Line type="monotone" dataKey="revenue" stroke="#60a5fa" strokeWidth={3} />
            <Line type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialChart;