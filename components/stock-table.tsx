import Link from "next/link"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatNumber } from "@/lib/mock-data"
import type { Stock } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface StockTableProps {
  stocks: Stock[]
  showVolume?: boolean
  showRFactor?: boolean
}

export function StockTable({ stocks, showVolume, showRFactor }: StockTableProps) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Change</TableHead>
            {showVolume && <TableHead className="text-right">Volume</TableHead>}
            {showRFactor && <TableHead className="text-right">R-Factor</TableHead>}
            <TableHead className="text-right">Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={`${stock.symbol}-${stock.exchange}`}>
              <TableCell>
                <Link
                  href={`/stock/${stock.exchange}:${stock.symbol}`}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {stock.symbol}
                </Link>
              </TableCell>
              <TableCell className="max-w-48 truncate">{stock.name}</TableCell>
              <TableCell className="text-right font-medium">₹{stock.price.toLocaleString("en-IN")}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {stock.changePercent >= 0 ? (
                    <>
                      <TrendingUp className="size-4 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">+{stock.changePercent.toFixed(2)}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="size-4 text-red-600" />
                      <span className="text-red-600 font-medium">{stock.changePercent.toFixed(2)}%</span>
                    </>
                  )}
                </div>
              </TableCell>
              {showVolume && (
                <TableCell className="text-right text-sm text-muted-foreground">{formatNumber(stock.volume)}</TableCell>
              )}
              {showRFactor && (
                <TableCell className="text-right">
                  {stock.rFactor && (
                    <Badge variant={stock.rFactor >= 7.5 ? "default" : "secondary"} className="font-mono">
                      {stock.rFactor.toFixed(1)}
                    </Badge>
                  )}
                </TableCell>
              )}
              <TableCell className="text-right text-sm text-muted-foreground">
                {formatCurrency(stock.marketCap)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
