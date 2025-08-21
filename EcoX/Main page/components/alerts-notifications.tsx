import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, AlertTriangle, Filter, CheckCircle, X } from "lucide-react"

export function AlertsNotifications() {
  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Tank Overflow Risk",
      message: "Water level at 85%. Rain expected tomorrow. Consider using stored water.",
      timestamp: "2 minutes ago",
      priority: "high",
      icon: AlertTriangle,
      actionable: true,
    },
    {
      id: 2,
      type: "maintenance",
      title: "Filter Maintenance Due",
      message: "Primary filter has been in use for 89 days. Replacement recommended.",
      timestamp: "1 hour ago",
      priority: "medium",
      icon: Filter,
      actionable: true,
    },
    {
      id: 3,
      type: "success",
      title: "System Health Check Complete",
      message: "All sensors are functioning normally. Water quality is excellent.",
      timestamp: "3 hours ago",
      priority: "low",
      icon: CheckCircle,
      actionable: false,
    },
  ]

  const getAlertVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "destructive"
      case "maintenance":
        return "default"
      case "success":
        return "default"
      default:
        return "default"
    }
  }

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-chart-3"
      case "low":
        return "text-chart-4"
      default:
        return "text-muted-foreground"
    }
  }

  const getPriorityBadge = (priority: string) => {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            Alerts & Notifications
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {alerts.filter((alert) => alert.priority === "high").length} High Priority
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">System alerts, maintenance reminders, and status updates</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon

          return (
            <Alert key={alert.id} variant={getAlertVariant(alert.type)} className="relative">
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 ${getAlertColor(alert.priority)}`} />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityBadge(alert.priority)}>{alert.priority}</Badge>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <AlertDescription className="text-sm">{alert.message}</AlertDescription>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    {alert.actionable && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Dismiss
                        </Button>
                        <Button size="sm">Take Action</Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Alert>
          )
        })}

        {/* Notification Settings */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-sm">Notification Preferences</h4>
            <Button variant="ghost" size="sm">
              Configure
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
              <span>Email alerts: Enabled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
              <span>SMS alerts: Enabled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
              <span>Push notifications: On</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              <span>Daily reports: Off</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
