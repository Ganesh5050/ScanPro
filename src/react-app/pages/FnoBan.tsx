import { useEffect, useState } from "react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import InsightsNav from "@/react-app/components/InsightsNav";
import { Ban, AlertTriangle, Info } from "lucide-react";

interface FnoBanStock {
  id: number;
  symbol: string;
  name: string;
  current_price: number;
  change_percent: number;
  market_wide_position_limit: number;
  current_position: number;
  utilization_percent: number;
  ban_date: string;
  status: string;
}

export default function FnoBanPage() {
  const [banStocks, setBanStocks] = useState<FnoBanStock[]>([]);
  const [activeStatus, setActiveStatus] = useState<string>("All");

  useEffect(() => {
    // Mock F&O Ban data
    const mockData: FnoBanStock[] = [
      {
        id: 1,
        symbol: "BANDHANBNK",
        name: "Bandhan Bank Ltd",
        current_price: 234.50,
        change_percent: -2.34,
        market_wide_position_limit: 50000000,
        current_position: 48500000,
        utilization_percent: 97.0,
        ban_date: new Date().toISOString(),
        status: "In Ban",
      },
      {
        id: 2,
        symbol: "GNFC",
        name: "Gujarat Narmada Valley Fertilizers",
        current_price: 678.90,
        change_percent: -1.23,
        market_wide_position_limit: 30000000,
        current_position: 29100000,
        utilization_percent: 97.0,
        ban_date: new Date().toISOString(),
        status: "In Ban",
      },
      {
        id: 3,
        symbol: "SAIL",
        name: "Steel Authority of India Ltd",
        current_price: 112.45,
        change_percent: 0.89,
        market_wide_position_limit: 80000000,
        current_position: 76800000,
        utilization_percent: 96.0,
        ban_date: new Date().toISOString(),
        status: "Near Ban",
      },
    ];
    setBanStocks(mockData);
  }, [activeStatus]);

  const statusOptions = ["All", "In Ban", "Near Ban", "Removed"];

  const filteredStocks = banStocks.filter((stock) => {
    if (activeStatus !== "All" && stock.status !== activeStatus) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Ban":
        return "bg-red-100 text-red-700 border-red-200";
      case "Near Ban":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Removed":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InsightsNav />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <Ban className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">F&O Ban List</h1>
          </div>
          <p className="text-xl text-red-100">Stocks in F&O ban period or approaching ban threshold</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6 flex items-start space-x-4">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">About F&O Ban</h3>
            <p className="text-sm text-blue-800">
              Stocks are placed in F&O ban when their market-wide position limit exceeds 95%. 
              No fresh positions can be created in these stocks until the position limit falls below 80%.
            </p>
          </div>
        </div>

        {/* Status Filters */}
        <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6 mb-6">
          <div className="flex items-center space-x-3">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeStatus === status
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Ban Stocks Table */}
        <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              {filteredStocks.length} Stock{filteredStocks.length !== 1 ? "s" : ""} {activeStatus !== "All" ? `- ${activeStatus}` : ""}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Change %</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Position Limit</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Current Position</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Utilization</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Ban Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStocks.map((stock) => (
                  <tr key={stock.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {stock.status === "In Ban" && (
                          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">{stock.symbol}</div>
                          <div className="text-sm text-gray-600">{stock.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                      ₹{stock.current_price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-semibold ${
                          stock.change_percent >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stock.change_percent > 0 ? "+" : ""}
                        {stock.change_percent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900">
                      {(stock.market_wide_position_limit / 1000000).toFixed(2)}M
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900">
                      {(stock.current_position / 1000000).toFixed(2)}M
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              stock.utilization_percent >= 95
                                ? "bg-red-600"
                                : stock.utilization_percent >= 90
                                ? "bg-yellow-500"
                                : "bg-green-600"
                            }`}
                            style={{ width: `${stock.utilization_percent}%` }}
                          ></div>
                        </div>
                        <span
                          className={`text-sm font-bold ${
                            stock.utilization_percent >= 95
                              ? "text-red-600"
                              : stock.utilization_percent >= 90
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {stock.utilization_percent.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          stock.status
                        )}`}
                      >
                        {stock.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-600">
                      {new Date(stock.ban_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
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
