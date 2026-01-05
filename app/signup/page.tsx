"use client"

import { SignupForm } from "@/components/auth/signup-form"
import Link from "next/link"
import { TrendingUp } from "lucide-react"

// Note: Removed 'export const dynamic = "force-dynamic"' since this is now a Client Component
// Client Components don't run during build time, solving the Netlify env var issue

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary/20 via-accent to-background p-12 flex-col justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <TrendingUp className="size-8 text-primary" />
          <span>VBS Trader</span>
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-balance leading-tight">
            Start Your Investment Journey Today
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Join thousands of investors using our platform to make informed trading decisions in the Indian stock
            market.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="space-y-1">
              <div className="text-3xl font-bold">15K+</div>
              <div className="text-sm text-muted-foreground">Stocks Tracked</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Investment in securities market are subject to market risks. Read all related documents carefully before
          investing.
        </p>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="md:hidden mb-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <TrendingUp className="size-6 text-primary" />
              <span>VBS Trader</span>
            </Link>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Create an account</h2>
            <p className="text-muted-foreground">Get started with your free account today</p>
          </div>

          <SignupForm />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
