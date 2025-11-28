// Service to fetch and parse real market data from Google Sheets

export interface LiveStock {
  symbol: string;
  ticker: string;
  name: string;
  currentPrice: number;
  open: number;
  high: number;
  low: number;
  closePrice: number;
  change: number;
  changePercent: number;
  volumeAvg: number;
  high52w: number;
  low52w: number;
  marketCap: number;
  chart3d?: string;
}

export interface LiveIndex {
  index: string;
  indexSymbol: string;
  currentPrice: number;
  open: number;
  high: number;
  low: number;
  closePrice: number;
  change: number;
  changePercent: number;
  high52w: number;
  low52w: number;
  chart3d?: string;
}

const STOCKS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTe_jvQxbvO9CPQfHWKWJNujBlPfojS8bVcCoVYCq7TGL5ovst6prSgGwt-cEdzFUoDZlBfCDkfAec9/pub?output=csv';
const INDICES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmu-1ua2OhETfc4MIcuPCs7ZDH-SMRTh2QIr3IbD35OUB1NxDfIKkLL2osGMZ76kKlU5opx722TiBz/pub?output=csv';

// Cache for data
let stocksCache: LiveStock[] | null = null;
let indicesCache: LiveIndex[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60000; // 1 minute

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseNumber(value: string): number {
  if (!value || value === '') return 0;
  // Remove commas and quotes
  const cleaned = value.replace(/[,"]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export async function fetchStocksData(): Promise<LiveStock[]> {
  const now = Date.now();
  if (stocksCache && (now - lastFetchTime) < CACHE_DURATION) {
    return stocksCache;
  }

  try {
    const response = await fetch(STOCKS_CSV_URL);
    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    // Skip header
    const dataLines = lines.slice(1);
    
    const stocks: LiveStock[] = dataLines.map(line => {
      const cols = parseCSVLine(line);
      return {
        symbol: cols[0] || '',
        ticker: cols[1] || '',
        name: cols[2] || '',
        currentPrice: parseNumber(cols[3]),
        open: parseNumber(cols[4]),
        high: parseNumber(cols[5]),
        low: parseNumber(cols[6]),
        closePrice: parseNumber(cols[7]),
        change: parseNumber(cols[8]),
        changePercent: parseNumber(cols[9]),
        volumeAvg: parseNumber(cols[10]),
        high52w: parseNumber(cols[11]),
        low52w: parseNumber(cols[12]),
        marketCap: parseNumber(cols[13]),
        chart3d: cols[14] || ''
      };
    }).filter(stock => stock.symbol && stock.currentPrice > 0);

    stocksCache = stocks;
    lastFetchTime = now;
    return stocks;
  } catch (error) {
    console.error('Error fetching stocks data:', error);
    return stocksCache || [];
  }
}

export async function fetchIndicesData(): Promise<LiveIndex[]> {
  const now = Date.now();
  if (indicesCache && (now - lastFetchTime) < CACHE_DURATION) {
    return indicesCache;
  }

  try {
    const response = await fetch(INDICES_CSV_URL);
    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    // Skip header
    const dataLines = lines.slice(1);
    
    const indices: LiveIndex[] = dataLines.map(line => {
      const cols = parseCSVLine(line);
      return {
        index: cols[0] || '',
        indexSymbol: cols[1] || '',
        currentPrice: parseNumber(cols[2]),
        open: parseNumber(cols[3]),
        high: parseNumber(cols[4]),
        low: parseNumber(cols[5]),
        closePrice: parseNumber(cols[6]),
        change: parseNumber(cols[7]),
        changePercent: parseNumber(cols[8]),
        high52w: parseNumber(cols[9]),
        low52w: parseNumber(cols[10]),
        chart3d: cols[11] || ''
      };
    }).filter(index => index.index && index.currentPrice > 0);

    indicesCache = indices;
    lastFetchTime = now;
    return indices;
  } catch (error) {
    console.error('Error fetching indices data:', error);
    return indicesCache || [];
  }
}

export async function searchStocks(query: string, limit = 20): Promise<LiveStock[]> {
  const stocks = await fetchStocksData();
  const searchTerm = query.toLowerCase();
  
  return stocks
    .filter(stock => 
      stock.symbol.toLowerCase().includes(searchTerm) ||
      stock.name.toLowerCase().includes(searchTerm)
    )
    .slice(0, limit);
}

export async function getStockBySymbol(symbol: string): Promise<LiveStock | null> {
  const stocks = await fetchStocksData();
  return stocks.find(stock => stock.symbol === symbol) || null;
}

export async function getTopGainers(limit = 10): Promise<LiveStock[]> {
  const stocks = await fetchStocksData();
  return stocks
    .filter(stock => stock.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, limit);
}

export async function getTopLosers(limit = 10): Promise<LiveStock[]> {
  const stocks = await fetchStocksData();
  return stocks
    .filter(stock => stock.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, limit);
}

export async function getMostActive(limit = 10): Promise<LiveStock[]> {
  const stocks = await fetchStocksData();
  return stocks
    .sort((a, b) => b.volumeAvg - a.volumeAvg)
    .slice(0, limit);
}
