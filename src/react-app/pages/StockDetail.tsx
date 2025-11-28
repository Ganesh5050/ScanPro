import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import Button from "@/react-app/components/Button";
import { TrendingUp, TrendingDown, Star, Plus, Bell, Share2, BarChart3, Activity, DollarSign, TrendingUpIcon } from "lucide-react";
import { getStockBySymbol, LiveStock } from "@/shared/marketDataService";
import StockChart from "@/react-app/components/StockChart";

export default function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const [stock, setStock] = useState<LiveStock | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "fundamentals" | "technicals">("overview");

  useEffect(() => {
    if (symbol) {
      setLoading(true);
      getStockBySymbol(symbol)
        .then((data) => {
          setStock(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching stock:", err);
          setLoading(false);
        });
    }
  }, [symbol]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stock Not Found</h2>
          <p className="text-gray-600">The stock symbol you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const isPositive = stock.changePercent >= 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Stock Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{stock.symbol}</h1>
                <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                  <Star className="w-6 h-6" />
                </button>
              </div>
              <p className="text-lg text-gray-600">{stock.name}</p>
              <p className="text-sm text-gray-500 mt-1">{stock.ticker}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="white" size="md" icon={<Bell className="w-4 h-4" />}>
                Alert
              </Button>
              <Button variant="white" size="md" icon={<Share2 className="w-4 h-4" />}>
                Share
              </Button>
              <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
                Add to Watchlist
              </Button>
            </div>
          </div>

          {/* Price Info */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Price</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{stock.currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
              <div className={`flex items-center space-x-1 mt-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-semibold">
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Open</p>
              <p className="text-lg font-semibold text-gray-900">₹{stock.open.toFixed(2)}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">High / Low</p>
              <p className="text-lg font-semibold text-gray-900">
                ₹{stock.high.toFixed(2)} / ₹{stock.low.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">52W High / Low</p>
              <p className="text-lg font-semibold text-gray-900">
                ₹{stock.high52w.toFixed(2)} / ₹{stock.low52w.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Market Cap</p>
              <p className="text-lg font-semibold text-gray-900">₹{(stock.marketCap / 100).toFixed(2)}Cr</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "fundamentals", label: "Fundamentals", icon: DollarSign },
              { id: "technicals", label: "Technicals", icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors ${
                    isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Chart</h3>
              <StockChart symbol={stock.symbol} />
            </div>

            {/* Key Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Volume</p>
                  <p className="text-lg font-semibold text-gray-900">{stock.volumeAvg.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Prev Close</p>
                  <p className="text-lg font-semibold text-gray-900">₹{stock.closePrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Day Range</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{stock.low.toFixed(2)} - ₹{stock.high.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">52W Range</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{stock.low52w.toFixed(2)} - ₹{stock.high52w.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "fundamentals" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fundamental Analysis</h3>
            <p className="text-gray-600">Fundamental data coming soon...</p>
          </div>
        )}

        {activeTab === "technicals" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Analysis</h3>
            <p className="text-gray-600">Technical indicators coming soon...</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
