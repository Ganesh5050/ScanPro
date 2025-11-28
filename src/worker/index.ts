import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

// Get all stocks
app.get("/api/stocks", async (c) => {
  const db = c.env.DB;
  const stocks = await db
    .prepare("SELECT * FROM stocks ORDER BY market_cap DESC")
    .all();
  return c.json(stocks.results);
});

// Get stock by symbol
app.get("/api/stocks/:symbol", async (c) => {
  const symbol = c.req.param("symbol");
  const db = c.env.DB;
  const stock = await db
    .prepare("SELECT * FROM stocks WHERE symbol = ?")
    .bind(symbol)
    .first();
  return c.json(stock);
});

// Get market signals
app.get("/api/signals", async (c) => {
  const db = c.env.DB;
  const signals = await db
    .prepare(`
      SELECT ms.*, s.name, s.price, s.price_change, s.price_change_percent 
      FROM market_signals ms 
      LEFT JOIN stocks s ON ms.stock_symbol = s.symbol 
      ORDER BY ms.timestamp DESC 
      LIMIT 100
    `)
    .all();
  return c.json(signals.results);
});

// Get signals by type
app.get("/api/signals/:type", async (c) => {
  const type = c.req.param("type");
  const db = c.env.DB;
  const signals = await db
    .prepare(`
      SELECT ms.*, s.name, s.price, s.price_change, s.price_change_percent 
      FROM market_signals ms 
      LEFT JOIN stocks s ON ms.stock_symbol = s.symbol 
      WHERE ms.signal_type = ?
      ORDER BY ms.timestamp DESC 
      LIMIT 50
    `)
    .bind(type)
    .all();
  return c.json(signals.results);
});

// Get screeners
app.get("/api/screeners", async (c) => {
  const trending = c.req.query("trending");
  const db = c.env.DB;
  
  let query = "SELECT * FROM screeners";
  if (trending === "true") {
    query += " WHERE is_trending = 1";
  }
  query += " ORDER BY match_count DESC";
  
  const screeners = await db.prepare(query).all();
  return c.json(screeners.results);
});

// Get screener by id
app.get("/api/screeners/:id", async (c) => {
  const id = c.req.param("id");
  const db = c.env.DB;
  const screener = await db
    .prepare("SELECT * FROM screeners WHERE id = ?")
    .bind(id)
    .first();
  return c.json(screener);
});

// Get news articles
app.get("/api/news", async (c) => {
  const category = c.req.query("category");
  const db = c.env.DB;
  
  let query = "SELECT * FROM news_articles";
  const params = [];
  
  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }
  
  query += " ORDER BY published_date DESC LIMIT 50";
  
  const stmt = db.prepare(query);
  const news = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all();
  return c.json(news.results);
});

// Get news article by id
app.get("/api/news/:id", async (c) => {
  const id = c.req.param("id");
  const db = c.env.DB;
  const article = await db
    .prepare("SELECT * FROM news_articles WHERE id = ?")
    .bind(id)
    .first();
  return c.json(article);
});

// Get top movers
app.get("/api/top-movers", async (c) => {
  const db = c.env.DB;
  const movers = await db
    .prepare(`
      SELECT * FROM stocks 
      WHERE sector != 'Index' 
      ORDER BY ABS(price_change_percent) DESC 
      LIMIT 10
    `)
    .all();
  return c.json(movers.results);
});

// Get stocks by sector
app.get("/api/stocks/sector/:sector", async (c) => {
  const sector = c.req.param("sector");
  const db = c.env.DB;
  const stocks = await db
    .prepare("SELECT * FROM stocks WHERE sector = ? ORDER BY market_cap DESC")
    .bind(sector)
    .all();
  return c.json(stocks.results);
});

// FII/DII Data endpoints
app.get("/api/fii-dii-data", async (c) => {
  const category = c.req.query("category") || "Equity";
  const days = parseInt(c.req.query("days") || "30");
  const db = c.env.DB;
  
  const data = await db
    .prepare(`
      SELECT * FROM fii_dii_data 
      WHERE category = ?
      ORDER BY date DESC 
      LIMIT ?
    `)
    .bind(category, days)
    .all();
  return c.json(data.results);
});

// Company Filings endpoints
app.get("/api/company-filings", async (c) => {
  const category = c.req.query("category");
  const db = c.env.DB;
  
  let query = "SELECT * FROM company_filings";
  const params = [];
  
  if (category && category !== "All") {
    query += " WHERE category = ?";
    params.push(category);
  }
  
  query += " ORDER BY reported_time DESC LIMIT 100";
  
  const stmt = db.prepare(query);
  const filings = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all();
  return c.json(filings.results);
});

// Bulk/Block Deals endpoints
app.get("/api/bulk-block-deals", async (c) => {
  const action = c.req.query("action");
  const db = c.env.DB;
  
  let query = "SELECT * FROM bulk_block_deals";
  const params = [];
  
  if (action && action !== "All") {
    query += " WHERE action = ?";
    params.push(action);
  }
  
  query += " ORDER BY deal_date DESC LIMIT 100";
  
  const stmt = db.prepare(query);
  const deals = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all();
  return c.json(deals.results);
});

// Market Valuation endpoints
app.get("/api/market-valuations", async (c) => {
  const indices = c.req.query("indices")?.split(",") || ["NIFTY 50"];
  const period = c.req.query("period") || "5Y";
  const db = c.env.DB;
  
  // Calculate date range based on period
  const days = period === "1M" ? 30 : period === "6M" ? 180 : period === "1Y" ? 365 : period === "5Y" ? 1825 : period === "10Y" ? 3650 : 1825;
  
  const placeholders = indices.map(() => "?").join(",");
  const query = `
    SELECT * FROM market_valuations 
    WHERE index_name IN (${placeholders})
    AND date >= date('now', '-${days} days')
    ORDER BY date ASC
  `;
  
  const valuations = await db.prepare(query).bind(...indices).all();
  return c.json(valuations.results);
});

export default app;
