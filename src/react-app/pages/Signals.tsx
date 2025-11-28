import { useEffect, useState } from "react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import InsightsNav from "@/react-app/components/InsightsNav";
import { AlertCircle, TrendingUp, TrendingDown, Activity } from "lucide-react";

interface Signal {
  id: number;
  symbol: string;
  name: string;
  signal_type: string;
  signal: string;
  price: number;
  target: number;
  stop_loss: number;
  potential_return: number;
  timeframe: string;
  generated_at: string;
}

export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [activeType, setActiveType] = useState<string>("All");
  const [activeTimeframe, setActiveTimeframe] = useState<string>("All");

  useEffect(() => {
    // Mock data for signals
    const mockSignals: Signal[] = [
      {
        id: 1,
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd",
        signal_type: "Bullish",
        signal: "Golden Cross",
        price: 2456.75,
        target: 2650.00,
        stop_loss: 2380.00,
        potential_return: 7.87,
        timeframe: "Short Term",
        generated_at: new Date().toISOString(),
      },
      {
        id: 2,
        symbol: "TCS",
        name: "Tata Consultancy Services",
        signal_type: "Bullish",
        signal: "Breakout",
        price: 3845.20,
        target: 4100.00,
        stop_loss: 3750.00,
        potential_return: 6.63,
        timeframe: "Medium Term",
        generated_at: new Date().toISOString(),
      },
      {
        id: 3,
        symbol: "HDFCBANK",
        name: "HDFC Bank Ltd",
        signal_type: "Bearish",
        signal: "Resistance Rejection",
        price: 1678.50,
        target: 1580.00,
        stop_loss: 1720.00,
        potential_return: -5.87,
        timeframe: "Short Term",
        generated_at: new Date().toISOString(),
      },
    ];
    setSignals(mockSignals);
  }, [activeType, activeTimeframe]);

  const signalTypes = ["All", "Bullish", "Bearish", "Neutral"];
  const timeframes = ["All", "Intraday", "Short Term", "Medium Term", "Long Term"];

  const filteredSignals = signals.filter((signal) => {
    if (activeType !== "All" && signal.signal_type !== activeType) return false;
    if (activeTimeframe !== "All" && signal.timeframe !== activeTimeframe) return false;
    return true;
  });

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InsightsNav />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Trading Signals</h1>
          </div>
          <p className="text-xl text-blue-100">AI-powered trading signals based on technical analysis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Signal Type</label>
              <div className="flex items-center space-x-2">
                {signalTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeType === type
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Timeframe</label>
              <div className="flex items-center space-x-2">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setActiveTimeframe(timeframe)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTimeframe === timeframe
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSignals.map((signal) => (
            <div
              key={signal.id}
              className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 p-6 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{signal.symbol}</h3>
                  <p className="text-sm text-gray-600">{signal.name}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    signal.signal_type === "Bullish"
                      ? "bg-green-100 text-green-700"
                      : signal.signal_type === "Bearish"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {signal.signal_type}
                </span>
              </div>

              {/* Signal Info */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">{signal.signal}</span>
                </div>
                <p className="text-xs text-gray-600">{signal.timeframe}</p>
              </div>

              {/* Price Levels */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Price</span>
                  <span className="text-sm font-bold text-gray-900">₹{signal.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Target</span>
                  <span className="text-sm font-bold text-green-600">₹{signal.target.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stop Loss</span>
                  <span className="text-sm font-bold text-red-600">₹{signal.stop_loss.toFixed(2)}</span>
                </div>
              </div>

              {/* Potential Return */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Potential Return</span>
                  <div className="flex items-center space-x-1">
                    {signal.potential_return > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span
                      className={`text-lg font-bold ${
                        signal.potential_return > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {signal.potential_return > 0 ? "+" : ""}
                      {signal.potential_return.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{getTimeAgo(signal.generated_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
