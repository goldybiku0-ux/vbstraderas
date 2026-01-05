import { NextResponse } from "next/server"

let previousIndices = [
  { name: "NIFTY 50", value: 23250.1, change: -45.3, changePercent: -0.19, baseValue: 23295.4 },
  { name: "SENSEX", value: 76520.38, change: -123.45, changePercent: -0.16, baseValue: 76643.83 },
  { name: "NIFTY BANK", value: 50245.75, change: 85.6, changePercent: 0.17, baseValue: 50160.15 },
  { name: "NIFTY IT", value: 40125.3, change: -234.5, changePercent: -0.58, baseValue: 40359.8 },
]

export async function GET() {
  try {
    const liveIndices = previousIndices.map((index) => {
      // 90% chance of no movement (indices are more stable)
      const shouldMove = Math.random() > 0.9

      if (!shouldMove) {
        return { ...index }
      }

      // Tiny movements: ±0.5 to ±5 points max per tick
      const movement = (Math.random() - 0.5) * 10
      const newValue = Number((index.value + movement).toFixed(2))
      const change = newValue - index.baseValue
      const changePercent = (change / index.baseValue) * 100

      return {
        ...index,
        value: newValue,
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
      }
    })

    previousIndices = liveIndices

    return NextResponse.json({
      success: true,
      indices: liveIndices.map(({ baseValue, ...rest }) => rest),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching indices data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch indices" }, { status: 500 })
  }
}
