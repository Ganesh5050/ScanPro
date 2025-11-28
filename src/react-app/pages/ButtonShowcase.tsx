import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import Button from "@/react-app/components/Button";
import { Plus, Download, Star, Bell, Share2, TrendingUp, Search, Filter } from "lucide-react";

export default function ButtonShowcase() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Button Showcase</h1>
          <p className="text-xl text-gray-600">
            Beautiful 3D metallic buttons with gradient effects and shadows
          </p>
        </div>

        {/* Button Variants */}
        <div className="space-y-12">
          {/* Primary Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Primary Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="sm">
                Small Button
              </Button>
              <Button variant="primary" size="md">
                Medium Button
              </Button>
              <Button variant="primary" size="lg">
                Large Button
              </Button>
              <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
                With Icon
              </Button>
              <Button variant="primary" size="md" icon={<Download className="w-4 h-4" />}>
                Download
              </Button>
            </div>
          </div>

          {/* White Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">White Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="white" size="sm">
                Small Button
              </Button>
              <Button variant="white" size="md">
                Medium Button
              </Button>
              <Button variant="white" size="lg">
                Large Button
              </Button>
              <Button variant="white" size="md" icon={<Star className="w-4 h-4" />}>
                Favorite
              </Button>
              <Button variant="white" size="md" icon={<Share2 className="w-4 h-4" />}>
                Share
              </Button>
            </div>
          </div>

          {/* Black Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Black Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="black" size="sm">
                Small Button
              </Button>
              <Button variant="black" size="md">
                Medium Button
              </Button>
              <Button variant="black" size="lg">
                Large Button
              </Button>
              <Button variant="black" size="md" icon={<Bell className="w-4 h-4" />}>
                Notifications
              </Button>
              <Button variant="black" size="md" icon={<Search className="w-4 h-4" />}>
                Search
              </Button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Secondary Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="sm">
                Small Button
              </Button>
              <Button variant="secondary" size="md">
                Medium Button
              </Button>
              <Button variant="secondary" size="lg">
                Large Button
              </Button>
              <Button variant="secondary" size="md" icon={<Filter className="w-4 h-4" />}>
                Filter
              </Button>
            </div>
          </div>

          {/* Success Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="success" size="sm">
                Small Button
              </Button>
              <Button variant="success" size="md">
                Medium Button
              </Button>
              <Button variant="success" size="lg">
                Large Button
              </Button>
              <Button variant="success" size="md" icon={<TrendingUp className="w-4 h-4" />}>
                Gainers
              </Button>
              <Button variant="success" size="md" icon={<Plus className="w-4 h-4" />}>
                Add to Watchlist
              </Button>
            </div>
          </div>

          {/* Danger Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Danger Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="danger" size="sm">
                Small Button
              </Button>
              <Button variant="danger" size="md">
                Medium Button
              </Button>
              <Button variant="danger" size="lg">
                Large Button
              </Button>
              <Button variant="danger" size="md">
                Delete
              </Button>
              <Button variant="danger" size="md">
                Remove
              </Button>
            </div>
          </div>

          {/* Disabled State */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Disabled State</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="md" disabled>
                Disabled Primary
              </Button>
              <Button variant="white" size="md" disabled>
                Disabled White
              </Button>
              <Button variant="black" size="md" disabled>
                Disabled Black
              </Button>
              <Button variant="success" size="md" disabled>
                Disabled Success
              </Button>
              <Button variant="danger" size="md" disabled>
                Disabled Danger
              </Button>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Demo</h2>
            <p className="text-gray-600 mb-6">
              Click these buttons to see the press effect with inset shadows
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" onClick={() => alert("Primary clicked!")}>
                Click Me!
              </Button>
              <Button variant="success" size="lg" onClick={() => alert("Success!")}>
                Success Action
              </Button>
              <Button variant="danger" size="lg" onClick={() => alert("Danger zone!")}>
                Danger Action
              </Button>
              <Button variant="white" size="lg" icon={<Star className="w-5 h-5" />}>
                Add to Favorites
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
