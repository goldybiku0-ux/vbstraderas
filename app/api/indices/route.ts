import { NextResponse } from "next/server"

const INDICES = [
  { name: "NIFTY 50", value: 23250.1, change: -45.3, changePercent: -0.19 },
  { name: "SENSEX", value: 76520.38, change: -123.45, changePercent: -0.16 },
  { name: "NIFTY BANK", value: 50245.75, change: 85.6, changePercent: 0.17 },
  { name: "NIFTY IT", value: 40125.3, change: -234.5, changePercent: -0.58 },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      indices: INDICES,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching indices data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch indices" }, { status: 500 })
  }
}
