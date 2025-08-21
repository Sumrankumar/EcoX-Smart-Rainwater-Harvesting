import { DashboardHeader } from "@/components/dashboard-header"
import { WaterTankStatus } from "@/components/water-tank-status"
import { WaterQualityMonitoring } from "@/components/water-quality-monitoring"
import { UsageAndSavings } from "@/components/usage-and-savings"
import { AIInsights } from "@/components/ai-insights"
import { AlertsNotifications } from "@/components/alerts-notifications"
import { AuthWrapper } from "@/components/auth-wrapper"

export default function SmartRWHDashboard() {
  return (
    <AuthWrapper>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Hero Section - Water Tank Status */}
          <WaterTankStatus />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Water Quality Monitoring */}
            <div className="lg:col-span-2">
              <WaterQualityMonitoring />
            </div>

            {/* AI Insights */}
            <div className="lg:col-span-1">
              <AIInsights />
            </div>
          </div>

          {/* Usage & Savings */}
          <UsageAndSavings />

          {/* Alerts & Notifications */}
          <AlertsNotifications />
        </main>
      </div>
    </AuthWrapper>
  )
}
