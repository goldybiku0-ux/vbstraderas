import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingPlans } from "@/components/pricing/pricing-plans"
import { PricingFAQ } from "@/components/pricing/pricing-faq"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-muted/30 to-background">
          <div className="container py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4">
                Choose Your Plan
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance">
                Unlock advanced analytics and premium features to make better investment decisions
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16">
          <div className="container">
            <PricingPlans />
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Included</h2>
              <p className="text-muted-foreground">All plans include access to our powerful stock screening tools</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <FeatureCard
                title="Real-Time Data"
                description="Live market data from BSE and NSE with minimal delay"
                included={["free", "basic", "premium"]}
              />
              <FeatureCard
                title="Advanced Filters"
                description="Filter stocks by price, volume, sector, and market cap"
                included={["free", "basic", "premium"]}
              />
              <FeatureCard
                title="R-Factor Analytics"
                description="Proprietary scoring system for stock evaluation"
                included={["basic", "premium"]}
              />
              <FeatureCard
                title="Price Alerts"
                description="Get notified when stocks hit your target prices"
                included={["basic", "premium"]}
              />
              <FeatureCard
                title="Unlimited Watchlist"
                description="Track as many stocks as you want in your portfolio"
                included={["premium"]}
              />
              <FeatureCard
                title="Advanced Charts"
                description="Technical analysis tools and candlestick patterns"
                included={["premium"]}
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container">
            <PricingFAQ />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureCard({
  title,
  description,
  included,
}: {
  title: string
  description: string
  included: string[]
}) {
  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
          <Check className="size-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {included.map((plan) => (
              <span key={plan} className="text-xs px-2 py-1 bg-muted rounded capitalize">
                {plan}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
