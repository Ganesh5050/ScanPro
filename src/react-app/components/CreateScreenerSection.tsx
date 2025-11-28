import { Target, Zap, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router";

export default function CreateScreenerSection() {
  const features = [
    {
      icon: Target,
      title: "Predefined Filters",
      description: "Built-in logic and search options designed specially for Indian stocks, with industry-leading ease of use.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Advanced Alerts",
      description: "Understand how to create robust alerts along with notifications based on real-time data across multiple stocks.",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: Users,
      title: "Join ScanX Community",
      description: "Learn from expert users along with screeners and their stock approaches. Monitor how the best investors spot opportunities.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Analyse & Execute Trades",
      description: "Integrate with charts from TradingView chart-by-chart integrated into ScanX and execute your trades with platform seamlessly.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Create Your Custom Screener
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Screen Indian stocks with preset or own-stock criteria (up-screeners)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/screeners"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50"
          >
            <Zap className="w-5 h-5 mr-2" />
            Create Your Screener
          </Link>
        </div>
      </div>
    </section>
  );
}
