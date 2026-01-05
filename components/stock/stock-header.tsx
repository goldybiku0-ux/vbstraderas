"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Bell, TrendingUp, TrendingDown } from "lucide-react"
import type { Stock } from "@/lib/types"

interface StockHeaderProps {
  stock: Stock
}

export function StockHeader({ stock }: StockHeaderProps) {
  const isPositive = stock.changePercent >= 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold">{stock.symbol}</h1>
            <Badge variant="outline">{stock.exchange}</Badge>
          </div>
          <p className="text-lg text-muted-foreground">{stock.name}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Bookmark className="size-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Bell className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <div className="text-4xl font-bold">₹{stock.price.toLocaleString("en-IN")}</div>
          <div className={`flex items-center gap-2 text-lg ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
            {isPositive ? <TrendingUp className="size-5" /> : <TrendingDown className="size-5" />}
            <span className="font-medium">
              {isPositive ? "+" : ""}
              {stock.change.toFixed(2)} ({isPositive ? "+" : ""}
              {stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {stock.rFactor && (
          <div className="ml-auto">
            <div className="text-sm text-muted-foreground mb-1">R-Factor Score</div>
            <Badge className="text-lg px-3 py-1 font-mono">{stock.rFactor.toFixed(1)}</Badge>
          </div>
        )}
      </div>
    </div>
  )
}
