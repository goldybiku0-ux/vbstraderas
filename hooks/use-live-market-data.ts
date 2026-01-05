"use client"

import { useState, useEffect, useCallback } from "react"
import type { Stock } from "@/lib/types"

export function useLiveMarketData(refreshInterval = 5000) {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchMarketData = useCallback(async () => {
    try {
      console.log("[v0] Fetching live market data...")
      const response = await fetch("/api/market-data")

      if (!response.ok) {
        throw new Error(`Failed to fetch market data: ${response.statusText}`)
      }

      const data = await response.json()
      setStocks(data.stocks || [])
      setLastUpdate(new Date())
      setError(null)
      console.log("[v0] Market data updated successfully", data.stocks?.length, "stocks")
    } catch (err) {
      console.error("[v0] Error fetching market data:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch market data")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch
    fetchMarketData()

    // Set up polling for live updates
    const interval = setInterval(fetchMarketData, refreshInterval)

    return () => clearInterval(interval)
  }, [fetchMarketData, refreshInterval])

  return { stocks, loading, error, lastUpdate, refresh: fetchMarketData }
}

export function useLiveIndices(refreshInterval = 3000) {
  const [indices, setIndices] = useState<
    Array<{
      name: string
      value: number
      change: number
      changePercent: number
    }>
  >([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchIndices = useCallback(async () => {
    try {
      console.log("[v0] Fetching live indices...")
      const response = await fetch("/api/indices")

      if (!response.ok) {
        throw new Error(`Failed to fetch indices: ${response.statusText}`)
      }

      const data = await response.json()
      setIndices(data.indices || [])
      setLastUpdate(new Date())
      console.log("[v0] Indices updated successfully")
    } catch (err) {
      console.error("[v0] Error fetching indices:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchIndices()
    const interval = setInterval(fetchIndices, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchIndices, refreshInterval])

  return { indices, loading, lastUpdate, refresh: fetchIndices }
}
