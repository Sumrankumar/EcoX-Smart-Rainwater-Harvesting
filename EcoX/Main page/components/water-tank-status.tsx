import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Droplets, TrendingUp } from "lucide-react"

export function WaterTankStatus() {
  const currentLevel = 75 // percentage
  const capacity = 5000 // liters
  const currentVolume = (capacity * currentLevel) / 100

  const getStatusColor = (level: number) => {
    if (level >= 80) return "text-destructive"
    if (level >= 60) return "text-chart-3"
    return "text-chart-4"
  }

  const getStatusText = (level: number) => {
    if (level >= 80) return "Overflow Risk"
    if (level >= 60) return "Caution"
    return "Safe"
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-6 w-6 text-primary" />
          Water Tank Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Tank Visualization */}
          <div className="relative">
            <div className="mx-auto w-32 h-48 border-4 border-border rounded-lg relative overflow-hidden bg-muted">
              {/* Water Level Animation */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/70 transition-all duration-1000 ease-out"
                style={{ height: `${currentLevel}%` }}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-primary/30 animate-pulse"></div>
              </div>

              {/* Level Markers */}
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-border">
                <div className="absolute right-2 top-[20%] text-xs text-muted-foreground">100%</div>
                <div className="absolute right-2 top-[45%] text-xs text-muted-foreground">75%</div>
                <div className="absolute right-2 top-[70%] text-xs text-muted-foreground">50%</div>
                <div className="absolute right-2 top-[95%] text-xs text-muted-foreground">0%</div>
              </div>
            </div>

            <div className="text-center mt-4">
              <div className={`text-2xl font-bold ${getStatusColor(currentLevel)}`}>{currentLevel}%</div>
              <Badge variant="outline" className={`mt-2 ${getStatusColor(currentLevel)} border-current`}>
                {getStatusText(currentLevel)}
              </Badge>
            </div>
          </div>

          {/* Tank Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-foreground">{capacity.toLocaleString()}L</div>
                <div className="text-sm text-muted-foreground">Total Capacity</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{currentVolume.toLocaleString()}L</div>
                <div className="text-sm text-muted-foreground">Current Volume</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Water Level</span>
                <span className="font-medium">{currentLevel}%</span>
              </div>
              <Progress value={currentLevel} className="h-3" />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>+12% increase from yesterday</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
