import { Link } from "react-router";
import { Search, Menu } from "lucide-react";
import { useState } from "react";
import Button from "./Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-blue-600">scan</span>
              <span className="text-gray-800">x</span>
              <sup className="text-xs text-gray-500 ml-0.5">®</sup>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/news" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              News
            </Link>
            <Link to="/create" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Create
            </Link>
            <Link to="/screeners" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Screeners
            </Link>
            <Link to="/insights" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Insights
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/screener" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <Search className="w-5 h-5" />
              <span className="text-sm font-medium">Search Stocks</span>
            </Link>
            <Button variant="white" size="sm">
              Login
            </Button>
            <Button variant="primary" size="sm">
              Open Account
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Link to="/news" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                News
              </Link>
              <Link to="/create" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Create
              </Link>
              <Link to="/screeners" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Screeners
              </Link>
              <Link to="/insights" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Insights
              </Link>
              <Link to="/screener" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Search Stocks
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="white" size="md" className="w-full">
                  Login
                </Button>
                <Button variant="primary" size="md" className="w-full">
                  Open Account
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
