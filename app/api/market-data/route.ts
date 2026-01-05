import { NextResponse } from "next/server"
import { MOCK_STOCKS } from "@/lib/mock-data"
import type { Stock } from "@/lib/types"

let previousStocks: Stock[] = [...MOCK_STOCKS]

export async function GET() {
  try {
    const liveStocks: Stock[] = previousStocks.map((stock) => {
      // 85% chance of no movement (most ticks have no change in real markets)
      const shouldMove = Math.random() > 0.85

      if (!shouldMove) {
        return stock
      }

      // Very small movements: ±0.05 to ±2 rupees max per tick
      const maxMovement = stock.price < 100 ? 0.5 : stock.price < 1000 ? 1.0 : 2.0
      const movement = (Math.random() - 0.5) * maxMovement
      const newPrice = Math.max(stock.price + movement, 0.05)

      const basePrice = MOCK_STOCKS.find((s) => s.symbol === stock.symbol && s.exchange === stock.exchange)!.price
      const priceChange = newPrice - basePrice
      const changePercent = (priceChange / basePrice) * 100

      // Minimal volume changes
      const volumeChange = Math.floor((Math.random() - 0.5) * 5000)
      const newVolume = Math.max(stock.volume + volumeChange, 0)

      return {
        ...stock,
        price: Number(newPrice.toFixed(2)),
        change: Number(priceChange.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        volume: newVolume,
      }
    })

    previousStocks = liveStocks

    return NextResponse.json({
      success: true,
      stocks: liveStocks,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching market data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch market data" }, { status: 500 })
  }
}
