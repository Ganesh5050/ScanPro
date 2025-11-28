import { useEffect, useState } from "react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { fetchIndicesData, LiveIndex } from "@/shared/marketDataService";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

export default function SectorAnalysis() {
  const [indices, setIndices] = useState<LiveIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndicesData()
      .then((data) => {
        // Filter sector indices
        const sectorIndices = data.filter(
          (index) =>
            index.index.includes("NIFTY") &&
            !["NIFTY_50", "NIFTY_NEXT_50", "NIFTY_100", "NIFTY_200", "NIFTY_500", "NIFTY_MIDCAP_50", "INDIA_VIX"].includes(
              index.index
            )
        );
        setIndices(sectorIndices);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching indices:", err);
        setLoading(false);
      });
  }, []);

  const sortedIndices = [...indices].sort((a, b) => b.changePercent - a.changePercent);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Sector Analysis</h1>
          </div>
          <p className="text-xl text-blue-100">Track performance across different market sectors</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6 hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Top Gainer</h3>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                {sortedIndices[0] && (
                  <>
                    <p className="text-xl font-bold text-gray-900 mb-2">
                      {sortedIndices[0].index.replace(/NIFTY_/g, "").replace(/_/g, " ")}
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      +{sortedIndices[0].changePercent.toFixed(2)}%
                    </p>
                  </>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6 hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Top Loser</h3>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                </div>
                {sortedIndices[sortedIndices.length - 1] && (
                  <>
                    <p className="text-xl font-bold text-gray-900 mb-2">
                      {sortedIndices[sortedIndices.length - 1].index.replace(/NIFTY_/g, "").replace(/_/g, " ")}
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      {sortedIndices[sortedIndices.length - 1].changePercent.toFixed(2)}%
                    </p>
                  </>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6 hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Sectors</h3>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{indices.length}</p>
                <p className="text-sm text-gray-600">Tracked sectors</p>
              </div>
            </div>

            {/* Sector Performance Table */}
            <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Sector Performance</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sector</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Current Value</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Change</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Change %</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">52W High</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">52W Low</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Performance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedIndices.map((index) => {
                      const isPositive = index.changePercent >= 0;
                      const performance52w =
                        ((index.currentPrice - index.low52w) / (index.high52w - index.low52w)) * 100;

                      return (
                        <tr key={index.index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">
                              {index.index.replace(/NIFTY_/g, "").replace(/_/g, " ")}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-semibold text-gray-900">
                            {index.currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                              {isPositive ? "+" : ""}
                              {index.change.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div
                              className={`flex items-center justify-end space-x-1 font-semibold ${
                                isPositive ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                              <span>
                                {isPositive ? "+" : ""}
                                {index.changePercent.toFixed(2)}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right text-gray-700">
                            {index.high52w.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-6 py-4 text-right text-gray-700">
                            {index.low52w.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    performance52w > 70
                                      ? "bg-green-600"
                                      : performance52w > 40
                                      ? "bg-yellow-500"
                                      : "bg-red-600"
                                  }`}
                                  style={{ width: `${performance52w}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-sm text-gray-600">{performance52w.toFixed(0)}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
