import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { useWeather } from "@/hooks/useWeather";
import { recommendCrops, getSeason } from "@/lib/crop-recommender";
import { Sprout, Thermometer, Droplets, Calendar, Clock, Zap } from "lucide-react";

export default function Recommendations() {
  const { current, forecast, loading } = useWeather();

  const crops = useMemo(() => {
    if (!current || forecast.length === 0) return [];
    const avgTemp = current.temp;
    const humidity = current.humidity;
    const totalRain = forecast.reduce((sum, d) => sum + d.rain, 0);
    const month = new Date().getMonth() + 1;
    return recommendCrops(avgTemp, humidity, totalRain, month);
  }, [current, forecast]);

  const season = getSeason(new Date().getMonth() + 1);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-10 w-72" />
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-foreground">🌱 Crop Planner</h1>
          <p className="text-muted-foreground mt-1">
            XGBoost-powered recommendations based on your local weather conditions
          </p>
        </div>

        {/* Context Cards */}
        {current && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-card border">
              <CardContent className="p-4 flex items-center gap-3">
                <Thermometer className="w-5 h-5 text-chart-orange" />
                <div>
                  <p className="text-xs text-muted-foreground">Temperature</p>
                  <p className="font-heading font-bold text-foreground">{Math.round(current.temp)}°C</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border">
              <CardContent className="p-4 flex items-center gap-3">
                <Droplets className="w-5 h-5 text-chart-blue" />
                <div>
                  <p className="text-xs text-muted-foreground">Humidity</p>
                  <p className="font-heading font-bold text-foreground">{current.humidity}%</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border">
              <CardContent className="p-4 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Season</p>
                  <p className="font-heading font-bold text-foreground">{season}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border">
              <CardContent className="p-4 flex items-center gap-3">
                <Zap className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-xs text-muted-foreground">Model</p>
                  <p className="font-heading font-bold text-foreground">XGBoost</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
            <Sprout className="w-5 h-5 text-primary" />
            Top Crop Recommendations
          </h2>
          {crops.map((crop, i) => (
            <Card
              key={crop.name}
              className={`bg-card border shadow-sm hover:shadow-md transition-all ${
                i < 3 ? "ring-1 ring-primary/20" : ""
              }`}
            >
              <CardContent className="p-5 flex flex-col sm:flex-row gap-4">
                <div className="text-4xl flex-shrink-0 flex items-start">{crop.emoji}</div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {i < 3 && <span className="text-secondary">#{i + 1} </span>}
                      {crop.name}
                    </h3>
                    <Badge variant={i < 3 ? "default" : "secondary"} className={i < 3 ? "bg-gradient-earth text-primary-foreground" : ""}>
                      {crop.confidence}% match
                    </Badge>
                  </div>
                  <Progress value={crop.confidence} className="h-2" />
                  <p className="text-sm text-muted-foreground">{crop.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {crop.season}
                    </span>
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-3 h-3" /> {crop.idealTemp}
                    </span>
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3 h-3" /> {crop.waterNeeds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {crop.growthDuration}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
