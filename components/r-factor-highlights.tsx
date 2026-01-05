"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Line, LineChart, ResponsiveContainer } from "recharts"
import { useLiveMarketData } from "@/hooks/use-live-market-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"

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
  const { stocks, loading, lastUpdate, refresh } = useLiveMarketData(1500)

  const topGainers = useMemo(() => {
    return [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 2)
  }, [stocks])

  const topLosers = useMemo(() => {
    return [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 2)
  }, [stocks])

  if (loading && stocks.length === 0) {
    return (
      <div className="grid md:grid-cols-2 gap-3 md:gap-4">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    )
  }

  const topGainer = topGainers[0]
  const topLoser = topLosers[0]

  if (!topGainer || !topLoser) {
    return null
  }

  const topChartData = generatePriceHistory(topGainer.price, topGainer.changePercent)
  const lowestChartData = generatePriceHistory(topLoser.price, topLoser.changePercent)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">
            {lastUpdate ? `Updated ${lastUpdate.toLocaleTimeString()}` : "Live"}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={refresh}>
          <RefreshCw className="size-4" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-3 md:gap-4">
        {/* Top Gainer */}
        <Link href={`/stock/${topGainer.exchange}:${topGainer.symbol}`}>
          <Card
            className={`p-4 hover:shadow-lg transition-shadow border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-50/50 to-background dark:from-emerald-950/20 ${
              topGainer.priceFlash === "up" ? "price-flash-up" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="size-4 text-emerald-600" />
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs"
                  >
                    Top Gainer
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold">{topGainer.symbol}</h3>
                <p className="text-xs text-muted-foreground">{topGainer.name}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold smooth-update">₹{topGainer.price.toFixed(2)}</div>
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 smooth-update">
                  <ArrowUpRight className="size-3" />+{topGainer.changePercent.toFixed(2)}%
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
                <div className="text-xs text-muted-foreground mb-1">Change</div>
                <div className="text-xl font-bold text-emerald-600 smooth-update">+₹{topGainer.change.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Volume</div>
                <div className="text-base font-semibold">{(topGainer.volume / 1000000).toFixed(2)}M</div>
              </div>
            </div>
          </Card>
        </Link>

        {/* Top Loser */}
        <Link href={`/stock/${topLoser.exchange}:${topLoser.symbol}`}>
          <Card
            className={`p-4 hover:shadow-lg transition-shadow border-2 border-red-500/20 bg-gradient-to-br from-red-50/50 to-background dark:from-red-950/20 ${
              topLoser.priceFlash === "down" ? "price-flash-down" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="size-4 text-red-600" />
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs"
                  >
                    Top Loser
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold">{topLoser.symbol}</h3>
                <p className="text-xs text-muted-foreground">{topLoser.name}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold smooth-update">₹{topLoser.price.toFixed(2)}</div>
                <div className="flex items-center gap-1 text-xs font-medium text-red-600 smooth-update">
                  <ArrowDownRight className="size-3" />
                  {topLoser.changePercent.toFixed(2)}%
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
                <div className="text-xs text-muted-foreground mb-1">Change</div>
                <div className="text-xl font-bold text-red-600 smooth-update">₹{topLoser.change.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Volume</div>
                <div className="text-base font-semibold">{(topLoser.volume / 1000000).toFixed(2)}M</div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}
