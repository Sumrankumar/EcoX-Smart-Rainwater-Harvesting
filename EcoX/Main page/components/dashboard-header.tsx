"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Thermometer, LogOut, User } from "lucide-react"
import { useEffect, useState } from "react"
import { WeatherWidget } from "@/components/weather-widget"

export function DashboardHeader() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        setUser(parsed)
      } catch {
        // Corrupted value; clear and force sign-in
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Smart Rainwater Harvesting & Purification System</h1>
            <p className="text-muted-foreground mt-1">
              {currentDate} • {currentTime}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* User Info */}
            {user && (
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {user.name || user.email}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="ml-2"
                  >
                    <LogOut className="h-3 w-3 mr-1" />
                    Logout
                  </Button>
                </div>
              </Card>
            )}

            {/* Weather Widget */}
            <WeatherWidget />
          </div>
        </div>
      </div>
    </header>
  )
}
