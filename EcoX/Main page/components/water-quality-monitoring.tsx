import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Droplets, Zap, Eye, Shield } from "lucide-react"

export function WaterQualityMonitoring() {
  const qualityMetrics = [
    {
      name: "pH Level",
      value: 7.2,
      unit: "",
      range: "6.5-8.5",
      status: "safe",
      icon: Droplets,
      progress: 72,
    },
    {
      name: "Turbidity",
      value: 2.1,
      unit: "NTU",
      range: "<5",
      status: "safe",
      icon: Eye,
      progress: 42,
    },
    {
      name: "TDS",
      value: 145,
      unit: "ppm",
      range: "<500",
      status: "safe",
      icon: Zap,
      progress: 29,
    },
    {
      name: "Microbial Level",
      value: 0,
      unit: "CFU/ml",
      range: "0",
      status: "safe",
      icon: Shield,
      progress: 0,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-chart-4 text-white"
      case "caution":
        return "bg-chart-3 text-white"
      case "unsafe":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-chart-4"
      case "caution":
        return "bg-chart-3"
      case "unsafe":
        return "bg-destructive"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Water Quality Monitoring
        </CardTitle>
        <p className="text-sm text-muted-foreground">Real-time IoT sensor data from your purification system</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {qualityMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.name} className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{metric.name}</span>
                  </div>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status === "safe" ? "Safe" : metric.status === "caution" ? "Caution" : "Unsafe"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-bold text-foreground">
                      {metric.value}
                      {metric.unit}
                    </span>
                    <span className="text-sm text-muted-foreground">Range: {metric.range}</span>
                  </div>

                  <div className="space-y-1">
                    <Progress value={metric.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">Within safe parameters</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
