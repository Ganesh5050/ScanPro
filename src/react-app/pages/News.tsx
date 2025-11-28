import { useEffect, useState } from "react";
import { NewsArticle } from "@/shared/types";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router";

export default function News() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  const categories = ["All", "Latest", "Markets", "Corporate", "Economy", "Stocks & Deals", "Global", "IPO", "Top Stories", "News Shorts"];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Market News</h1>
          <p className="text-xl text-blue-100">Stay updated with the latest market trends and stock news</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-3 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-white shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02)]"
                    : "bg-white text-gray-700 border border-gray-200 shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08)] hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Latest Market Updates</h2>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {news.map((article) => (
                  <Link
                    key={article.id}
                    to={`/news/${article.id}`}
                    className="block p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex space-x-4">
                      {article.image_url && (
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {article.summary}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="font-medium">{article.source}</span>
                          <span>•</span>
                          <span>{formatDate(article.published_date)}</span>
                          {article.category && (
                            <>
                              <span>•</span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                {article.category}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Portfolio News */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Portfolio News</h3>
              <p className="text-sm text-gray-600 mb-4">
                Create your portfolio to get personalized news
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Portfolio
              </button>
            </div>

            {/* Market Movers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Market Movers</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Reliance Ind.", change: "+2.45%", isPositive: true },
                  { name: "TCS", change: "-0.85%", isPositive: false },
                  { name: "HDFC Bank", change: "+1.75%", isPositive: true },
                  { name: "Infosys", change: "+0.95%", isPositive: true },
                  { name: "ICICI Bank", change: "+1.89%", isPositive: true },
                ].map((stock, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm font-medium text-gray-900">{stock.name}</span>
                    <span className={`text-sm font-bold ${stock.isPositive ? "text-green-600" : "text-red-600"}`}>
                      {stock.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Indices */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Indices</h3>
              <div className="space-y-3">
                {[
                  { name: "S&P 500", value: "5,956.29", change: "+0.38%", flag: "🇺🇸" },
                  { name: "Dow Jones", value: "44,910.65", change: "+0.42%", flag: "🇺🇸" },
                  { name: "Nasdaq", value: "18,987.47", change: "+0.09%", flag: "🇺🇸" },
                  { name: "FTSE 100", value: "8,287.09", change: "+0.15%", flag: "🇬🇧" },
                  { name: "DAX", value: "19,926.72", change: "-0.23%", flag: "🇩🇪" },
                ].map((index, idx) => (
                  <div key={idx} className="py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 flex items-center">
                        <span className="mr-2">{index.flag}</span>
                        {index.name}
                      </span>
                      <span className="text-sm font-bold text-green-600">{index.change}</span>
                    </div>
                    <div className="text-xs text-gray-600">{index.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
