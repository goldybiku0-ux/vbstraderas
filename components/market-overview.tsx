"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { useLiveIndices } from "@/hooks/use-live-market-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export function MarketOverview() {
  const { indices, loading, lastUpdate, refresh } = useLiveIndices(5000)

  if (loading && indices.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    )
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {indices.map((index) => (
          <Card key={index.name} className="p-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground font-medium">{index.name}</span>
              <span className="text-xl md:text-2xl font-bold">
                {index.value.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <div className="flex items-center gap-1 text-sm">
                {index.changePercent >= 0 ? (
                  <>
                    <TrendingUp className="size-4 text-emerald-600" />
                    <span className="text-emerald-600 font-medium">
                      +{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="size-4 text-red-600" />
                    <span className="text-red-600 font-medium">
                      {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                    </span>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
