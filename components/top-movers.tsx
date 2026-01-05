"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTopGainers, getTopLosers, getMostActive, getHighRFactor } from "@/lib/mock-data"
import { StockTable } from "@/components/stock-table"

export function TopMovers() {
  const topGainers = getTopGainers(5)
  const topLosers = getTopLosers(5)
  const mostActive = getMostActive(5)
  const highRFactor = getHighRFactor(5)

  return (
    <Tabs defaultValue="gainers" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
        <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
        <TabsTrigger value="losers">Top Losers</TabsTrigger>
        <TabsTrigger value="active">Most Active</TabsTrigger>
        <TabsTrigger value="rfactor">High R-Factor</TabsTrigger>
      </TabsList>

      <TabsContent value="gainers">
        <Card>
          <CardHeader>
            <CardTitle>Top Gainers Today</CardTitle>
          </CardHeader>
          <CardContent>
            <StockTable stocks={topGainers} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="losers">
        <Card>
          <CardHeader>
            <CardTitle>Top Losers Today</CardTitle>
          </CardHeader>
          <CardContent>
            <StockTable stocks={topLosers} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="active">
        <Card>
          <CardHeader>
            <CardTitle>Most Active by Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <StockTable stocks={mostActive} showVolume />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="rfactor">
        <Card>
          <CardHeader>
            <CardTitle>Highest R-Factor Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <StockTable stocks={highRFactor} showRFactor />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
