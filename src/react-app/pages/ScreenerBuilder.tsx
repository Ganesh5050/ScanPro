import { useState, useEffect } from "react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import Button from "@/react-app/components/Button";
import Input, { Select } from "@/react-app/components/Input";
import Card from "@/react-app/components/Card";
import { fetchStocksData, LiveStock } from "@/shared/marketDataService";
import { Plus, Save, Play, X, Filter } from "lucide-react";

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export default function ScreenerBuilder() {
  const [stocks, setStocks] = useState<LiveStock[]>([]);
  const [screenerName, setScreenerName] = useState("");
  const [conditions, setConditions] = useState<FilterCondition[]>([
    { id: "1", field: "currentPrice", operator: "gt", value: "" }
  ]);
  const [results, setResults] = useState<LiveStock[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchStocksData().then(setStocks);
  }, []);

  const [selectedIndex, setSelectedIndex] = useState("NSE");
  const [selectedIndustry, setSelectedIndustry] = useState<string[]>([]);
  const [selectedSector, setSelectedSector] = useState<string[]>([]);
  const [marketCapFilter, setMarketCapFilter] = useState({ min: "", max: "" });
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });

  const indexOptions = [
    { value: "NSE", label: "NSE" },
    { value: "BSE", label: "BSE" },
    { value: "NIFTY50", label: "NIFTY 50" },
    { value: "NIFTY500", label: "NIFTY 500" },
  ];

  const industryOptions = [
    "Banking", "IT Services", "Oil & Gas", "Automobiles", "Pharmaceuticals",
    "Telecom", "FMCG", "Metals", "Infrastructure", "Textiles"
  ];

  const sectorOptions = [
    "Financial Services", "Technology", "Energy", "Consumer Goods",
    "Healthcare", "Industrials", "Materials", "Real Estate"
  ];

  const fieldOptions = [
    { value: "currentPrice", label: "Price" },
    { value: "changePercent", label: "Day Price Change %" },
    { value: "volumeAvg", label: "Volume" },
    { value: "marketCap", label: "Market Cap" },
    { value: "high52w", label: "52W High" },
    { value: "low52w", label: "52W Low" },
  ];

  const operatorOptions = [
    { value: "gt", label: "Greater than (>)" },
    { value: "lt", label: "Less than (<)" },
    { value: "eq", label: "Equal to (=)" },
    { value: "gte", label: "Greater than or equal (>=)" },
    { value: "lte", label: "Less than or equal (<=)" },
  ];

  const addCondition = () => {
    setConditions([
      ...conditions,
      { id: Date.now().toString(), field: "currentPrice", operator: "gt", value: "" }
    ]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, field: keyof FilterCondition, value: string) => {
    setConditions(conditions.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const runScreener = () => {
    let filtered = [...stocks];

    conditions.forEach(condition => {
      if (!condition.value) return;

      const value = parseFloat(condition.value);
      if (isNaN(value)) return;

      filtered = filtered.filter(stock => {
        const stockValue = stock[condition.field as keyof LiveStock] as number;
        
        switch (condition.operator) {
          case "gt": return stockValue > value;
          case "lt": return stockValue < value;
          case "eq": return stockValue === value;
          case "gte": return stockValue >= value;
          case "lte": return stockValue <= value;
          default: return true;
        }
      });
    });

    setResults(filtered);
    setShowResults(true);
  };

  const saveScreener = () => {
    // TODO: Save to database with user ID
    const screenerData = {
      name: screenerName,
      conditions: conditions,
      createdAt: new Date().toISOString(),
      // userId: currentUser.id // Will be added when auth is implemented
    };
    
    console.log("Saving screener:", screenerData);
    alert(`Screener "${screenerName}" saved! (Database integration pending)`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Untitled Screener"
                value={screenerName}
                onChange={(e) => setScreenerName(e.target.value)}
                className="text-lg font-semibold"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="white" size="md">
                Share
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={<Save className="w-4 h-4" />}
                onClick={saveScreener}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3 overflow-x-auto">
            <Select
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(e.target.value)}
              options={indexOptions}
            />
            
            <Button variant="white" size="sm">
              Index
            </Button>
            <Button variant="white" size="sm">
              Industry
            </Button>
            <Button variant="white" size="sm">
              Sector
            </Button>
            <Button variant="white" size="sm">
              Market Cap
            </Button>
            <Button variant="white" size="sm">
              Price
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={addCondition}
            >
              Add Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">



            {/* Results Table */}
            <div className="bg-white rounded-2xl shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)] border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing {results.length > 0 ? results.length : stocks.length} of {stocks.length} results
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Price</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Day Price Change</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Change %</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Volume</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">P/E Ratio</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Market Cap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(results.length > 0 ? results : stocks).slice(0, 25).map((stock) => (
                      <tr key={stock.symbol} className="hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href = `/stock/${stock.symbol}`}>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">{stock.name}</p>
                            <p className="text-xs text-gray-500">{stock.ticker}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-gray-900">
                          {stock.currentPrice.toFixed(2)}
                        </td>
                        <td className={`px-6 py-4 text-right font-semibold ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {stock.change > 0 ? "+" : ""}{stock.change.toFixed(2)}
                        </td>
                        <td className={`px-6 py-4 text-right font-semibold ${stock.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {stock.changePercent > 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          {(stock.volumeAvg / 1000000).toFixed(2)}M
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          {(Math.random() * 30 + 10).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          {(stock.marketCap / 100).toFixed(0)}Cr
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 border-t border-gray-200 flex items-center justify-center">
                <Button variant="white" size="sm">
                  Download
                </Button>
              </div>
            </div>
          </div>


      </div>

      <Footer />
    </div>
  );
}
