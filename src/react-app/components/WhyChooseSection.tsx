import { CheckCircle, TrendingUp, BarChart3, Eye, Sparkles, Zap } from "lucide-react";
import { CardWithIcon } from "./Card";

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            You Deserve The Best Screener
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            For Indian Stocks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <CardWithIcon
            icon={<Eye className="w-6 h-6" />}
            title="High Value Insights"
            description="Get most updated live data feed with actionable insights for better stock analysis"
            iconBg="from-blue-500 to-blue-600"
          />

          <CardWithIcon
            icon={<BarChart3 className="w-6 h-6" />}
            title="Ready-made Screeners"
            description="175+ pre-built screeners designed by experts to help you find opportunities faster"
            iconBg="from-green-500 to-green-600"
          />

          <CardWithIcon
            icon={<Zap className="w-6 h-6" />}
            title="Custom Screeners"
            description="Build your own screeners with advanced filters tailored to your investment strategy"
            iconBg="from-purple-500 to-purple-600"
          />

          <CardWithIcon
            icon={<TrendingUp className="w-6 h-6" />}
            title="Compare Stocks"
            description="Side-by-side comparison tools to evaluate multiple stocks across key metrics"
            iconBg="from-orange-500 to-orange-600"
          />

          <CardWithIcon
            icon={<CheckCircle className="w-6 h-6" />}
            title="Market Insights"
            description="Real-time market analysis with sector trends, global indices and news updates"
            iconBg="from-pink-500 to-pink-600"
          />

          <CardWithIcon
            icon={<Sparkles className="w-6 h-6" />}
            title="AI-Powered Analysis"
            description="Advanced algorithms to identify patterns and opportunities in the market"
            iconBg="from-cyan-500 to-cyan-600"
          />
        </div>

        {/* Visual Section */}
        <div className="mt-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
              <div className="relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-600">Stock</span>
                    <span className="text-sm font-semibold text-gray-600">Returns</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Reliance Ind.", value: "+8.5%", color: "text-green-600" },
                      { name: "TCS", value: "+3.2%", color: "text-green-600" },
                      { name: "HDFC Bank", value: "+6.8%", color: "text-green-600" },
                      { name: "Infosys", value: "+2.1%", color: "text-green-600" },
                    ].map((stock, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-gray-900 font-medium">{stock.name}</span>
                        <span className={`font-bold ${stock.color}`}>{stock.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Technicals</div>
                    <div className="text-2xl font-bold text-gray-900">487</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Mutual Funds</div>
                    <div className="text-2xl font-bold text-gray-900">₹2.4Cr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
