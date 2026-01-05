"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const sectorData = [
  { sector: "IT", performance: 2.4 },
  { sector: "Banking", performance: 1.8 },
  { sector: "Pharma", performance: 1.2 },
  { sector: "Auto", performance: 0.9 },
  { sector: "Energy", performance: 0.5 },
  { sector: "FMCG", performance: -0.3 },
  { sector: "Telecom", performance: -0.7 },
  { sector: "Metals", performance: -1.2 },
]

export function SectorPerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Sector Performance</h2>
        <p className="text-muted-foreground">Daily performance across major sectors</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Sector Returns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  type="number"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="sector"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Return"]}
                />
                <Bar dataKey="performance" radius={[0, 4, 4, 0]}>
                  {sectorData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.performance >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
