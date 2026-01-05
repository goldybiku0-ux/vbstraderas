import { NextResponse } from "next/server"

const BASE_INDICES = [
  { name: "NIFTY 50", base: 21854.35 },
  { name: "SENSEX", base: 72240.26 },
  { name: "NIFTY BANK", base: 46789.55 },
  { name: "NIFTY IT", base: 34521.8 },
]

let previousIndices = BASE_INDICES.map((index) => ({
  name: index.name,
  value: index.base,
  change: 0,
  changePercent: 0,
}))

export async function GET() {
  try {
    const liveIndices = previousIndices.map((prevIndex, i) => {
      const randomMovement = (Math.random() - 0.5) * 0.004 // -0.2% to +0.2%
      const newValue = prevIndex.value * (1 + randomMovement)
      const change = newValue - BASE_INDICES[i].base
      const changePercent = (change / BASE_INDICES[i].base) * 100

      return {
        name: prevIndex.name,
        value: Number(newValue.toFixed(2)),
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
      }
    })

    previousIndices = liveIndices

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
