"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudRain, Sun, Cloud, Thermometer, MapPin } from "lucide-react"

type WeatherData = {
  location: { latitude: number; longitude: number }
  current: {
    temperature: number | null
    windspeed: number | null
    weathercode: number | null
    isRaining: boolean
  }
  today: {
    precipitationProbabilityMax: number | null
    precipitationSum: number | null
    date: string | null
  }
  tomorrow: {
    precipitationProbabilityMax: number | null
    precipitationSum: number | null
    date: string | null
  }
}

export function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    function fetchWeather(latitude?: number, longitude?: number) {
      const url = new URL("/api/weather", window.location.origin)
      if (latitude !== undefined && longitude !== undefined) {
        url.searchParams.set("lat", String(latitude))
        url.searchParams.set("lon", String(longitude))
      }

      fetch(url.toString())
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to fetch weather")
          return (await res.json()) as WeatherData
        })
        .then((json) => {
          if (!mounted) return
          setData(json)
          setLoading(false)
        })
        .catch((e) => {
          if (!mounted) return
          setError(e.message)
          setLoading(false)
        })
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(),
        { enableHighAccuracy: true, timeout: 4000 }
      )
    } else {
      fetchWeather()
    }

    return () => {
      mounted = false
    }
  }, [])

  const renderIcon = () => {
    if (!data) return <Cloud className="h-4 w-4" />
    if (data.current.isRaining) return <CloudRain className="h-4 w-4 text-primary" />
    return <Sun className="h-4 w-4 text-yellow-500" />
  }

  return (
    <Card className="p-4 min-w-[280px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {renderIcon()}
            <span className="text-sm font-medium">Weather</span>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {data?.today.precipitationProbabilityMax != null
              ? `Rain chance: ${data.today.precipitationProbabilityMax}%`
              : loading
              ? "Loading..."
              : "N/A"}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Thermometer className="h-4 w-4" />
          <span>
            {data?.current.temperature != null
              ? `${Math.round(data.current.temperature)}°C`
              : loading
              ? "--"
              : "N/A"}
          </span>
        </div>
      </div>
      <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
        <MapPin className="h-3 w-3" />
        {data ? (
          <span>
            {data.location.latitude.toFixed(2)}, {data.location.longitude.toFixed(2)} • {data.current.isRaining ? "Rain expected" : "No rain"}
          </span>
        ) : error ? (
          <span>Error loading weather</span>
        ) : (
          <span>Detecting location...</span>
        )}
      </div>
    </Card>
  )
}


