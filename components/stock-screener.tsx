"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { MOCK_STOCKS } from "@/lib/mock-data"
import { StockTable } from "@/components/stock-table"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StockScreener() {
  const [searchQuery, setSearchQuery] = useState("")
  const [exchange, setExchange] = useState<string>("all")
  const [sector, setSector] = useState<string>("all")
  const [minPrice, setMinPrice] = useState<number[]>([0])
  const [minRFactor, setMinRFactor] = useState<number[]>([0])
  const [showFilters, setShowFilters] = useState(true)

  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(MOCK_STOCKS.map((s) => s.sector))]
    return uniqueSectors.sort()
  }, [])

  const filteredStocks = useMemo(() => {
    return MOCK_STOCKS.filter((stock) => {
      const matchesSearch =
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesExchange = exchange === "all" || stock.exchange === exchange

      const matchesSector = sector === "all" || stock.sector === sector

      const matchesPrice = stock.price >= minPrice[0]

      const matchesRFactor = !stock.rFactor || stock.rFactor >= minRFactor[0]

      return matchesSearch && matchesExchange && matchesSector && matchesPrice && matchesRFactor
    })
  }, [searchQuery, exchange, sector, minPrice, minRFactor])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (exchange !== "all") count++
    if (sector !== "all") count++
    if (minPrice[0] > 0) count++
    if (minRFactor[0] > 0) count++
    return count
  }, [exchange, sector, minPrice, minRFactor])

  const handleReset = () => {
    setSearchQuery("")
    setExchange("all")
    setSector("all")
    setMinPrice([0])
    setMinRFactor([0])
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by symbol or company name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant={activeFiltersCount > 0 ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto relative"
            >
              <SlidersHorizontal className="size-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 size-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Filter Criteria</CardTitle>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  Reset All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Exchange Filter */}
              <div className="space-y-2">
                <Label>Exchange</Label>
                <Select value={exchange} onValueChange={setExchange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Exchanges</SelectItem>
                    <SelectItem value="NSE">NSE</SelectItem>
                    <SelectItem value="BSE">BSE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sector Filter */}
              <div className="space-y-2">
                <Label>Sector</Label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sectors</SelectItem>
                    {sectors.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Minimum Price */}
              <div className="space-y-2">
                <Label>Minimum Price: ₹{minPrice[0].toLocaleString("en-IN")}</Label>
                <Slider value={minPrice} onValueChange={setMinPrice} max={15000} step={100} className="mt-2" />
              </div>

              {/* Minimum R-Factor */}
              <div className="space-y-2">
                <Label>Minimum R-Factor: {minRFactor[0].toFixed(1)}</Label>
                <Slider value={minRFactor} onValueChange={setMinRFactor} max={10} step={0.5} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Results</CardTitle>
            <span className="text-sm text-muted-foreground">
              Showing {filteredStocks.length} of {MOCK_STOCKS.length} stocks
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {filteredStocks.length > 0 ? (
            <StockTable stocks={filteredStocks} showRFactor />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No stocks found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
