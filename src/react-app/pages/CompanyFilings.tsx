import { useEffect, useState } from "react";
import { CompanyFiling } from "@/shared/types";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import InsightsNav from "@/react-app/components/InsightsNav";
import { Briefcase, ExternalLink, ChevronRight } from "lucide-react";

export default function CompanyFilingsPage() {
  const [filings, setFilings] = useState<CompanyFiling[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [companyFilter, setCompanyFilter] = useState<string>("All Companies");

  useEffect(() => {
    const categoryParam = activeCategory === "All" ? "" : activeCategory;
    fetch(`/api/company-filings${categoryParam ? `?category=${categoryParam}` : ""}`)
      .then((res) => res.json())
      .then((data) => setFilings(data))
      .catch((err) => console.error("Error fetching company filings:", err));
  }, [activeCategory]);

  const categories = [
    "All",
    "Financial Results",
    "Transcript",
    "Investor Presentation",
    "Analyst/Investor Meet",
    "Management Change",
    "Company Updates",
    "Board Meeting",
    "Dividend",
  ];

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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Analyst/Investor Meet": "bg-purple-100 text-purple-700",
      "Company Updates": "bg-blue-100 text-blue-700",
      "Financial Results": "bg-green-100 text-green-700",
      "Board Meeting": "bg-orange-100 text-orange-700",
      "Dividend": "bg-pink-100 text-pink-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InsightsNav />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-6">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Company Filings</h1>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Company Filter */}
          <div className="flex items-center space-x-2">
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option>All Companies</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Company Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Reported Time</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filings.map((filing) => (
                  <tr key={filing.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                          {filing.company_name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{filing.company_name}</div>
                          {filing.company_symbol && (
                            <div className="text-sm text-gray-600">{filing.company_symbol}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(filing.category)}`}>
                        {filing.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 line-clamp-2 max-w-md">
                        {filing.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-600">
                      {getTimeAgo(filing.reported_time)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {filing.document_url ? (
                        <a
                          href={filing.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          <span>View</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <button className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                          <span>View</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
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
