import Header from "@/react-app/components/Header";
import MarketTicker from "@/react-app/components/MarketTicker";
import MarketOverview from "@/react-app/components/MarketOverview";
import HeroSection from "@/react-app/components/HeroSection";
import LiveMarketScanner from "@/react-app/components/LiveMarketScanner";
import WhyChooseSection from "@/react-app/components/WhyChooseSection";
import Footer from "@/react-app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <MarketTicker />
      <MarketOverview />
      <HeroSection />
      <LiveMarketScanner />
      <WhyChooseSection />
      <Footer />
    </div>
  );
}
