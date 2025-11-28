import { useState } from "react";
import { useNavigate } from "react-router";
import { SearchInput } from "./Input";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/screener?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Real-Time Stock Data
            </span>
            {" "}for Indian Markets
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track 2000+ Indian stocks with live prices, market insights, and comprehensive analysis
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <form onSubmit={handleSearch}>
            <SearchInput
              placeholder="Search for stocks by name or symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={(value) => {
                if (value.trim()) {
                  navigate(`/screener?search=${encodeURIComponent(value)}`);
                }
              }}
            />
          </form>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            "Price movements",
            "Volume",
            "Fundamental Screening",
            "Live Scanner Results",
            "Technical Indicators",
            "Momentum",
            "More Filters"
          ].map((filter, index) => (
            <button
              key={index}
              className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
