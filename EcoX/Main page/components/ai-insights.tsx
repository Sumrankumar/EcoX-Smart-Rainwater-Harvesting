import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, CloudRain, Droplets, TrendingUp, AlertTriangle } from "lucide-react"

export function AIInsights() {
  const insights = [
    {
      type: "forecast",
      title: "Rain Prediction",
      message: "Rain expected tomorrow — increase storage readiness.",
      icon: CloudRain,
      priority: "high",
      action: "Prepare tanks",
    },
    {
      type: "usage",
      title: "Usage Optimization",
      message: "Gardening usage is high today, consider scheduling irrigation for tomorrow morning.",
      icon: Droplets,
      priority: "medium",
      action: "Schedule irrigation",
    },
    {
      type: "efficiency",
      title: "System Efficiency",
      message: "Your system is operating at 95% efficiency. Excellent performance!",
      icon: TrendingUp,
      priority: "low",
      action: "View details",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-chart-3 text-white"
      case "low":
        return "bg-chart-4 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return AlertTriangle
      case "medium":
        return Brain
      case "low":
        return TrendingUp
      default:
        return Brain
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          AI Insights & Forecast
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Smart recommendations based on weather, usage patterns, and system data
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          const PriorityIcon = getPriorityIcon(insight.priority)

          return (
            <div key={index} className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="font-medium text-sm">{insight.title}</span>
                </div>
                <Badge className={getPriorityColor(insight.priority)}>
                  <PriorityIcon className="h-3 w-3 mr-1" />
                  {insight.priority}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{insight.message}</p>

              <Button variant="outline" size="sm" className="w-full bg-transparent">
                {insight.action}
              </Button>
            </div>
          )
        })}

        {/* AI Learning Status */}
        <div className="mt-6 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Learning Status</span>
          </div>
          <p className="text-xs text-muted-foreground">System has analyzed 30 days of data. Prediction accuracy: 94%</p>
          <div className="mt-2 w-full bg-muted rounded-full h-1">
            <div className="bg-primary h-1 rounded-full" style={{ width: "94%" }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
