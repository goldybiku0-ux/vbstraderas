import { NextResponse } from "next/server"

const BASE_INDICES = [
  { name: "NIFTY 50", base: 21854.35 },
  { name: "SENSEX", base: 72240.26 },
  { name: "NIFTY BANK", base: 46789.55 },
  { name: "NIFTY IT", base: 34521.8 },
]

export async function GET() {
  try {
    // Simulate live index movements (±0.2% to ±1.5%)
    const liveIndices = BASE_INDICES.map((index) => {
      const randomMovement = (Math.random() - 0.5) * 0.03 // -1.5% to +1.5%
      const newValue = index.base * (1 + randomMovement)
      const change = newValue - index.base
      const changePercent = (change / index.base) * 100

      return {
        name: index.name,
        value: Number(newValue.toFixed(2)),
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
      }
    })

    return NextResponse.json({
      success: true,
      indices: liveIndices,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error generating indices data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch indices" }, { status: 500 })
  }
}
