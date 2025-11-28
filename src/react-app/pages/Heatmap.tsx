import { useEffect, useState } from "react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import Button from "@/react-app/components/Button";
import { fetchStocksData, LiveStock } from "@/shared/marketDataService";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function Heatmap() {
  const [stocks, setStocks] = useState<LiveStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "gainers" | "losers">("all");

  useEffect(() => {
    fetchStocksData()
      .then((data) => {
        setStocks(data.slice(0, 100)); // Top 100 stocks for heatmap
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stocks:", err);
        setLoading(false);
      });
  }, []);

  const filteredStocks = stocks.filter((stock) => {
    if (filter === "gainers") return stock.changePercent > 0;
    if (filter === "losers") return stock.changePercent < 0;
    return true;
  });

  const getColorIntensity = (changePercent: number) => {
    const absChange = Math.abs(changePercent);
    if (changePercent > 0) {
      // Green shades for gainers
      if (absChange > 5) return "bg-gradient-to-br from-green-600 to-green-700 text-white";
      if (absChange > 3) return "bg-gradient-to-br from-green-500 to-green-600 text-white";
      if (absChange > 1) return "bg-gradient-to-br from-green-400 to-green-500 text-white";
      return "bg-gradient-to-br from-green-300 to-green-400 text-gray-900";
    } else if (changePercent < 0) {
      // Red shades for losers
      if (absChange > 5) return "bg-gradient-to-br from-red-600 to-red-700 text-white";
      if (absChange > 3) return "bg-gradient-to-br from-red-500 to-red-600 text-white";
      if (absChange > 1) return "bg-gradient-to-br from-red-400 to-red-500 text-white";
      return "bg-gradient-to-br from-red-300 to-red-400 text-gray-900";
    } else {
      return "bg-gradient-to-br from-gray-300 to-gray-400 text-gray-900";
    }
  };

  const getBoxSize = (marketCap: number) => {
    // Larger market cap = larger box
    if (marketCap > 100000) return "col-span-4 row-span-3";
    if (marketCap > 50000) return "col-span-3 row-span-2";
    if (marketCap > 10000) return "col-span-2 row-span-2";
    return "col-span-2 row-span-1";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Market Heatmap</h1>
          <p className="text-xl text-blue-100">Visual representation of market movements</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setFilter("all")}
                variant={filter === "all" ? "primary" : "white"}
                size="md"
              >
                All Stocks
              </Button>
              <Button
                onClick={() => setFilter("gainers")}
                variant={filter === "gainers" ? "success" : "white"}
                size="md"
                icon={<TrendingUp className="w-4 h-4" />}
              >
                Gainers
              </Button>
              <Button
                onClick={() => setFilter("losers")}
                variant={filter === "losers" ? "danger" : "white"}
                size="md"
                icon={<TrendingDown className="w-4 h-4" />}
              >
                Losers
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredStocks.length} stocks
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Color Legend</h3>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-600 rounded"></div>
              <span className="text-sm text-gray-600">&gt; 5% Gain</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-400 rounded"></div>
              <span className="text-sm text-gray-600">1-5% Gain</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <span className="text-sm text-gray-600">Flat</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-400 rounded"></div>
              <span className="text-sm text-gray-600">1-5% Loss</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-600 rounded"></div>
              <span className="text-sm text-gray-600">&gt; 5% Loss</span>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6">
            <div className="grid grid-cols-12 gap-3 auto-rows-[100px]">
              {filteredStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className={`${getBoxSize(stock.marketCap)} ${getColorIntensity(
                    stock.changePercent
                  )} rounded-xl p-4 flex flex-col justify-between hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.1)]`}
                  title={stock.name}
                  onClick={() => window.location.href = `/stock/${stock.symbol}`}
                >
                  <div>
                    <p className="font-bold text-base truncate">{stock.symbol}</p>
                    <p className="text-xs opacity-80 truncate mt-0.5">{stock.name}</p>
                  </div>
                  <div>
                    <p className="font-bold text-base">
                      ₹{stock.currentPrice.toFixed(2)}
                    </p>
                    <p className="text-sm font-semibold mt-0.5">
                      {stock.changePercent > 0 ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
