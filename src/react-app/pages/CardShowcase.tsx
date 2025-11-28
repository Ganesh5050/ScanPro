import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import Card, { CardWithImage, CardWithIcon, StatsCard } from "@/react-app/components/Card";
import { 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Star, 
  Activity, 
  DollarSign,
  Users,
  ShoppingCart,
  Eye,
  Heart
} from "lucide-react";

export default function CardShowcase() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Card Showcase</h1>
          <p className="text-xl text-gray-600">
            Beautiful cards with sophisticated shadows and gradients
          </p>
        </div>

        {/* Basic Cards */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" padding="md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Default Card</h3>
              <p className="text-gray-600">
                This is a default card with standard shadow and padding.
              </p>
            </Card>

            <Card variant="elevated" padding="md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Elevated Card</h3>
              <p className="text-gray-600">
                This card has more prominent shadows for emphasis.
              </p>
            </Card>

            <Card variant="flat" padding="md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flat Card</h3>
              <p className="text-gray-600">
                This card has minimal shadows for a subtle look.
              </p>
            </Card>
          </div>
        </div>

        {/* Cards with Icons */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cards with Icons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardWithIcon
              icon={<TrendingUp className="w-6 h-6" />}
              title="Market Growth"
              description="Track market trends and identify growth opportunities with real-time data analysis."
              iconBg="from-green-500 to-green-600"
            />

            <CardWithIcon
              icon={<BarChart3 className="w-6 h-6" />}
              title="Analytics Dashboard"
              description="Comprehensive analytics tools to visualize your portfolio performance and metrics."
              iconBg="from-blue-500 to-blue-600"
            />

            <CardWithIcon
              icon={<Zap className="w-6 h-6" />}
              title="Quick Actions"
              description="Execute trades and manage your investments with lightning-fast performance."
              iconBg="from-yellow-500 to-yellow-600"
            />

            <CardWithIcon
              icon={<Star className="w-6 h-6" />}
              title="Premium Features"
              description="Access exclusive tools and insights available only to premium members."
              iconBg="from-purple-500 to-purple-600"
            />

            <CardWithIcon
              icon={<Eye className="w-6 h-6" />}
              title="Market Watch"
              description="Monitor multiple stocks simultaneously with customizable watchlists."
              iconBg="from-cyan-500 to-cyan-600"
            />

            <CardWithIcon
              icon={<Heart className="w-6 h-6" />}
              title="Favorites"
              description="Save and organize your favorite stocks for quick access and tracking."
              iconBg="from-pink-500 to-pink-600"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Stats Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              label="Total Revenue"
              value="₹2.4Cr"
              change={12.5}
              icon={<DollarSign className="w-6 h-6" />}
            />

            <StatsCard
              label="Active Users"
              value="15,234"
              change={8.2}
              icon={<Users className="w-6 h-6" />}
            />

            <StatsCard
              label="Total Orders"
              value="3,456"
              change={-3.1}
              icon={<ShoppingCart className="w-6 h-6" />}
            />

            <StatsCard
              label="Market Cap"
              value="₹45.2K Cr"
              icon={<Activity className="w-6 h-6" />}
            />
          </div>
        </div>

        {/* Cards with Images */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cards with Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardWithImage
              image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop"
              icon={<TrendingUp className="w-6 h-6" />}
              title="Stock Market Analysis"
              description="Deep dive into market trends with advanced technical and fundamental analysis tools."
            />

            <CardWithImage
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
              icon={<BarChart3 className="w-6 h-6" />}
              title="Portfolio Management"
              description="Manage your investments efficiently with comprehensive portfolio tracking features."
            />

            <CardWithImage
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
              icon={<Zap className="w-6 h-6" />}
              title="Real-Time Alerts"
              description="Stay informed with instant notifications about market movements and opportunities."
            />
          </div>
        </div>

        {/* Hover Effects */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Cards (Hover Me!)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" padding="lg" hover>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hover Effect</h3>
                <p className="text-gray-600">
                  This card lifts up and enhances shadow on hover
                </p>
              </div>
            </Card>

            <Card variant="elevated" padding="lg" hover>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive</h3>
                <p className="text-gray-600">
                  Smooth transitions create engaging user experience
                </p>
              </div>
            </Card>

            <Card variant="default" padding="lg" hover>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Clickable</h3>
                <p className="text-gray-600">
                  Perfect for navigation and interactive elements
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Different Padding Sizes */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Padding Variations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" padding="sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Small Padding</h3>
              <p className="text-sm text-gray-600">Compact card with minimal spacing</p>
            </Card>

            <Card variant="default" padding="md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Medium Padding</h3>
              <p className="text-sm text-gray-600">Standard card with balanced spacing</p>
            </Card>

            <Card variant="default" padding="lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Large Padding</h3>
              <p className="text-sm text-gray-600">Spacious card with generous spacing</p>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
