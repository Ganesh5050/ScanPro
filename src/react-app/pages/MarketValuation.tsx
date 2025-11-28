import { useEffect, useState } from "react";
import { MarketValuation } from "@/shared/types";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import InsightsNav from "@/react-app/components/InsightsNav";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Activity, Plus, TrendingUp } from "lucide-react";

export default function MarketValuationPage() {
  const [valuations, setValuations] = useState<MarketValuation[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<string[]>(["NIFTY 50", "NIFTY BANK"]);
  const [activePeriod, setActivePeriod] = useState<string>("5Y");
  const [activeMetric, setActiveMetric] = useState<string>("PE Ratio");

  useEffect(() => {
    const indices = selectedIndices.join(",");
    fetch(`/api/market-valuations?indices=${indices}&period=${activePeriod}`)
      .then((res) => res.json())
      .then((data) => setValuations(data))
      .catch((err) => console.error("Error fetching market valuations:", err));
  }, [selectedIndices, activePeriod]);

  const periods = ["1M", "6M", "1Y", "5Y", "10Y"];
  const metrics = ["PE Ratio", "PB Ratio", "Dividend Yield"];

  const availableIndices = [
    { name: "NIFTY 50", value: 26215.55, change: 0.04 },
    { name: "NIFTY BANK", value: 59737.30, change: 0.35 },
    { name: "NIFTY FINANCIAL SERVICES", value: 27946.20, change: 0.53 },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  };

  const chartData = valuations.map((item) => ({
    date: formatDate(item.date),
    [item.index_name]: activeMetric === "PE Ratio" ? item.pe_ratio : 
                       activeMetric === "PB Ratio" ? item.pb_ratio : 
                       item.dividend_yield,
  }));

  // Group by date
  const groupedData = chartData.reduce((acc: any[], curr) => {
    const existing = acc.find((item) => item.date === curr.date);
    if (existing) {
      Object.assign(existing, curr);
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

  const colors = ["#06b6d4", "#8b5cf6"];

  const toggleIndex = (indexName: string) => {
    setSelectedIndices((prev) =>
      prev.includes(indexName)
        ? prev.filter((name) => name !== indexName)
        : [...prev, indexName]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InsightsNav />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Market Valuation</h1>
          </div>

          {/* Index Selection */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {availableIndices.map((index) => {
              const isSelected = selectedIndices.includes(index.name);
              return (
                <button
                  key={index.name}
                  onClick={() => toggleIndex(index.name)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm">{index.name}</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-gray-900">{index.value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                      <span className="text-green-600 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-0.5" />
                        +{index.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
            <button className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
              <Plus className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activePeriod === period
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 ml-auto">
              {metrics.map((metric) => (
                <button
                  key={metric}
                  onClick={() => setActiveMetric(metric)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeMetric === metric
                      ? "bg-white border-2 border-blue-600 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={groupedData}>
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
                <Legend />
                {selectedIndices.map((indexName, idx) => (
                  <Line
                    key={indexName}
                    type="monotone"
                    dataKey={indexName}
                    stroke={colors[idx % colors.length]}
                    strokeWidth={2}
                    dot={false}
                    name={indexName}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
