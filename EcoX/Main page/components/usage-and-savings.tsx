"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis } from "recharts"
import { ShowerHeadIcon as Shower, Sprout, FlaskRoundIcon as Flask, Leaf, Lightbulb, TreePine } from "lucide-react"

export function UsageAndSavings() {
  const usageData = [
    { category: "Washrooms", usage: 1200, icon: Shower, color: "chart-1" },
    { category: "Gardening", usage: 800, icon: Sprout, color: "chart-2" },
    { category: "Labs", usage: 400, icon: Flask, color: "chart-3" },
  ]

  const weeklyData = [
    { day: "Mon", washrooms: 180, gardening: 120, labs: 60 },
    { day: "Tue", washrooms: 170, gardening: 110, labs: 55 },
    { day: "Wed", washrooms: 190, gardening: 130, labs: 65 },
    { day: "Thu", washrooms: 175, gardening: 115, labs: 58 },
    { day: "Fri", washrooms: 185, gardening: 125, labs: 62 },
    { day: "Sat", washrooms: 160, gardening: 100, labs: 50 },
    { day: "Sun", washrooms: 140, gardening: 90, labs: 45 },
  ]

  const totalSaved = 2400 // liters this month
  const treesEquivalent = Math.floor(totalSaved / 100) // rough calculation
  const energySaved = Math.floor(totalSaved * 0.003) // kWh equivalent

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Usage Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Water Usage Analytics</CardTitle>
          <p className="text-sm text-muted-foreground">Daily water consumption by category this week</p>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              washrooms: { label: "Washrooms", color: "hsl(var(--chart-1))" },
              gardening: { label: "Gardening", color: "hsl(var(--chart-2))" },
              labs: { label: "Labs", color: "hsl(var(--chart-3))" },
            }}
            className="h-[300px]"
          >
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="washrooms" fill="hsl(var(--chart-1))" />
              <Bar dataKey="gardening" fill="hsl(var(--chart-2))" />
              <Bar dataKey="labs" fill="hsl(var(--chart-3))" />
            </BarChart>
          </ChartContainer>

          {/* Usage Categories */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {usageData.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.category} className="text-center p-3 bg-muted rounded-lg">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold">{item.usage}L</div>
                  <div className="text-sm text-muted-foreground">{item.category}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Impact & Savings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-chart-4" />
            Environmental Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Impact Card */}
          <div className="text-center p-4 bg-gradient-to-br from-chart-4/10 to-chart-4/5 rounded-lg border border-chart-4/20">
            <div className="text-3xl font-bold text-chart-4 mb-2">{totalSaved.toLocaleString()}L</div>
            <div className="text-sm text-muted-foreground">Groundwater saved this month</div>
            <Badge variant="outline" className="mt-2 border-chart-4 text-chart-4">
              +15% vs last month
            </Badge>
          </div>

          {/* Equivalent Savings */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <TreePine className="h-8 w-8 text-chart-4" />
              <div>
                <div className="font-bold text-chart-4">{treesEquivalent} Trees</div>
                <div className="text-xs text-muted-foreground">Environmental equivalent</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Lightbulb className="h-8 w-8 text-chart-3" />
              <div>
                <div className="font-bold text-chart-3">{energySaved} kWh</div>
                <div className="text-xs text-muted-foreground">Energy saved</div>
              </div>
            </div>
          </div>

          {/* Monthly Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Monthly Goal</span>
              <span className="font-medium">80%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-chart-4 h-2 rounded-full" style={{ width: "80%" }}></div>
            </div>
            <div className="text-xs text-muted-foreground">3,000L target • 600L remaining</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
