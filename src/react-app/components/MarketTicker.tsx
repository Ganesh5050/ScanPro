import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { fetchIndicesData, LiveIndex } from "@/shared/marketDataService";

export default function MarketTicker() {
  const [indices, setIndices] = useState<LiveIndex[]>([]);

  useEffect(() => {
    fetchIndicesData()
      .then((data) => {
        setIndices(data.slice(0, 10)); // Show top 10 indices
      })
      .catch((err) => console.error("Error fetching indices:", err));

    // Refresh every minute
    const interval = setInterval(() => {
      fetchIndicesData().then((data) => setIndices(data.slice(0, 10)));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (indices.length === 0) {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center justify-center h-12">
          <span className="text-sm text-gray-500">Loading market data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200 overflow-hidden">
      <div className="flex items-center h-12">
        <div className="flex items-center space-x-8 px-8 whitespace-nowrap animate-scroll">
          {indices.concat(indices).map((index, idx) => (
            <div key={`${index.index}-${idx}`} className="flex items-center space-x-3">
              <span className="font-semibold text-gray-800">{index.index.replace(/_/g, ' ')}</span>
              <span className="text-gray-900 font-medium">
                {index.currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span
                className={`flex items-center space-x-1 text-sm font-medium ${
                  index.changePercent >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {index.changePercent >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>
                  {index.changePercent.toFixed(2)}%
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
