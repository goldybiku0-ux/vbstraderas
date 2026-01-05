"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { mockStockData } from "@/lib/mock-data"
import Link from "next/link"
import { Line, LineChart, ResponsiveContainer } from "recharts"

function generatePriceHistory(currentPrice: number, changePercent: number) {
  const points = 20
  const history = []
  const startPrice = currentPrice / (1 + changePercent / 100)

  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1)
    const price = startPrice + (currentPrice - startPrice) * progress + (Math.random() - 0.5) * startPrice * 0.02
    history.push({ value: price })
  }

  return history
}

export function RFactorHighlights() {
  const topRFactor = [...mockStockData].sort((a, b) => b.rFactor - a.rFactor)[0]
  const lowestRFactor = [...mockStockData].sort((a, b) => a.rFactor - b.rFactor)[0]

  const topChartData = generatePriceHistory(topRFactor.price, topRFactor.changePercent)
  const lowestChartData = generatePriceHistory(lowestRFactor.price, lowestRFactor.changePercent)

  return (
    <div className="grid md:grid-cols-2 gap-3 md:gap-4">
      {/* Top R-Factor Stock */}
      <Link href={`/stock/${topRFactor.exchange}:${topRFactor.symbol}`}>
        <Card className="p-4 hover:shadow-lg transition-shadow border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-50/50 to-background dark:from-emerald-950/20">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="size-4 text-emerald-600" />
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs"
                >
                  Highest R-Factor
                </Badge>
              </div>
              <h3 className="text-2xl font-bold">{topRFactor.symbol}</h3>
              <p className="text-xs text-muted-foreground">{topRFactor.name}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">₹{topRFactor.price.toFixed(2)}</div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${topRFactor.change >= 0 ? "text-emerald-600" : "text-red-600"}`}
              >
                {topRFactor.change >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {topRFactor.change >= 0 ? "+" : ""}
                {topRFactor.changePercent.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="mb-3 h-12 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={topChartData}>
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t">
            <div>
              <div className="text-xs text-muted-foreground mb-1">R-Factor Score</div>
              <div className="text-xl font-bold text-emerald-600">{topRFactor.rFactor.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Volume</div>
              <div className="text-base font-semibold">{(topRFactor.volume / 1000000).toFixed(2)}M</div>
            </div>
          </div>
        </Card>
      </Link>

      {/* Lowest R-Factor Stock */}
      <Link href={`/stock/${lowestRFactor.exchange}:${lowestRFactor.symbol}`}>
        <Card className="p-4 hover:shadow-lg transition-shadow border-2 border-red-500/20 bg-gradient-to-br from-red-50/50 to-background dark:from-red-950/20">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="size-4 text-red-600" />
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs"
                >
                  Lowest R-Factor
                </Badge>
              </div>
              <h3 className="text-2xl font-bold">{lowestRFactor.symbol}</h3>
              <p className="text-xs text-muted-foreground">{lowestRFactor.name}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">₹{lowestRFactor.price.toFixed(2)}</div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${lowestRFactor.change >= 0 ? "text-emerald-600" : "text-red-600"}`}
              >
                {lowestRFactor.change >= 0 ? (
                  <ArrowUpRight className="size-3" />
                ) : (
                  <ArrowDownRight className="size-3" />
                )}
                {lowestRFactor.change >= 0 ? "+" : ""}
                {lowestRFactor.changePercent.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="mb-3 h-12 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lowestChartData}>
                <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t">
            <div>
              <div className="text-xs text-muted-foreground mb-1">R-Factor Score</div>
              <div className="text-xl font-bold text-red-600">{lowestRFactor.rFactor.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Volume</div>
              <div className="text-base font-semibold">{(lowestRFactor.volume / 1000000).toFixed(2)}M</div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  )
}
