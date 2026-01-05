"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, ArrowRight, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLiveMarketData } from "@/hooks/use-live-market-data"
import { Skeleton } from "@/components/ui/skeleton"

interface SectorStats {
  name: string
  totalStocks: number
  gainers: number
  losers: number
  neutral: number
  avgChange: number
  sentiment: "bullish" | "bearish" | "neutral"
}

export function SectorOverview() {
  const { stocks, loading, lastUpdate, refresh } = useLiveMarketData(1500)

  const sectorStats = useMemo(() => {
    const sectors: { [key: string]: SectorStats } = {}

    stocks.forEach((stock) => {
      const sector = stock.sector
      if (!sectors[sector]) {
        sectors[sector] = {
          name: sector,
          totalStocks: 0,
          gainers: 0,
          losers: 0,
          neutral: 0,
          avgChange: 0,
          sentiment: "neutral",
        }
      }

      sectors[sector].totalStocks++

      if (stock.changePercent > 0) {
        sectors[sector].gainers++
      } else if (stock.changePercent < 0) {
        sectors[sector].losers++
      } else {
        sectors[sector].neutral++
      }

      sectors[sector].avgChange += stock.changePercent
    })

    // Calculate averages and determine sentiment
    Object.keys(sectors).forEach((sector) => {
      const stats = sectors[sector]
      stats.avgChange = stats.avgChange / stats.totalStocks

      // Determine sentiment based on losers percentage
      const losersPercent = (stats.losers / stats.totalStocks) * 100
      const gainersPercent = (stats.gainers / stats.totalStocks) * 100

      if (losersPercent >= 50) {
        stats.sentiment = "bearish"
      } else if (gainersPercent > 50) {
        stats.sentiment = "bullish"
      } else {
        stats.sentiment = "neutral"
      }
    })

    return Object.values(sectors).sort((a, b) => b.avgChange - a.avgChange)
  }, [stocks])

  if (loading && stocks.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Live update indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">
            {lastUpdate ? `Updated ${lastUpdate.toLocaleTimeString()}` : "Live updates"}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={refresh}>
          <RefreshCw className="size-4" />
        </Button>
      </div>

      {/* Sector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectorStats.map((sector) => (
          <Link key={sector.name} href={`/?sector=${encodeURIComponent(sector.name)}`} className="group">
            <Card
              className={`transition-all hover:shadow-lg hover:-translate-y-1 border-2 ${
                sector.sentiment === "bullish"
                  ? "border-green-500/50 bg-green-500/5"
                  : sector.sentiment === "bearish"
                    ? "border-red-500/50 bg-red-500/5"
                    : "border-border"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-bold">{sector.name}</CardTitle>
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold smooth-update ${
                      sector.avgChange > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {sector.avgChange > 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                    {sector.avgChange > 0 ? "+" : ""}
                    {sector.avgChange.toFixed(2)}%
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{sector.totalStocks}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-green-600">{sector.gainers}</p>
                    <p className="text-xs text-muted-foreground">Gainers</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-red-600">{sector.losers}</p>
                    <p className="text-xs text-muted-foreground">Losers</p>
                  </div>
                </div>

                {/* Performance Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Gainers</span>
                    <span>Losers</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                    <div
                      className="bg-green-500 transition-all duration-500"
                      style={{
                        width: `${(sector.gainers / sector.totalStocks) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-red-500 transition-all duration-500"
                      style={{
                        width: `${(sector.losers / sector.totalStocks) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-green-600">{((sector.gainers / sector.totalStocks) * 100).toFixed(0)}%</span>
                    <span className="text-red-600">{((sector.losers / sector.totalStocks) * 100).toFixed(0)}%</span>
                  </div>
                </div>

                {/* Sentiment Badge */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      sector.sentiment === "bullish"
                        ? "bg-green-100 text-green-700"
                        : sector.sentiment === "bearish"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {sector.sentiment === "bullish"
                      ? "🟢 Bullish"
                      : sector.sentiment === "bearish"
                        ? "🔴 Bearish"
                        : "⚪ Neutral"}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    View Stocks
                    <ArrowRight className="size-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Market Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{sectorStats.length}</p>
              <p className="text-sm text-muted-foreground">Total Sectors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {sectorStats.filter((s) => s.sentiment === "bullish").length}
              </p>
              <p className="text-sm text-muted-foreground">Bullish Sectors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">
                {sectorStats.filter((s) => s.sentiment === "bearish").length}
              </p>
              <p className="text-sm text-muted-foreground">Bearish Sectors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-600">
                {sectorStats.filter((s) => s.sentiment === "neutral").length}
              </p>
              <p className="text-sm text-muted-foreground">Neutral Sectors</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
