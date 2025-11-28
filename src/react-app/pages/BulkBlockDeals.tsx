import { useEffect, useState } from "react";
import { BulkBlockDeal } from "@/shared/types";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import InsightsNav from "@/react-app/components/InsightsNav";
import { Users, Calendar, Info } from "lucide-react";

export default function BulkBlockDealsPage() {
  const [deals, setDeals] = useState<BulkBlockDeal[]>([]);
  const [activeAction, setActiveAction] = useState<string>("All");
  const dateRange = "Start Date - End Date";

  useEffect(() => {
    const actionParam = activeAction === "All" ? "" : activeAction;
    fetch(`/api/bulk-block-deals${actionParam ? `?action=${actionParam}` : ""}`)
      .then((res) => res.json())
      .then((data) => setDeals(data))
      .catch((err) => console.error("Error fetching bulk/block deals:", err));
  }, [activeAction]);

  const topDeals = deals.slice(0, 5);

  const formatCurrency = (value: number) => {
    return `₹${value.toFixed(2)} Cr`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InsightsNav />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Bulk/Block Deals</h1>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Info className="w-5 h-5" />
            </button>
          </div>

          {/* Top Deals Preview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {topDeals.map((deal) => (
              <div
                key={deal.id}
                className={`p-4 rounded-lg border-2 ${
                  deal.action === "Sell" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{deal.stock_name}</div>
                    <div className="text-xs text-gray-600 mt-1">Deal Size</div>
                    <div className="text-lg font-bold text-gray-900">{formatCurrency(deal.value_cr)}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    deal.action === "Sell" ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"
                  }`}>
                    {deal.action}
                  </span>
                </div>
                <div className="text-xs text-gray-600 truncate">by {deal.client_name}</div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveAction("All")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeAction === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveAction("Buy")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeAction === "Buy"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setActiveAction("Sell")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeAction === "Sell"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Sell
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Duration:</span>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                <Calendar className="w-4 h-4" />
                <span>{dateRange}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Deals Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Client</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Action</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Qty</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Avg price</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Value(Cr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{deal.stock_symbol}</div>
                      <div className="text-sm text-gray-600">{deal.stock_name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(deal.deal_date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {deal.client_name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        deal.action === "Sell" 
                          ? "bg-red-100 text-red-700" 
                          : "bg-green-100 text-green-700"
                      }`}>
                        {deal.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      {deal.quantity.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      {deal.avg_price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      {formatCurrency(deal.value_cr)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
