import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import NewsPage from "@/react-app/pages/News";
import ScreenerPage from "@/react-app/pages/Screener";
import ScreenersPage from "@/react-app/pages/Screeners";
import InsightsPage from "@/react-app/pages/Insights";
import FiiDiiDataPage from "@/react-app/pages/FiiDiiData";
import CompanyFilingsPage from "@/react-app/pages/CompanyFilings";
import BulkBlockDealsPage from "@/react-app/pages/BulkBlockDeals";
import MarketValuationPage from "@/react-app/pages/MarketValuation";
import SignalsPage from "@/react-app/pages/Signals";
import MTMPage from "@/react-app/pages/MTM";
import FnoBanPage from "@/react-app/pages/FnoBan";
import TopDeliveriesPage from "@/react-app/pages/TopDeliveries";
import StockDetailPage from "@/react-app/pages/StockDetail";
import HeatmapPage from "@/react-app/pages/Heatmap";
import SectorAnalysisPage from "@/react-app/pages/SectorAnalysis";
import ButtonShowcasePage from "@/react-app/pages/ButtonShowcase";
import CardShowcasePage from "@/react-app/pages/CardShowcase";
import InputShowcasePage from "@/react-app/pages/InputShowcase";
import ScreenerBuilderPage from "@/react-app/pages/ScreenerBuilder";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stocks" element={<ScreenerPage />} />
        <Route path="/stock/:symbol" element={<StockDetailPage />} />
        <Route path="/screener" element={<ScreenerPage />} />
        <Route path="/create" element={<ScreenerBuilderPage />} />
        <Route path="/heatmap" element={<HeatmapPage />} />
        <Route path="/sectors" element={<SectorAnalysisPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/screeners" element={<ScreenersPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/fii-dii" element={<FiiDiiDataPage />} />
        <Route path="/insights/company-filings" element={<CompanyFilingsPage />} />
        <Route path="/insights/bulk-block-deals" element={<BulkBlockDealsPage />} />
        <Route path="/insights/signals" element={<SignalsPage />} />
        <Route path="/insights/mtm" element={<MTMPage />} />
        <Route path="/insights/fno-ban" element={<FnoBanPage />} />
        <Route path="/insights/top-deliveries" element={<TopDeliveriesPage />} />
        <Route path="/insights/market-valuation" element={<MarketValuationPage />} />
        <Route path="/buttons" element={<ButtonShowcasePage />} />
        <Route path="/cards" element={<CardShowcasePage />} />
        <Route path="/inputs" element={<InputShowcasePage />} />
      </Routes>
    </Router>
  );
}
