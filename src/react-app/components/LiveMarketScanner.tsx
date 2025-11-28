import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Zap, ArrowDown } from "lucide-react";
import { Link } from "react-router";
import { getTopGainers, getTopLosers, LiveStock } from "@/shared/marketDataService";

interface SignalType {
  id: string;
  label: string;
  icon: typeof TrendingUp;
  bgColor: string;
  iconColor: string;
  stocks: LiveStock[];
}

export default function LiveMarketScanner() {
  const [signalTypes, setSignalTypes] = useState<SignalType[]>([
    { id: "bullish", label: "Top Gainers", icon: TrendingUp, bgColor: "bg-green-50", iconColor: "text-green-600", stocks: [] },
    { id: "bearish", label: "Top Losers", icon: TrendingDown, bgColor: "bg-red-50", iconColor: "text-red-600", stocks: [] },
    { id: "new_high", label: "Near 52W High", icon: Zap, bgColor: "bg-blue-50", iconColor: "text-blue-600", stocks: [] },
    { id: "new_low", label: "Near 52W Low", icon: ArrowDown, bgColor: "bg-orange-50", iconColor: "text-orange-600", stocks: [] },
  ]);

  useEffect(() => {
    async function loadData() {
      try {
        const [gainers, losers] = await Promise.all([
          getTopGainers(5),
          getTopLosers(5)
        ]);

        // Calculate stocks near 52W high/low
        const allStocks = [...gainers, ...losers];
        const near52High = allStocks.filter(s => 
          s.currentPrice >= s.high52w * 0.95
        ).slice(0, 5);
        const near52Low = allStocks.filter(s => 
          s.currentPrice <= s.low52w * 1.05
        ).slice(0, 5);

        setSignalTypes([
          { id: "bullish", label: "Top Gainers", icon: TrendingUp, bgColor: "bg-green-50", iconColor: "text-green-600", stocks: gainers },
          { id: "bearish", label: "Top Losers", icon: TrendingDown, bgColor: "bg-red-50", iconColor: "text-red-600", stocks: losers },
          { id: "new_high", label: "Near 52W High", icon: Zap, bgColor: "bg-blue-50", iconColor: "text-blue-600", stocks: near52High },
          { id: "new_low", label: "Near 52W Low", icon: ArrowDown, bgColor: "bg-orange-50", iconColor: "text-orange-600", stocks: near52Low },
        ]);
      } catch (err) {
        console.error("Error loading market data:", err);
      }
    }

    loadData();
    const interval = setInterval(loadData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-8">
          <Zap className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-3xl font-bold text-gray-900">Live Market Scanner</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signalTypes.map((type) => {
            const Icon = type.icon;
            const iconBgMap: Record<string, string> = {
              bullish: "from-green-500 to-green-600",
              bearish: "from-red-500 to-red-600",
              new_high: "from-blue-500 to-blue-600",
              new_low: "from-orange-500 to-orange-600",
            };
            
            return (
              <div
                key={type.id}
                className="bg-white rounded-2xl p-6 shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 hover:shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.12),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.12),0_3.62px_3.62px_-2px_rgba(0,0,0,0.11),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.11),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.09),0_40px_40px_-4px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${iconBgMap[type.id]} flex items-center justify-center flex-shrink-0 shadow-[0_0.71px_0.71px_-0.54px_rgba(0,0,0,0.1),0_1.81px_1.81px_-1.08px_rgba(0,0,0,0.1),0_3.62px_3.62px_-1.63px_rgba(0,0,0,0.09),0_6.87px_6.87px_-2.17px_rgba(0,0,0,0.09),0_13.65px_13.65px_-2.71px_rgba(0,0,0,0.07),0_30px_30px_-3.25px_rgba(0,0,0,0.04)]`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">
                    {type.stocks.length}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {type.label}
                </h3>
                
                <div className="space-y-3">
                  {type.stocks.slice(0, 2).map((stock, idx) => (
                    <div key={idx} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-900 font-semibold">{stock.symbol}</span>
                        <span className={`text-sm font-bold ${stock.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {stock.changePercent > 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{stock.name.slice(0, 18)}...</span>
                        <span className="text-sm text-gray-900 font-medium">
                          ₹{stock.currentPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link
                  to="/screener"
                  className="mt-4 text-sm text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center"
                >
                  View all <span className="ml-1">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
