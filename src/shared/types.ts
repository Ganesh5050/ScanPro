import z from "zod";

export const StockSchema = z.object({
  id: z.number(),
  symbol: z.string(),
  name: z.string(),
  price: z.number().nullable(),
  price_change: z.number().nullable(),
  price_change_percent: z.number().nullable(),
  day_high: z.number().nullable(),
  day_low: z.number().nullable(),
  volume: z.number().nullable(),
  week_52_high: z.number().nullable(),
  week_52_low: z.number().nullable(),
  one_month_return: z.number().nullable(),
  market_cap: z.number().nullable(),
  sector: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Stock = z.infer<typeof StockSchema>;

export const NewsArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  summary: z.string().nullable(),
  image_url: z.string().nullable(),
  source: z.string().nullable(),
  published_date: z.string().nullable(),
  category: z.string().nullable(),
  related_stocks: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type NewsArticle = z.infer<typeof NewsArticleSchema>;

export const ScreenerSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  icon_type: z.string().nullable(),
  category: z.string().nullable(),
  match_count: z.number(),
  criteria: z.string().nullable(),
  is_trending: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Screener = z.infer<typeof ScreenerSchema>;

export const MarketSignalSchema = z.object({
  id: z.number(),
  signal_type: z.string(),
  stock_symbol: z.string(),
  indicator_name: z.string().nullable(),
  value: z.number().nullable(),
  timestamp: z.string(),
  name: z.string().optional(),
  price: z.number().optional(),
  price_change: z.number().optional(),
  price_change_percent: z.number().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type MarketSignal = z.infer<typeof MarketSignalSchema>;

export const FiiDiiDataSchema = z.object({
  id: z.number(),
  date: z.string(),
  fii_buy_cash: z.number().nullable(),
  fii_sell_cash: z.number().nullable(),
  fii_net_cash: z.number().nullable(),
  dii_buy_cash: z.number().nullable(),
  dii_sell_cash: z.number().nullable(),
  dii_net_cash: z.number().nullable(),
  nifty_50_value: z.number().nullable(),
  category: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type FiiDiiData = z.infer<typeof FiiDiiDataSchema>;

export const CompanyFilingSchema = z.object({
  id: z.number(),
  company_name: z.string(),
  company_symbol: z.string().nullable(),
  category: z.string(),
  description: z.string(),
  document_url: z.string().nullable(),
  reported_time: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type CompanyFiling = z.infer<typeof CompanyFilingSchema>;

export const BulkBlockDealSchema = z.object({
  id: z.number(),
  stock_symbol: z.string(),
  stock_name: z.string(),
  deal_date: z.string(),
  client_name: z.string(),
  action: z.string(),
  quantity: z.number(),
  avg_price: z.number(),
  value_cr: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type BulkBlockDeal = z.infer<typeof BulkBlockDealSchema>;

export const MarketValuationSchema = z.object({
  id: z.number(),
  index_name: z.string(),
  date: z.string(),
  index_value: z.number(),
  pe_ratio: z.number().nullable(),
  pb_ratio: z.number().nullable(),
  dividend_yield: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type MarketValuation = z.infer<typeof MarketValuationSchema>;
