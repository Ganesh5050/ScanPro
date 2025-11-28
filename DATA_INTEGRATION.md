# ScanX - Real Market Data Integration

## Overview
ScanX now integrates real-time stock market data from Google Sheets containing 2000+ Indian stocks and indices.

## Data Sources

### Stocks Data
- **URL**: https://docs.google.com/spreadsheets/d/e/2PACX-1vTe_jvQxbvO9CPQfHWKWJNujBlPfojS8bVcCoVYCq7TGL5ovst6prSgGwt-cEdzFUoDZlBfCDkfAec9/pub?output=csv
- **Contains**: 2000+ Indian stocks with live prices, changes, volumes, 52-week highs/lows, market cap

### Indices Data
- **URL**: https://docs.google.com/spreadsheets/d/e/2PACX-1vRmu-1ua2OhETfc4MIcuPCs7ZDH-SMRTh2QIr3IbD35OUB1NxDfIKkLL2osGMZ76kKlU5opx722TiBz/pub?output=csv
- **Contains**: Indian indices (NIFTY 50, BANK NIFTY, sector indices, etc.)

## Features Implemented

### 1. Market Data Service (`src/shared/marketDataService.ts`)
- Fetches and parses CSV data from Google Sheets
- Caches data for 1 minute to reduce API calls
- Provides utility functions:
  - `fetchStocksData()` - Get all stocks
  - `fetchIndicesData()` - Get all indices
  - `searchStocks(query)` - Search stocks by name/symbol
  - `getTopGainers(limit)` - Get top gaining stocks
  - `getTopLosers(limit)` - Get top losing stocks
  - `getMostActive(limit)` - Get most actively traded stocks

### 2. Updated Components

#### MarketTicker
- Shows live indices with real prices and percentage changes
- Auto-refreshes every minute
- Smooth scrolling animation

#### LiveMarketScanner
- Displays 4 categories:
  - Top Gainers
  - Top Losers
  - Near 52W High
  - Near 52W Low
- Shows real stock data with prices and changes
- Auto-refreshes every minute

#### Screener Page
- Full stock screener with 2000+ stocks
- Real-time search functionality
- Sortable columns (Price, Change %, Volume, Market Cap)
- Shows 52-week high/low ranges
- Displays actual market data

## Data Structure

### Stock Data
```typescript
{
  symbol: string;          // Stock symbol (e.g., "RELIANCE")
  ticker: string;          // NSE ticker (e.g., "NSE:RELIANCE")
  name: string;            // Company name
  currentPrice: number;    // Current trading price
  open: number;            // Opening price
  high: number;            // Day high
  low: number;             // Day low
  closePrice: number;      // Previous close
  change: number;          // Price change
  changePercent: number;   // Percentage change
  volumeAvg: number;       // Average volume
  high52w: number;         // 52-week high
  low52w: number;          // 52-week low
  marketCap: number;       // Market capitalization (in Cr)
}
```

### Index Data
```typescript
{
  index: string;           // Index name (e.g., "NIFTY_50")
  indexSymbol: string;     // Index symbol
  currentPrice: number;    // Current index value
  open: number;            // Opening value
  high: number;            // Day high
  low: number;             // Day low
  closePrice: number;      // Previous close
  change: number;          // Value change
  changePercent: number;   // Percentage change
  high52w: number;         // 52-week high
  low52w: number;          // 52-week low
}
```

## Usage

### Fetching Stock Data
```typescript
import { fetchStocksData, getTopGainers } from '@/shared/marketDataService';

// Get all stocks
const stocks = await fetchStocksData();

// Get top 10 gainers
const gainers = await getTopGainers(10);
```

### Searching Stocks
```typescript
import { searchStocks } from '@/shared/marketDataService';

const results = await searchStocks('RELIANCE', 20);
```

## Performance
- Data is cached for 60 seconds to minimize API calls
- CSV parsing is optimized for large datasets
- Components auto-refresh to show latest data

## Future Enhancements
- Add more filtering options (sector, market cap range, etc.)
- Implement advanced technical indicators
- Add stock comparison features
- Create custom screener builder
- Add historical data charts
