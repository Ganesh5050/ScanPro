
CREATE TABLE fii_dii_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  fii_buy_cash REAL,
  fii_sell_cash REAL,
  fii_net_cash REAL,
  dii_buy_cash REAL,
  dii_sell_cash REAL,
  dii_net_cash REAL,
  nifty_50_value REAL,
  category TEXT DEFAULT 'Equity',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_fii_dii_data_date ON fii_dii_data(date);

CREATE TABLE company_filings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT NOT NULL,
  company_symbol TEXT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  document_url TEXT,
  reported_time DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_company_filings_reported ON company_filings(reported_time DESC);

CREATE TABLE bulk_block_deals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stock_symbol TEXT NOT NULL,
  stock_name TEXT NOT NULL,
  deal_date DATE NOT NULL,
  client_name TEXT NOT NULL,
  action TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  avg_price REAL NOT NULL,
  value_cr REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bulk_block_deals_date ON bulk_block_deals(deal_date DESC);

CREATE TABLE market_valuations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  index_name TEXT NOT NULL,
  date DATE NOT NULL,
  index_value REAL NOT NULL,
  pe_ratio REAL,
  pb_ratio REAL,
  dividend_yield REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_market_valuations_index_date ON market_valuations(index_name, date);
