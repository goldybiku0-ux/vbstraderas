import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTopGainers, getTopLosers } from "@/lib/mock-data"
import { TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

export function TopPerformers() {
  const topGainers = getTopGainers(5)
  const topLosers = getTopLosers(5)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Top Performers</h2>
        <p className="text-muted-foreground">Best and worst performing stocks today</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-emerald-600" />
              Top Gainers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topGainers.map((stock, index) => (
                <Link
                  key={`${stock.symbol}-${stock.exchange}`}
                  href={`/stock/${stock.exchange}:${stock.symbol}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground">₹{stock.price.toLocaleString("en-IN")}</div>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100">
                    +{stock.changePercent.toFixed(2)}%
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="size-5 text-red-600" />
              Top Losers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topLosers.map((stock, index) => (
                <Link
                  key={`${stock.symbol}-${stock.exchange}`}
                  href={`/stock/${stock.exchange}:${stock.symbol}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground">₹{stock.price.toLocaleString("en-IN")}</div>
                    </div>
                  </div>
                  <Badge className="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 hover:bg-red-100">
                    {stock.changePercent.toFixed(2)}%
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
