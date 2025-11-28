
CREATE TABLE stocks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  symbol TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price REAL,
  price_change REAL,
  price_change_percent REAL,
  day_high REAL,
  day_low REAL,
  volume INTEGER,
  week_52_high REAL,
  week_52_low REAL,
  one_month_return REAL,
  market_cap REAL,
  sector TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_stocks_symbol ON stocks(symbol);
CREATE INDEX idx_stocks_sector ON stocks(sector);

CREATE TABLE news_articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  summary TEXT,
  image_url TEXT,
  source TEXT,
  published_date DATETIME,
  category TEXT,
  related_stocks TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_news_category ON news_articles(category);
CREATE INDEX idx_news_published_date ON news_articles(published_date);

CREATE TABLE screeners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  icon_type TEXT,
  category TEXT,
  match_count INTEGER DEFAULT 0,
  criteria TEXT,
  is_trending BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_screeners_category ON screeners(category);
CREATE INDEX idx_screeners_trending ON screeners(is_trending);

CREATE TABLE market_signals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  signal_type TEXT NOT NULL,
  stock_symbol TEXT NOT NULL,
  indicator_name TEXT,
  value REAL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_signals_type ON market_signals(signal_type);
CREATE INDEX idx_signals_symbol ON market_signals(stock_symbol);
