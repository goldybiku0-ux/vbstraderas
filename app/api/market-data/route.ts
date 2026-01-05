import { NextResponse } from "next/server"
import { MOCK_STOCKS } from "@/lib/mock-data"

// let previousStocks: Stock[] = [...MOCK_STOCKS]

export async function GET() {
  try {
    // const liveStocks: Stock[] = previousStocks.map((stock) => {
    //   // 60% chance of no movement, 40% chance of small price change
    //   const shouldMove = Math.random() > 0.6

    //   if (!shouldMove) {
    //     return stock
    //   }

    //   // Calculate realistic tick size based on price (₹0.05 for stocks under ₹1000, ₹0.10 for higher)
    //   const tickSize = stock.price < 1000 ? 0.05 : 0.1

    //   // Random tick movement: typically ±1 to ±5 ticks (like real market)
    //   const tickMovement = (Math.random() > 0.5 ? 1 : -1) * Math.ceil(Math.random() * 5) * tickSize
    //   const newPrice = stock.price + tickMovement

    //   const basePrice = MOCK_STOCKS.find((s) => s.symbol === stock.symbol && s.exchange === stock.exchange)!.price
    //   const priceChange = newPrice - basePrice
    //   const changePercent = (priceChange / basePrice) * 100

    //   // Volume changes are minimal per tick
    //   const volumeChange = Math.floor((Math.random() - 0.5) * 10000)
    //   const newVolume = Math.max(stock.volume + volumeChange, 0)

    //   return {
    //     ...stock,
    //     price: Number(newPrice.toFixed(2)),
    //     change: Number(priceChange.toFixed(2)),
    //     changePercent: Number(changePercent.toFixed(2)),
    //     volume: newVolume,
    //   }
    // })

    // previousStocks = liveStocks

    return NextResponse.json({
      success: true,
      stocks: MOCK_STOCKS,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching market data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch market data" }, { status: 500 })
  }
}
