import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Stock } from "@/lib/types"

interface StockAboutProps {
  stock: Stock
}

export function StockAbout({ stock }: StockAboutProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Sector</h3>
          <Badge variant="secondary">{stock.sector}</Badge>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Exchange</h3>
          <p className="text-sm text-muted-foreground">
            {stock.exchange === "NSE" ? "National Stock Exchange" : "Bombay Stock Exchange"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {stock.symbol} is a leading company in the {stock.sector.toLowerCase()} sector, listed on the{" "}
            {stock.exchange}. The company has shown consistent performance with a market capitalization of{" "}
            {formatCurrency(stock.marketCap)}.
          </p>
        </div>

        {stock.rFactor && (
          <div>
            <h3 className="font-semibold mb-2">R-Factor Analysis</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              With an R-Factor score of {stock.rFactor.toFixed(1)}, this stock shows{" "}
              {stock.rFactor >= 7.5 ? "strong" : stock.rFactor >= 6.5 ? "moderate" : "weak"} momentum and relative
              strength compared to its peers.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function formatCurrency(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`
  }
  return `₹${value.toFixed(2)}`
}
