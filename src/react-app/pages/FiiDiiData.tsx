import { useEffect, useState } from "react";
import { FiiDiiData } from "@/shared/types";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import InsightsNav from "@/react-app/components/InsightsNav";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from "recharts";
import { Info, TrendingUp } from "lucide-react";

export default function FiiDiiDataPage() {
  const [data, setData] = useState<FiiDiiData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Equity");
  const [activeParticipant, setActiveParticipant] = useState<string>("Both FII & DII");
  const [timePeriod, setTimePeriod] = useState<string>("Last 30 Days");

  useEffect(() => {
    fetch(`/api/fii-dii-data?category=${activeCategory}&days=60`)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error("Error fetching FII/DII data:", err));
  }, [activeCategory]);

  const categories = ["Equity", "Index Future", "Index Option", "Stock Future", "Stock Options"];
  const participants = ["Both FII & DII", "FII Only", "DII Only"];
  const periods = ["Daily", "Weekly", "Monthly", "Last 30 Days"];

  const formatCurrency = (value: number) => {
    return `₹${(value / 100).toFixed(2)} Cr`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const chartData = data.slice(0, 30).reverse().map((item) => ({
    date: formatDate(item.date),
    fii: item.fii_net_cash || 0,
    dii: item.dii_net_cash || 0,
    nifty: item.nifty_50_value || 0,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InsightsNav />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">FII/DII Data</h1>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Info className="w-5 h-5" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Participant:</span>
              <select
                value={activeParticipant}
                onChange={(e) => setActiveParticipant(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500"
              >
                {participants.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  "Daily" === timePeriod ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                Daily
              </button>
              <button
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  "Weekly" === timePeriod ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                Weekly
              </button>
              <button
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  "Monthly" === timePeriod ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                Monthly
              </button>
            </div>

            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500"
            >
              {periods.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <YAxis yAxisId="left" stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="fii" fill="#f97316" name="FII" />
                <Bar yAxisId="left" dataKey="dii" fill="#8b5cf6" name="DII" />
                <Line yAxisId="right" type="monotone" dataKey="nifty" stroke="#2563eb" strokeWidth={2} name="Nifty 50" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">FII Buy Cash (Cr)</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">FII Sell Cash (Cr)</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">FII Net Cash (Cr)</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">DII Buy Cash (Cr)</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">DII Sell Cash (Cr)</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">DII Net Cash (Cr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.slice(0, 30).map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {new Date(item.date).toLocaleDateString("en-US", { 
                        year: "numeric", 
                        month: "short", 
                        day: "numeric" 
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900">
                      {item.fii_buy_cash ? formatCurrency(item.fii_buy_cash) : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900">
                      {item.fii_sell_cash ? formatCurrency(item.fii_sell_cash) : "-"}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right font-semibold ${
                      (item.fii_net_cash || 0) >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {item.fii_net_cash ? formatCurrency(item.fii_net_cash) : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900">
                      {item.dii_buy_cash ? formatCurrency(item.dii_buy_cash) : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900">
                      {item.dii_sell_cash ? formatCurrency(item.dii_sell_cash) : "-"}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right font-semibold ${
                      (item.dii_net_cash || 0) >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {item.dii_net_cash ? formatCurrency(item.dii_net_cash) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
