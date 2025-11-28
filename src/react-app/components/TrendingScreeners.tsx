import { useEffect, useState } from "react";
import { Screener } from "@/shared/types";
import { 
  Flame, 
  TrendingUp, 
  TrendingDown,
  Activity, 
  Zap, 
  Crown, 
  ArrowDown,
  Volume2,
  BarChart3
} from "lucide-react";
import { Link } from "react-router";

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

export default function TrendingScreeners() {
  const [screeners, setScreeners] = useState<Screener[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Best Price screeners");

  useEffect(() => {
    fetch("/api/screeners?trending=true")
      .then((res) => res.json())
      .then((data) => setScreeners(data))
      .catch((err) => console.error("Error fetching screeners:", err));
  }, []);

  const categories = ["Best Price screeners", "Fundamentals", "Technical", "Price & Volume", "Candlesticks"];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-8">
          <Flame className="w-6 h-6 text-orange-500 mr-2" />
          <h2 className="text-3xl font-bold text-gray-900">Trending Screeners</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Screeners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {screeners.map((screener) => {
            const Icon = iconMap[screener.icon_type || "chart"] || Activity;
            
            return (
              <Link
                key={screener.id}
                to={`/screener/${screener.id}`}
                className="group bg-white rounded-lg p-5 shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded border border-green-200">
                      {screener.match_count} stocks
                    </span>
                    {screener.is_trending === 1 && (
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-xs font-semibold rounded flex items-center gap-1 border border-orange-200">
                        <Flame className="w-3 h-3" />
                        Trending
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-base font-bold text-gray-900 mb-1.5">
                  {screener.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {screener.description}
                </p>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
                    {screener.category}
                  </span>
                  <span className="text-sm text-blue-600 font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    View →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* See More Link */}
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-3">
            175+ trending scripts with stock market trends (updated continually)
          </p>
          <Link
            to="/screeners"
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Explore More →
          </Link>
        </div>
      </div>
    </section>
  );
}
