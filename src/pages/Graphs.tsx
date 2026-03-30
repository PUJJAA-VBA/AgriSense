import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { useWeather } from "@/hooks/useWeather";

export default function Graphs() {
  const { forecast, loading } = useWeather();

  const data = forecast.map((d) => ({
    day: d.day,
    "Max Temp": Math.round(d.temp_max),
    "Min Temp": Math.round(d.temp_min),
    Humidity: d.humidity,
    "Wind Speed": d.wind_speed,
    Rainfall: Number(d.rain.toFixed(1)),
  }));

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-10 w-64" />
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-foreground">📊 Weather Analytics</h1>
          <p className="text-muted-foreground mt-1">7-day visual weather trends for agricultural planning</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temperature Chart */}
          <Card className="bg-card border shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">🌡️ Temperature Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="°C" />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Legend />
                  <Line type="monotone" dataKey="Max Temp" stroke="hsl(var(--chart-orange))" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Min Temp" stroke="hsl(var(--chart-blue))" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Humidity Chart */}
          <Card className="bg-card border shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">💧 Humidity Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="Humidity" stroke="hsl(var(--chart-blue))" fill="hsl(var(--chart-blue) / 0.2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Rainfall Chart */}
          <Card className="bg-card border shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">🌧️ Rainfall Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="mm" />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Bar dataKey="Rainfall" fill="hsl(var(--chart-blue))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Wind Speed Chart */}
          <Card className="bg-card border shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">💨 Wind Speed</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="m/s" />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="Wind Speed" stroke="hsl(var(--chart-green))" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
