import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { TrendingUp } from "lucide-react"

export const dynamic = "force-dynamic"

export default function LoginPage() {
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
            Track Market Movements in Real-Time
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Access advanced analytics, R-Factor scoring, and personalized alerts for over 15,000 Indian stocks.
          </p>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Advanced Screening</h3>
                <p className="text-sm text-muted-foreground">Filter stocks by multiple criteria</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">R-Factor Analytics</h3>
                <p className="text-sm text-muted-foreground">Proprietary stock scoring system</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Investment in securities market are subject to market risks. Read all related documents carefully before
          investing.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="md:hidden mb-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <TrendingUp className="size-6 text-primary" />
              <span>VBS Trader</span>
            </Link>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
