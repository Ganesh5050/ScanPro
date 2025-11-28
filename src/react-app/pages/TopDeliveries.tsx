import { useEffect, useState } from "react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import InsightsNav from "@/react-app/components/InsightsNav";
import { TrendingUp, Package } from "lucide-react";
import { fetchStocksData, LiveStock } from "@/shared/marketDataService";

export default function TopDeliveriesPage() {
  const [stocks, setStocks] = useState<LiveStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  useEffect(() => {
    fetchStocksData()
      .then((data) => {
        // Sort by volume and take top stocks
        const sorted = data.sort((a, b) => b.volumeAvg - a.volumeAvg).slice(0, 50);
        setStocks(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stocks:", err);
        setLoading(false);
      });
  }, []);

  const filters = ["All", "Nifty 50", "Nifty 500", "High Delivery"];

  // Calculate delivery percentage (mock calculation)
  const getDeliveryPercentage = () => {
    return Math.random() * 40 + 30; // Random between 30-70%
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InsightsNav />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <Package className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Top Deliveries</h1>
          </div>
          <p className="text-xl text-blue-100">Stocks with highest delivery percentage indicating genuine buying</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6 mb-6">
          <div className="flex items-center space-x-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600">Avg Delivery %</h3>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">52.3%</p>
            <p className="text-sm text-gray-600 mt-1">Across all stocks</p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600">High Delivery Stocks</h3>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">28</p>
            <p className="text-sm text-gray-600 mt-1">&gt; 60% delivery</p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600">Total Volume</h3>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">2.4B</p>
            <p className="text-sm text-gray-600 mt-1">Shares traded</p>
          </div>
        </div>

        {/* Deliveries Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Top Delivery Stocks</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Change %</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Volume</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Delivery Qty</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Delivery %</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stocks.map((stock) => {
                    const deliveryPercent = getDeliveryPercentage();
                    const deliveryQty = Math.floor(stock.volumeAvg * (deliveryPercent / 100));

                    return (
                      <tr
                        key={stock.symbol}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => (window.location.href = `/stock/${stock.symbol}`)}
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{stock.symbol}</div>
                          <div className="text-sm text-gray-600">{stock.name}</div>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-gray-900">
                          ₹{stock.currentPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`font-semibold ${
                              stock.changePercent >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {stock.changePercent > 0 ? "+" : ""}
                            {stock.changePercent.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-900">
                          {(stock.volumeAvg / 1000000).toFixed(2)}M
                        </td>
                        <td className="px-6 py-4 text-right text-gray-900">
                          {(deliveryQty / 1000000).toFixed(2)}M
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  deliveryPercent >= 60
                                    ? "bg-green-600"
                                    : deliveryPercent >= 40
                                    ? "bg-yellow-500"
                                    : "bg-red-600"
                                }`}
                                style={{ width: `${deliveryPercent}%` }}
                              ></div>
                            </div>
                            <span
                              className={`text-sm font-bold ${
                                deliveryPercent >= 60
                                  ? "text-green-600"
                                  : deliveryPercent >= 40
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {deliveryPercent.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {deliveryPercent >= 60 ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                              Strong
                            </span>
                          ) : deliveryPercent >= 40 ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                              Moderate
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                              Weak
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
