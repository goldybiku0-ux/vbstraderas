// Stripe utility functions for subscription management

export const SUBSCRIPTION_PLANS = {
  free: {
    name: "Free",
    price: 0,
    features: {
      watchlistLimit: 10,
      alertsLimit: 0,
      rFactorAccess: false,
      advancedCharts: false,
    },
  },
  basic: {
    name: "Basic",
    price: 499,
    priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID || "price_basic_monthly",
    features: {
      watchlistLimit: 50,
      alertsLimit: 10,
      rFactorAccess: true,
      advancedCharts: false,
    },
  },
  premium: {
    name: "Premium",
    price: 999,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || "price_premium_monthly",
    features: {
      watchlistLimit: -1, // unlimited
      alertsLimit: -1, // unlimited
      rFactorAccess: true,
      advancedCharts: true,
    },
  },
}

export function getPlanFeatures(tier: "free" | "basic" | "premium") {
  return SUBSCRIPTION_PLANS[tier].features
}

export function canAccessFeature(
  tier: "free" | "basic" | "premium",
  feature: keyof typeof SUBSCRIPTION_PLANS.free.features,
) {
  const plan = SUBSCRIPTION_PLANS[tier]
  return plan.features[feature]
}
