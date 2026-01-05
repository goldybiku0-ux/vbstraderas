export interface Stock {
  symbol: string
  name: string
  exchange: "NSE" | "BSE"
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  rFactor?: number
  high52Week: number
  low52Week: number
  pe?: number
  sector: string
}

export interface StockAnalytics {
  symbol: string
  exchange: "NSE" | "BSE"
  rFactor: number
  momentumScore: number
  volatility: number
  volumeTrend: "increasing" | "decreasing" | "stable"
  calculatedAt: string
}

export interface UserProfile {
  id: string
  email: string
  fullName?: string
  subscriptionTier: "free" | "basic" | "premium"
  subscriptionStatus: "active" | "inactive" | "cancelled" | "trialing"
  subscriptionEndDate?: string
  stripeCustomerId?: string
}

export interface WatchlistItem {
  id: string
  userId: string
  symbol: string
  exchange: "NSE" | "BSE"
  addedAt: string
  notes?: string
}

export interface PriceAlert {
  id: string
  userId: string
  symbol: string
  exchange: "NSE" | "BSE"
  alertType: "above" | "below"
  targetPrice: number
  isActive: boolean
  triggeredAt?: string
  createdAt: string
}

export interface Future {
  symbol: string
  spotPrice: number
  futurePrice: number
  premium: number
  premiumPercent: number
  expiry: string
  lotSize: number
  openInterest?: number
}
