"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Crown, Zap, CheckCircle } from "lucide-react"
import type { UserProfile } from "@/lib/types"

interface SubscriptionManagerProps {
  profile: UserProfile | null
}

export function SubscriptionManager({ profile }: SubscriptionManagerProps) {
  const subscriptionTier = profile?.subscriptionTier || "free"
  const subscriptionStatus = profile?.subscriptionStatus || "inactive"
  const isActive = subscriptionStatus === "active" || subscriptionStatus === "trialing"

  const handleManageBilling = async () => {
    // In production, create a Stripe billing portal session
    console.log("[v0] Opening billing portal")
  }

  const handleUpgrade = () => {
    window.location.href = "/pricing"
  }

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your subscription details and billing information</CardDescription>
            </div>
            <Badge variant={isActive ? "default" : "secondary"} className="capitalize">
              {subscriptionTier}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Plan Details */}
            <div className="flex items-start gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                {subscriptionTier === "premium" ? (
                  <Crown className="size-6 text-primary" />
                ) : subscriptionTier === "basic" ? (
                  <Zap className="size-6 text-primary" />
                ) : (
                  <CheckCircle className="size-6 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg capitalize">{subscriptionTier} Plan</h3>
                <p className="text-sm text-muted-foreground">
                  {subscriptionTier === "free" && "Basic features with limited access"}
                  {subscriptionTier === "basic" && "Advanced analytics and price alerts"}
                  {subscriptionTier === "premium" && "Full access to all features"}
                </p>

                {isActive && subscriptionTier !== "free" && (
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" onClick={handleManageBilling}>
                      <CreditCard className="size-4 mr-2" />
                      Manage Billing
                    </Button>
                    {subscriptionTier !== "premium" && (
                      <Button onClick={handleUpgrade}>
                        <Crown className="size-4 mr-2" />
                        Upgrade Plan
                      </Button>
                    )}
                  </div>
                )}

                {subscriptionTier === "free" && (
                  <Button className="mt-4" onClick={handleUpgrade}>
                    Upgrade to Premium
                  </Button>
                )}
              </div>
            </div>

            {/* Status Alert */}
            {subscriptionStatus === "trialing" && (
              <Alert>
                <AlertDescription>
                  You're currently on a free trial. Your subscription will start on{" "}
                  {profile?.subscriptionEndDate
                    ? new Date(profile.subscriptionEndDate).toLocaleDateString()
                    : "trial end date"}
                  .
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Features by Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Features</CardTitle>
          <CardDescription>What's included in your current plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureItem title="Stock Screening" description="Access to basic stock filters" available={true} />
            <FeatureItem
              title="Watchlist"
              description={subscriptionTier === "premium" ? "Unlimited stocks" : "Up to 50 stocks"}
              available={true}
            />
            <FeatureItem
              title="R-Factor Analytics"
              description="Advanced stock scoring"
              available={subscriptionTier !== "free"}
            />
            <FeatureItem
              title="Price Alerts"
              description="Get notified on price changes"
              available={subscriptionTier !== "free"}
            />
            <FeatureItem
              title="Advanced Charts"
              description="Technical analysis tools"
              available={subscriptionTier === "premium"}
            />
            <FeatureItem
              title="Portfolio Analysis"
              description="Track performance metrics"
              available={subscriptionTier === "premium"}
            />
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      {isActive && subscriptionTier !== "free" && (
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Your recent transactions and invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>No billing history available</p>
              <p className="text-sm mt-2">Your invoices will appear here after your first payment</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function FeatureItem({
  title,
  description,
  available,
}: {
  title: string
  description: string
  available: boolean
}) {
  return (
    <div className={cn("flex items-start gap-3", !available && "opacity-50")}>
      <CheckCircle
        className={cn("size-5 flex-shrink-0 mt-0.5", available ? "text-primary" : "text-muted-foreground")}
      />
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
