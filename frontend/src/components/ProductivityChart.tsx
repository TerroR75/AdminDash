"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

const data = [
  { name: "Pon", alltask: 40, goodtask: 24 },
  { name: "Wto", alltask: 40, goodtask: 20 },
  { name: "Śro", alltask: 40, goodtask: 20 },
  { name: "Czw", alltask: 40, goodtask: 0 },
  { name: "Pią", alltask: 40, goodtask: 24 },
];

const totalTasks = data.reduce((sum, day) => sum + day.alltask, 0);
const completedTasks = data.reduce((sum, day) => sum + day.goodtask, 0);
const completionPercent = Math.round((completedTasks / totalTasks) * 100);

const ProductivityChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-900">📊 Produktywność</h1>
        <Image src="/moreDark.png" alt="więcej" width={20} height={20} />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <YAxis
              tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                borderColor: "#e5e7eb",
                backgroundColor: "#f9fafb",
                color: "#111827",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ fontWeight: "bold", color: "#111827" }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{
                paddingTop: 10,
                fontSize: 13,
                color: "#374151",
              }}
            />
            <Bar
              dataKey="alltask"
              fill="#60a5fa" // blue-400
              radius={[6, 6, 0, 0]}
              name="Wszystkie zadania"
            />
            <Bar
              dataKey="goodtask"
              fill="#10b981" // emerald-500
              radius={[6, 6, 0, 0]}
              name="Zrealizowane"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 text-sm text-center text-gray-700">
        Zrealizowano{" "}
        <span className="font-semibold text-gray-900">
          {completedTasks} z {totalTasks}
        </span>{" "}
        zadań –{" "}
        <span className="font-bold text-emerald-500">
          {completionPercent}% planu
        </span>
      </div>
    </div>
  );
};

export default ProductivityChart;