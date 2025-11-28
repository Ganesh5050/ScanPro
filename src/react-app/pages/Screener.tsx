import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import Button from "@/react-app/components/Button";
import { SearchInput } from "@/react-app/components/Input";
import { TrendingUp, TrendingDown, Star, Filter, Download, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { fetchStocksData, LiveStock } from "@/shared/marketDataService";

type SortField = "symbol" | "currentPrice" | "changePercent" | "volumeAvg" | "marketCap";
type SortDirection = "asc" | "desc";

export default function Screener() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [stocks, setStocks] = useState<LiveStock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<SortField>("marketCap");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");

  useEffect(() => {
    setLoading(true);
    fetchStocksData()
      .then((data) => {
        setStocks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stocks:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredStocks = stocks
    .filter((stock) => 
      searchQuery === "" || 
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField] ?? 0;
      const bValue = b[sortField] ?? 0;
      
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Indian Stocks</h1>
          <p className="text-xl text-blue-100">Browse and analyze 2000+ Indian stocks with real-time data</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-1 max-w-md">
                <SearchInput
                  placeholder="Search stocks by name or symbol..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button variant="primary" size="md" icon={<Filter className="w-4 h-4" />}>
                Filters
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="success"
                size="md"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => navigate("/create")}
              >
                Create Screener
              </Button>
              <span className="text-sm text-gray-600">{filteredStocks.length} stocks</span>
            </div>
          </div>
        </div>

        {/* Stock Table */}
        <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading stock data...</p>
              </div>
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button className="flex items-center space-x-1 text-sm font-semibold text-gray-700 hover:text-blue-600">
                      <Star className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("symbol")}
                      className="flex items-center space-x-1 text-sm font-semibold text-gray-700 hover:text-blue-600"
                    >
                      <span>Name</span>
                      <SortIcon field="symbol" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleSort("currentPrice")}
                      className="flex items-center justify-end space-x-1 text-sm font-semibold text-gray-700 hover:text-blue-600 ml-auto"
                    >
                      <span>Price</span>
                      <SortIcon field="currentPrice" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleSort("changePercent")}
                      className="flex items-center justify-end space-x-1 text-sm font-semibold text-gray-700 hover:text-blue-600 ml-auto"
                    >
                      <span>Change %</span>
                      <SortIcon field="changePercent" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleSort("volumeAvg")}
                      className="flex items-center justify-end space-x-1 text-sm font-semibold text-gray-700 hover:text-blue-600 ml-auto"
                    >
                      <span>Volume</span>
                      <SortIcon field="volumeAvg" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-gray-700">52W Range</span>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleSort("marketCap")}
                      className="flex items-center justify-end space-x-1 text-sm font-semibold text-gray-700 hover:text-blue-600 ml-auto"
                    >
                      <span>Market Cap</span>
                      <SortIcon field="marketCap" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStocks.slice(0, 100).map((stock, idx) => (
                  <tr 
                    key={`${stock.symbol}-${idx}`} 
                    className="hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/stock/${stock.symbol}`)}
                  >
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                        <Star className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{stock.symbol}</div>
                        <div className="text-sm text-gray-600 truncate max-w-xs">{stock.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                      ₹{stock.currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`flex items-center justify-end space-x-1 font-semibold ${
                        stock.changePercent >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {stock.changePercent >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{stock.changePercent.toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-700">
                      {stock.volumeAvg.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-600">
                      <div>₹{stock.low52w.toFixed(2)}</div>
                      <div>₹{stock.high52w.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-700">
                      ₹{(stock.marketCap / 100).toFixed(2)}Cr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
