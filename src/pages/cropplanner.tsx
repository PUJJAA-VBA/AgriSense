import { useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { useWeather } from "@/hooks/useWeather";
import { recommendCrops, getSeason } from "@/lib/crop-recommender";
import { Sprout, Thermometer, Droplets, Calendar, Clock, Zap } from "lucide-react";
import heroFarm from "@/assets/hero-farm2.jpg";

import { useLocation } from "../context/LocationContext";





  export default function Recommendations() {
  const { city } = useLocation();

  const { current, forecast, loading } = useWeather(city);
//   useEffect(() => {
//   if (city) {
//     fetchWeatherByCity(city);
//   }
// }, [city]); // 🔥 run only once
  

  const crops = useMemo(() => {
    if (!current || forecast.length === 0) return [];
    const avgTemp = current.temp;
    const humidity = current.humidity;
    const totalRain = forecast.reduce((sum, d) => sum + d.rain, 0);
    const month = new Date().getMonth() + 1;
    return recommendCrops(avgTemp, humidity, totalRain, month);
  }, [current, forecast]);

  const topCrops = crops.slice(0, 3);
  const otherCrops = crops.slice(3);

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
    <div
  className="relative min-h-screen bg-cover bg-center"
  style={{ backgroundImage: `url(${heroFarm})` }}
>
  {/* Overlay (LIGHT blur + gradient) */}
  <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

  {/* CONTENT */}
  <div className="relative container mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-foreground">🌱 Crop Planner</h1>
          <p className="text-black/150 text-muted-primary mt-1">
            XGBoost-powered recommendations based on your local weather conditions
          </p>
        </div>

        {/* Context Cards */}
        {current && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <Thermometer className="w-5 h-5 text-chart-orange" />
                <div>
                  <p className="text-xs text-muted-primary">Temperature</p>
                  <p className="font-heading font-bold text-foreground">{Math.round(current.temp)}°C</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <Droplets className="w-5 h-5 text-chart-blue" />
                <div>
                  <p className="text-xs text-muted-primary">Humidity</p>
                  <p className="font-heading font-bold text-foreground">{current.humidity}%</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-primary">Season</p>
                  <p className="font-heading font-bold text-foreground">{season}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <Zap className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-xs text-muted-primary">Model</p>
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
          {/* 🔹 TOP 3 CROPS (HORIZONTAL) */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {topCrops.map((crop, i) => (
    <Card
      key={crop.name}
      className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg ring-1 ring-primary/30"
    >
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="text-4xl">{crop.emoji}</div>

        <h3 className="font-heading font-bold text-lg text-gray-900">
          <span className="text-green-600">#{i + 1} </span>
          {crop.name}
        </h3>

        <Badge className="bg-green-600 text-white w-fit">
          {crop.confidence}% match
        </Badge>

        <Progress value={crop.confidence} className="h-2" />

        <p className="text-sm text-gray-700">{crop.description}</p>
      </CardContent>
    </Card>
  ))}
</div>

{/* 🔹 OTHER CROPS (VERTICAL - SAME AS BEFORE) */}
<div className="space-y-4 mt-4">
  {otherCrops.map((crop, i) => (
    <Card
      key={crop.name}
      className="bg-white/50 backdrop-blur-md border border-white/20 shadow-sm hover:shadow-md transition-all"
    >
      <CardContent className="p-5 flex flex-col sm:flex-row gap-4">
        <div className="text-4xl flex-shrink-0">{crop.emoji}</div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-heading font-bold text-lg text-gray-900">
              {crop.name}
            </h3>

            <Badge variant="secondary">
              {crop.confidence}% match
            </Badge>
          </div>

          <Progress value={crop.confidence} className="h-2" />

          <p className="text-sm text-gray-700">{crop.description}</p>

          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
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
      </div>
    </div>
    </Layout>
  );
}


