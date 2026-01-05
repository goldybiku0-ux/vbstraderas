import { NextResponse } from "next/server"

const FUTURES = [
  {
    symbol: "NIFTY",
    spotPrice: 23250.1,
    futurePrice: 23285.5,
    premium: 35.4,
    premiumPercent: 0.15,
    expiry: "2025-01-30",
    lotSize: 25,
  },
  {
    symbol: "BANKNIFTY",
    spotPrice: 50245.75,
    futurePrice: 50312.2,
    premium: 66.45,
    premiumPercent: 0.13,
    expiry: "2025-01-30",
    lotSize: 15,
  },
  {
    symbol: "SENSEX",
    spotPrice: 76520.38,
    futurePrice: 76598.75,
    premium: 78.37,
    premiumPercent: 0.1,
    expiry: "2025-01-30",
    lotSize: 10,
  },
  {
    symbol: "RELIANCE",
    spotPrice: 2847.5,
    futurePrice: 2856.3,
    premium: 8.8,
    premiumPercent: 0.31,
    expiry: "2025-01-30",
    lotSize: 250,
  },
  {
    symbol: "TCS",
    spotPrice: 3950.2,
    futurePrice: 3962.4,
    premium: 12.2,
    premiumPercent: 0.31,
    expiry: "2025-01-30",
    lotSize: 125,
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      futures: FUTURES,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching futures data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch futures" }, { status: 500 })
  }
}
