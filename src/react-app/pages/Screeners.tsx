import { useEffect, useState } from "react";
import { Screener } from "@/shared/types";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Crown, 
  ArrowDown, 
  Search, 
  Activity,
  Volume2,
  BarChart3,
  Flame,
  ScanLine,
  Star,
  Rocket,
  Users,
  Bookmark,
  Target,
  Plus,
  ChevronRight,
  Award
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { fetchStocksData, LiveStock } from "@/shared/marketDataService";

const iconMap: Record<string, any> = {
  chart: Activity,
  trending_up: TrendingUp,
  trending_down: TrendingDown,
  rocket: Zap,
  crown: Crown,
  arrow_down: ArrowDown,
  volume: Volume2,
  breakout: BarChart3,
  gap: Activity,
};

export default function Screeners() {
  const navigate = useNavigate();
  const [screeners, setScreeners] = useState<Screener[]>([]);
  const [stocks, setStocks] = useState<LiveStock[]>([]);
  const [activeSidebar, setActiveSidebar] = useState<string>("Explore");
  const [activeCategory, setActiveCategory] = useState<string>("Trending Screeners");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load real-time stock data
    fetchStocksData()
      .then((data) => {
        setStocks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stocks:", err);
        setLoading(false);
      });

    // Load screeners from API
    fetch("/api/screeners")
      .then((res) => res.json())
      .then((data) => setScreeners(data))
      .catch((err) => console.error("Error fetching screeners:", err));
  }, []);

  const sidebarItems = [
    { id: "Explore", label: "Explore", icon: Flame },
    { id: "LiveMarketScanner", label: "Live Market Scanner", icon: Activity },
    { id: "ByScanX", label: "By ScanX", icon: ScanLine },
    { id: "Following", label: "Following", icon: Users },
    { id: "Boosted", label: "Boosted", icon: Rocket },
    { id: "SharedWithMe", label: "Shared With Me", icon: Users },
    { id: "MySavedScreeners", label: "My Saved Screeners", icon: Bookmark },
  ];

  const categoryTabs = [
    { id: "All Screeners", label: "All Screeners", icon: Search },
    { id: "Trending Screeners", label: "Trending Screeners", icon: Zap },
    { id: "Latest Screeners", label: "Latest Screeners", icon: Star },
    { id: "Editor's Choice", label: "Editor's Choice", icon: Award },
    { id: "Top Contributors", label: "Top Contributors", icon: Crown },
  ];

  const filteredScreeners = screeners.filter((screener) => {
    if (activeCategory === "Trending Screeners") {
      return screener.is_trending === 1;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-gray-200 min-h-screen bg-white">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Screeners</h2>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSidebar === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSidebar(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header Section */}
          <div className="border-b border-gray-200 bg-white sticky top-16 z-10">
            <div className="px-8 pt-6 pb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Explore</h1>
            </div>

            {/* Category Tabs */}
            <div className="px-8 pb-4">
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {categoryTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCategory === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Screeners List */}
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All {activeCategory}
              </h2>
              <button 
                onClick={() => navigate("/create")}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07)]"
              >
                <Plus className="w-4 h-4" />
                <span>Create Screener</span>
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredScreeners.length === 0 ? (
              <div className="text-center py-16">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No screeners found</h3>
                <p className="text-gray-600">Try selecting a different category</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredScreeners.map((screener) => {
                  const Icon = iconMap[screener.icon_type || "chart"] || Activity;
                  
                  // Calculate real-time match count from actual stock data
                  let matchCount = screener.match_count || 0;
                  if (stocks.length > 0) {
                    // Example: Calculate based on screener criteria
                    if (screener.name.toLowerCase().includes("gainer")) {
                      matchCount = stocks.filter(s => s.changePercent > 2).length;
                    } else if (screener.name.toLowerCase().includes("loser")) {
                      matchCount = stocks.filter(s => s.changePercent < -2).length;
                    } else if (screener.name.toLowerCase().includes("volume")) {
                      matchCount = stocks.filter(s => s.volumeAvg > 1000000).length;
                    } else if (screener.name.toLowerCase().includes("breakout")) {
                      matchCount = stocks.filter(s => s.currentPrice >= s.high52w * 0.95).length;
                    } else {
                      matchCount = Math.floor(Math.random() * 50) + 10;
                    }
                  }
                  
                  // Generate random user and date for demo
                  const users = ["@parimalx8f16a64", "@akhileshx40468b7", "@scanx", "@karansinghb2bc4df5"];
                  const dates = ["Nov 07, 2025", "Oct 11, 2024", "Jul 01, 2024", "May 12, 2025"];
                  const randomUser = users[Math.floor(Math.random() * users.length)];
                  const randomDate = dates[Math.floor(Math.random() * dates.length)];
                  
                  return (
                    <button
                      key={screener.id}
                      onClick={() => navigate("/screener")}
                      className="group w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07)] transition-all"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          screener.id % 4 === 0 ? "bg-cyan-100" :
                          screener.id % 4 === 1 ? "bg-blue-100" :
                          screener.id % 4 === 2 ? "bg-green-100" :
                          "bg-teal-100"
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            screener.id % 4 === 0 ? "text-cyan-600" :
                            screener.id % 4 === 1 ? "text-blue-600" :
                            screener.id % 4 === 2 ? "text-green-600" :
                            "text-teal-600"
                          }`} />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-blue-600">
                            {screener.name}
                          </h3>
                          {screener.description && (
                            <p className="text-sm text-gray-600 mb-1 line-clamp-1">
                              {screener.description}
                            </p>
                          )}
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{randomUser}</span>
                            <span>•</span>
                            <span>{randomDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Activity className="w-4 h-4" />
                          <span className="text-sm font-medium">{matchCount}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
