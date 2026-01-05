import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatNumber } from "@/lib/mock-data"
import type { Stock } from "@/lib/types"

interface StockStatsProps {
  stock: Stock
}

export function StockStats({ stock }: StockStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <StatItem label="Market Cap" value={formatCurrency(stock.marketCap)} />
          <StatItem label="Volume" value={formatNumber(stock.volume)} />
          <StatItem label="P/E Ratio" value={stock.pe ? stock.pe.toFixed(2) : "N/A"} />
          <StatItem label="52W High" value={`₹${stock.high52Week.toLocaleString("en-IN")}`} />
          <StatItem label="52W Low" value={`₹${stock.low52Week.toLocaleString("en-IN")}`} />
          <StatItem label="Sector" value={stock.sector} />
        </div>
      </CardContent>
    </Card>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-1">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  )
}
