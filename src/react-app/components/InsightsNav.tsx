import { Link, useLocation } from "react-router";
import { BarChart3, TrendingUp, Briefcase, Building2, Users, AlertCircle, TrendingDown, Activity, Target, Ban } from "lucide-react";

const navItems = [
  { path: "/insights", label: "Heatmap", icon: BarChart3 },
  { path: "/insights/fii-dii", label: "FII/DII Data", icon: TrendingUp },
  { path: "/insights/company-filings", label: "Company Filings", icon: Briefcase },
  { path: "/insights/bulk-block-deals", label: "Bulk/Block Deals", icon: Users },
  { path: "/insights/signals", label: "Signals", icon: AlertCircle },
  { path: "/insights/mtm", label: "MTM", icon: Target },
  { path: "/insights/fno-ban", label: "F&O Ban", icon: Ban },
  { path: "/insights/top-deliveries", label: "Top Deliveries", icon: TrendingUp },
  { path: "/insights/market-valuation", label: "Market Valuation", icon: Activity },
];

export default function InsightsNav() {
  const location = useLocation();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
