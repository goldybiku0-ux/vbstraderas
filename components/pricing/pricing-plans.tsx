"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Perfect for getting started with stock screening",
    features: [
      "Access to 15,000+ stocks",
      "Basic stock screening",
      "Real-time market data",
      "Up to 10 watchlist stocks",
      "Market news feed",
    ],
    limitations: ["No R-Factor analytics", "No price alerts", "Limited filters"],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "basic",
    name: "Basic",
    price: 499,
    priceId: "price_basic_monthly",
    description: "Great for active traders and investors",
    features: [
      "Everything in Free",
      "R-Factor analytics",
      "Up to 50 watchlist stocks",
      "Up to 10 price alerts",
      "Advanced filtering",
      "Technical indicators",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    priceId: "price_premium_monthly",
    description: "For serious investors who need everything",
    features: [
      "Everything in Basic",
      "Unlimited watchlist",
      "Unlimited price alerts",
      "Advanced charting tools",
      "Portfolio analysis",
      "Export to Excel/CSV",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
]

export function PricingPlans() {
  const [billingInterval] = useState<"monthly" | "yearly">("monthly")

  const handleSubscribe = async (priceId: string | undefined) => {
    if (!priceId) {
      // Free plan - redirect to signup
      window.location.href = "/signup"
      return
    }

    // In production, this would create a Stripe checkout session
    console.log("[v0] Creating checkout session for:", priceId)
    // Redirect to checkout
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={cn("relative flex flex-col", plan.popular && "border-primary shadow-lg scale-105 md:scale-105")}
        >
          {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}

          <CardHeader>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₹{plan.price}</span>
              {plan.price > 0 && <span className="text-muted-foreground">/month</span>}
            </div>
          </CardHeader>

          <CardContent className="flex-1">
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="size-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {plan.limitations && (
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-muted-foreground mb-2">Not included:</p>
                <ul className="space-y-2">
                  {plan.limitations.map((limitation, index) => (
                    <li key={index} className="text-xs text-muted-foreground">
                      • {limitation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              variant={plan.popular ? "default" : "outline"}
              onClick={() => handleSubscribe(plan.priceId)}
            >
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
