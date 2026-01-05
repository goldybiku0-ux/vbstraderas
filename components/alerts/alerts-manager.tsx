"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Plus, Trash2 } from "lucide-react"

interface AlertsManagerProps {
  userId: string
}

export function AlertsManager({ userId }: AlertsManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Mock alerts - in production, fetch from database
  const alerts = [
    {
      id: "1",
      symbol: "RELIANCE",
      exchange: "NSE",
      alertType: "above",
      targetPrice: 2900,
      currentPrice: 2847.5,
      isActive: true,
    },
    {
      id: "2",
      symbol: "TCS",
      exchange: "NSE",
      alertType: "below",
      targetPrice: 3900,
      currentPrice: 3950.2,
      isActive: true,
    },
    {
      id: "3",
      symbol: "HDFCBANK",
      exchange: "NSE",
      alertType: "above",
      targetPrice: 1700,
      currentPrice: 1678.9,
      isActive: true,
    },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Alerts ({alerts.length})</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-4 mr-2" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Price Alert</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="symbol">Stock Symbol</Label>
                  <Input id="symbol" placeholder="e.g., RELIANCE" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exchange">Exchange</Label>
                  <Select defaultValue="NSE">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NSE">NSE</SelectItem>
                      <SelectItem value="BSE">BSE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alertType">Alert When Price Is</Label>
                  <Select defaultValue="above">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="above">Above</SelectItem>
                      <SelectItem value="below">Below</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetPrice">Target Price (₹)</Label>
                  <Input id="targetPrice" type="number" placeholder="0.00" step="0.01" />
                </div>
                <Button type="submit" className="w-full">
                  Create Alert
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {alerts.length > 0 ? (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <Bell className={`size-5 ${alert.isActive ? "text-primary" : "text-muted-foreground"}`} />
                    <div>
                      <div className="font-medium">
                        {alert.symbol} ({alert.exchange})
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Alert when price is {alert.alertType} ₹{alert.targetPrice.toLocaleString("en-IN")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Current: ₹{alert.currentPrice.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={alert.isActive ? "default" : "secondary"}>
                      {alert.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="size-12 mx-auto mb-4 opacity-50" />
              <p>No price alerts set</p>
              <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                Create your first alert
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
