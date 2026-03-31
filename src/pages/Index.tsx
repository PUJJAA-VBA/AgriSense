import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset, Thermometer, MapPin, CloudRain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import ApiKeyModal from "@/components/ApiKeyModal";
import { useWeather } from "@/hooks/useWeather";
import { getWeatherIconUrl } from "@/lib/weather";
import heroFarm from "@/assets/hero-farm.jpg";

export default function Index() {
  const { current, forecast, loading, error, hasKey, checkKey } = useWeather();

  if (!hasKey) {
    return (
      <Layout>
        <div
          className="relative flex items-center justify-center min-h-[60vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${heroFarm})` }}
        >
          {/* <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-background/5 to-transparent" /> */}
          <ApiKeyModal onSaved={checkKey} />
        </div>
      </Layout>
    );
  }

  const formatTime = (ts: number) =>
    new Date(ts * 1000).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" });
  const today = new Date().toLocaleDateString('en-IN', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
  });

//   const getGreeting = () => {
//   const hour = new Date().getHours();

//   if (hour < 12) return "Good Morning🌾";
//   if (hour < 17) return "Good Afternoon🌤️";
//   if (hour < 20) return "Good Evening🌇";
//   return "Good Night🌙";
//   };

// const greeting = getGreeting();

  return (
    <Layout>
      {/* Hero */}
      <div
        className="relative h-48 sm:h-64 bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${heroFarm})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="relative container mx-auto px-4 pb-6">
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground">
            🌾 Weather Dashboard
          </h1>
          <p className="text-lg font-semibold text-foreground mt-1">
            Real-time weather insights for smarter farming
          </p>
          {/* <p className="text-lg font-bold text-foreground/90 mt-1">
            {greeting}
          </p> */}
          {/* text-right */}

          <p className="text-sm font-bold text-foreground/90 mt-1 tracking-wide text-right">
            📅 {today}
          </p>
          
          
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-xl text-sm">
            ⚠️ {error}. Please check your API key.
          </div>
        )}

        {/* Current Weather */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : current ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-card border shadow-md overflow-hidden">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={getWeatherIconUrl(current.icon)}
                      alt={current.description}
                      width={80}
                      height={80}
                    />
                    <div>
                      <div className="text-5xl font-heading font-extrabold text-foreground">
                        {Math.round(current.temp)}°C
                      </div>
                      <p className="text-muted-foreground capitalize text-lg">{current.description}</p>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3 text-sm w-full">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      {current.city}, {current.country}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Thermometer className="w-4 h-4 text-chart-orange" />
                      Feels like {Math.round(current.feels_like)}°C
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Droplets className="w-4 h-4 text-chart-blue" />
                      Humidity {current.humidity}%
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Wind className="w-4 h-4 text-muted-foreground" />
                      Wind {current.wind_speed} m/s
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Sunrise className="w-4 h-4 text-secondary" />
                      Rise {formatTime(current.sunrise)}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Sunset className="w-4 h-4 text-chart-orange" />
                      Set {formatTime(current.sunset)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <Card className="bg-card border shadow-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Gauge className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Pressure</p>
                      <p className="font-heading font-bold text-foreground">{current.pressure} hPa</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card border shadow-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-chart-blue/10">
                      <Eye className="w-5 h-5 text-chart-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Visibility</p>
                      <p className="font-heading font-bold text-foreground">{(current.visibility / 1000).toFixed(1)} km</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">📅 7-Day Forecast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {forecast.map((day) => (
                  <Card key={day.date} className="bg-card border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center space-y-2">
                      <p className="font-heading font-bold text-sm text-foreground">{day.day}</p>
                      <img
                        src={getWeatherIconUrl(day.icon)}
                        alt={day.description}
                        width={48}
                        height={48}
                        loading="lazy"
                        className="mx-auto"
                      />
                      <div className="flex justify-center gap-2 text-sm">
                        <span className="font-bold text-foreground">{Math.round(day.temp_max)}°</span>
                        <span className="text-muted-foreground">{Math.round(day.temp_min)}°</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                        <CloudRain className="w-3 h-3" />
                        {day.rain.toFixed(1)}mm
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </Layout>
  );
}
