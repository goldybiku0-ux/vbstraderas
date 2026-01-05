"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Stock } from "@/lib/types"

interface StockChartProps {
  stock: Stock
}

// Mock historical data
const generateMockData = (basePrice: number, days: number) => {
  const data = []
  let price = basePrice * 0.95

  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.48) * (basePrice * 0.02)
    price = price + change
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      }),
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 5000000) + 1000000,
    })
  }

  return data
}

export function StockChart({ stock }: StockChartProps) {
  const data1D = generateMockData(stock.price, 24)
  const data1W = generateMockData(stock.price, 7)
  const data1M = generateMockData(stock.price, 30)
  const data3M = generateMockData(stock.price, 90)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1M" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="1D">1D</TabsTrigger>
            <TabsTrigger value="1W">1W</TabsTrigger>
            <TabsTrigger value="1M">1M</TabsTrigger>
            <TabsTrigger value="3M">3M</TabsTrigger>
          </TabsList>

          <TabsContent value="1D" className="mt-6">
            <ChartDisplay data={data1D} />
          </TabsContent>

          <TabsContent value="1W" className="mt-6">
            <ChartDisplay data={data1W} />
          </TabsContent>

          <TabsContent value="1M" className="mt-6">
            <ChartDisplay data={data1M} />
          </TabsContent>

          <TabsContent value="3M" className="mt-6">
            <ChartDisplay data={data3M} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ChartDisplay({ data }: { data: any[] }) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={["dataMin - 50", "dataMax + 50"]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--primary))"
            fill="url(#priceGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
