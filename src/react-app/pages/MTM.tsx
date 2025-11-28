import { useEffect, useState } from "react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import InsightsNav from "@/react-app/components/InsightsNav";
import { Target, TrendingUp, TrendingDown } from "lucide-react";

interface MTMData {
  id: number;
  symbol: string;
  name: string;
  ltp: number;
  open_interest: number;
  oi_change: number;
  volume: number;
  implied_volatility: number;
  pcr: number;
  max_pain: number;
}

export default function MTMPage() {
  const [mtmData, setMtmData] = useState<MTMData[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Nifty");

  useEffect(() => {
    // Mock MTM data
    const mockData: MTMData[] = [
      {
        id: 1,
        symbol: "NIFTY",
        name: "Nifty 50",
        ltp: 21850.50,
        open_interest: 15234567,
        oi_change: 12.45,
        volume: 98765432,
        implied_volatility: 14.23,
        pcr: 1.15,
        max_pain: 21800,
      },
      {
        id: 2,
        symbol: "BANKNIFTY",
        name: "Bank Nifty",
        ltp: 45678.25,
        open_interest: 8765432,
        oi_change: -5.67,
        volume: 54321098,
        implied_volatility: 16.78,
        pcr: 0.98,
        max_pain: 45500,
      },
    ];
    setMtmData(mockData);
  }, [activeTab]);

  const tabs = ["Nifty", "Bank Nifty", "Fin Nifty", "Stocks"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InsightsNav />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">MTM (Mark to Market)</h1>
          </div>
          <p className="text-xl text-blue-100">Real-time options chain and max pain analysis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-2 mb-6">
          <div className="flex items-center space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {mtmData.map((data) => (
            <div
              key={data.id}
              className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6"
            >
              <h3 className="text-sm font-semibold text-gray-600 mb-2">{data.name}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">₹{data.ltp.toLocaleString("en-IN")}</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Max Pain:</span>
                <span className="text-sm font-bold text-blue-600">₹{data.max_pain.toLocaleString("en-IN")}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Options Chain Analysis</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Index</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">LTP</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Open Interest</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">OI Change %</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Volume</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">IV</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">PCR</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Max Pain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mtmData.map((data) => (
                  <tr key={data.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{data.symbol}</div>
                      <div className="text-sm text-gray-600">{data.name}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                      ₹{data.ltp.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900">
                      {(data.open_interest / 1000000).toFixed(2)}M
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {data.oi_change > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span
                          className={`font-semibold ${
                            data.oi_change > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {data.oi_change > 0 ? "+" : ""}
                          {data.oi_change.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900">
                      {(data.volume / 1000000).toFixed(2)}M
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900">
                      {data.implied_volatility.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-semibold ${
                          data.pcr > 1 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {data.pcr.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-blue-600">
                      ₹{data.max_pain.toLocaleString("en-IN")}
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
