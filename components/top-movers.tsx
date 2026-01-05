"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StockTable } from "@/components/stock-table"
import { useLiveMarketData } from "@/hooks/use-live-market-data"
import { Skeleton } from "@/components/ui/skeleton"
import { useMemo } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TopMovers() {
  const { stocks, loading, lastUpdate, refresh } = useLiveMarketData(1500)

  const topGainers = useMemo(() => [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 5), [stocks])

  const topLosers = useMemo(() => [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 5), [stocks])

  const mostActive = useMemo(() => [...stocks].sort((a, b) => b.volume - a.volume).slice(0, 5), [stocks])

  const highRFactor = useMemo(
    () =>
      [...stocks]
        .filter((s) => s.rFactor !== undefined)
        .sort((a, b) => (b.rFactor || 0) - (a.rFactor || 0))
        .slice(0, 5),
    [stocks],
  )

  if (loading && stocks.length === 0) {
    return <Skeleton className="h-96" />
  }

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

      <Tabs defaultValue="gainers" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
          <TabsTrigger value="losers">Top Losers</TabsTrigger>
          <TabsTrigger value="active">Most Active</TabsTrigger>
          <TabsTrigger value="rfactor">High R-Factor</TabsTrigger>
        </TabsList>

        <TabsContent value="gainers">
          <Card>
            <CardHeader>
              <CardTitle>Top Gainers Today</CardTitle>
            </CardHeader>
            <CardContent>
              <StockTable stocks={topGainers} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="losers">
          <Card>
            <CardHeader>
              <CardTitle>Top Losers Today</CardTitle>
            </CardHeader>
            <CardContent>
              <StockTable stocks={topLosers} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Most Active by Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <StockTable stocks={mostActive} showVolume />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rfactor">
          <Card>
            <CardHeader>
              <CardTitle>Highest R-Factor Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <StockTable stocks={highRFactor} showRFactor />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
