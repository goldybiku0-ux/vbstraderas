import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { StockTable } from "@/components/stock-table"
import { MOCK_STOCKS } from "@/lib/mock-data"

interface WatchlistWidgetProps {
  userId: string
}

export function WatchlistWidget({ userId }: WatchlistWidgetProps) {
  // Mock data - in production, fetch from database
  const watchlistStocks = MOCK_STOCKS.slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Watchlist</CardTitle>
        <Button size="sm" asChild>
          <Link href="/watchlist">
            <Plus className="size-4 mr-1" />
            Add Stock
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {watchlistStocks.length > 0 ? (
          <StockTable stocks={watchlistStocks} />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Your watchlist is empty</p>
            <Button size="sm" className="mt-4" asChild>
              <Link href="/watchlist">Add your first stock</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
