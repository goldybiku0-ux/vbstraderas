"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { StockTable } from "@/components/stock-table"
import { MOCK_STOCKS } from "@/lib/mock-data"
import { Plus, Search } from "lucide-react"

interface WatchlistManagerProps {
  userId: string
}

export function WatchlistManager({ userId }: WatchlistManagerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExchange, setSelectedExchange] = useState<string>("NSE")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Mock data - in production, fetch from database
  const watchlistStocks = MOCK_STOCKS.slice(0, 8)

  const filteredStocks = MOCK_STOCKS.filter(
    (stock) =>
      (stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      stock.exchange === selectedExchange,
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Stocks ({watchlistStocks.length})</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-4 mr-2" />
                Add Stock
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Stock to Watchlist</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Stock</Label>
                    <div className="relative mt-2">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by symbol or name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="w-32">
                    <Label>Exchange</Label>
                    <Select value={selectedExchange} onValueChange={setSelectedExchange}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NSE">NSE</SelectItem>
                        <SelectItem value="BSE">BSE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto border rounded-lg">
                  {filteredStocks.length > 0 ? (
                    <div className="divide-y">
                      {filteredStocks.slice(0, 10).map((stock) => (
                        <div
                          key={`${stock.symbol}-${stock.exchange}`}
                          className="flex items-center justify-between p-3 hover:bg-accent/50"
                        >
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">{stock.name}</div>
                          </div>
                          <Button size="sm">Add</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">No stocks found</div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {watchlistStocks.length > 0 ? (
            <StockTable stocks={watchlistStocks} showRFactor />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Your watchlist is empty</p>
              <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                Add your first stock
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
