import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface StockChartProps {
  data?: Array<{ date: string; price: number }>;
}

export default function StockChart({ data }: StockChartProps) {
  const chartData = data || [
    { date: "Nov 20", price: 2820 },
    { date: "Nov 21", price: 2835 },
    { date: "Nov 22", price: 2810 },
    { date: "Nov 23", price: 2845 },
    { date: "Nov 24", price: 2830 },
    { date: "Nov 25", price: 2847 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: "12px" }} />
        <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
