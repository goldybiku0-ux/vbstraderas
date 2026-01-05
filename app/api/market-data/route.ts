import { NextResponse } from "next/server"
import { MOCK_STOCKS } from "@/lib/mock-data"
import type { Stock } from "@/lib/types"

let previousStocks: Stock[] = [...MOCK_STOCKS]

export async function GET() {
  try {
    const liveStocks: Stock[] = previousStocks.map((stock) => {
      const randomMovement = (Math.random() - 0.5) * 0.01 // -0.5% to +0.5%
      const newPrice = stock.price * (1 + randomMovement)
      const priceChange = newPrice - MOCK_STOCKS.find((s) => s.symbol === stock.symbol)!.price
      const changePercent = (priceChange / MOCK_STOCKS.find((s) => s.symbol === stock.symbol)!.price) * 100

      const volumeChange = (Math.random() - 0.5) * 0.05 // ±2.5%
      const newVolume = Math.floor(stock.volume * (1 + volumeChange))

      return {
        ...stock,
        price: Number(newPrice.toFixed(2)),
        change: Number(priceChange.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        volume: Math.max(newVolume, 0),
      }
    })

    previousStocks = liveStocks

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
