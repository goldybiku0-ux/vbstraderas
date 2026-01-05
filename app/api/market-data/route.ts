import { NextResponse } from "next/server"
import { MOCK_STOCKS } from "@/lib/mock-data"
import type { Stock } from "@/lib/types"

export async function GET() {
  try {
    // Simulate live price movements (±0.5% to ±2%)
    const liveStocks: Stock[] = MOCK_STOCKS.map((stock) => {
      const randomMovement = (Math.random() - 0.5) * 0.04 // -2% to +2%
      const newPrice = stock.price * (1 + randomMovement)
      const priceChange = newPrice - stock.price
      const changePercent = (priceChange / stock.price) * 100

      // Simulate volume changes
      const volumeChange = (Math.random() - 0.5) * 0.3 // ±15%
      const newVolume = Math.floor(stock.volume * (1 + volumeChange))

      return {
        ...stock,
        price: Number(newPrice.toFixed(2)),
        change: Number(priceChange.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        volume: newVolume,
      }
    })

    return NextResponse.json({
      success: true,
      stocks: liveStocks,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error generating market data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch market data" }, { status: 500 })
  }
}
