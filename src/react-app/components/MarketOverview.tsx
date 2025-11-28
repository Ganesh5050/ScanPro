import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";
import { fetchIndicesData, fetchStocksData, LiveIndex } from "@/shared/marketDataService";
import { StatsCard } from "./Card";

export default function MarketOverview() {
  const [nifty50, setNifty50] = useState<LiveIndex | null>(null);
  const [bankNifty, setBankNifty] = useState<LiveIndex | null>(null);
  const [totalStocks, setTotalStocks] = useState<number>(0);
  const [gainers, setGainers] = useState<number>(0);
  const [losers, setLosers] = useState<number>(0);

  useEffect(() => {
    async function loadData() {
      try {
        const [indices, stocks] = await Promise.all([
          fetchIndicesData(),
          fetchStocksData()
        ]);

        const nifty = indices.find(i => i.index === "NIFTY_50");
        const bank = indices.find(i => i.index === "NIFTY_BANK");
        
        if (nifty) setNifty50(nifty);
        if (bank) setBankNifty(bank);
        
        setTotalStocks(stocks.length);
        setGainers(stocks.filter(s => s.changePercent > 0).length);
        setLosers(stocks.filter(s => s.changePercent < 0).length);
      } catch (err) {
        console.error("Error loading market overview:", err);
      }
    }

    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            label="NIFTY 50"
            value={nifty50?.currentPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 }) || "..."}
            change={nifty50?.changePercent}
            icon={<Activity className="w-6 h-6" />}
          />

          <StatsCard
            label="BANK NIFTY"
            value={bankNifty?.currentPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 }) || "..."}
            change={bankNifty?.changePercent}
            icon={<BarChart3 className="w-6 h-6" />}
          />

          <StatsCard
            label="Gainers"
            value={gainers}
            icon={<TrendingUp className="w-6 h-6" />}
          />

          <StatsCard
            label="Losers"
            value={losers}
            icon={<TrendingDown className="w-6 h-6" />}
          />
        </div>
      </div>
    </section>
  );
}
