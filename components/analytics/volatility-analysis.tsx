"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MOCK_STOCKS } from "@/lib/mock-data"

export function VolatilityAnalysis() {
  // Calculate volatility based on price range
  const stocksWithVolatility = MOCK_STOCKS.map((stock) => {
    const priceRange = ((stock.high52Week - stock.low52Week) / stock.low52Week) * 100
    return {
      ...stock,
      volatility: priceRange,
    }
  }).sort((a, b) => b.volatility - a.volatility)

  const highVolatility = stocksWithVolatility.slice(0, 5)
  const lowVolatility = stocksWithVolatility.slice(-5).reverse()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Volatility Analysis</h2>
        <p className="text-muted-foreground">Stock volatility based on 52-week price range</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>High Volatility Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {highVolatility.map((stock) => (
                <div
                  key={`${stock.symbol}-${stock.exchange}`}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      52W Range: ₹{stock.low52Week.toLocaleString()} - ₹{stock.high52Week.toLocaleString()}
                    </div>
                  </div>
                  <Badge variant="destructive">{stock.volatility.toFixed(1)}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Volatility Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowVolatility.map((stock) => (
                <div
                  key={`${stock.symbol}-${stock.exchange}`}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      52W Range: ₹{stock.low52Week.toLocaleString()} - ₹{stock.high52Week.toLocaleString()}
                    </div>
                  </div>
                  <Badge variant="secondary">{stock.volatility.toFixed(1)}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
