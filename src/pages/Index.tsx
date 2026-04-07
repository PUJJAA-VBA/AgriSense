import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset, Thermometer, MapPin, CloudRain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import ApiKeyModal from "@/components/ApiKeyModal";
import { useWeather } from "@/hooks/useWeather";
import { getWeatherIconUrl } from "@/lib/weather";
import { useState } from "react";
import { useLocation } from "../context/LocationContext";

export default function Index() {
  const { city, setCity } = useLocation();

const {
  current,
  forecast,
  loading,
  error,
  hasKey,
  checkKey,
  fetchWeatherByCity,
  resetToCurrentLocation
} = useWeather(city);

  if (!hasKey) {
    return (
      <Layout
      >
        <div className="flex items-center justify-center min-h-[60vh]">
          <ApiKeyModal onSaved={checkKey} />
        </div>
      </Layout>
    );
  }

  const formatTime = (ts: number) =>
    new Date(ts * 1000).toLocaleTimeString("en", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getIndianTimes = () => {
  const now = new Date();

  const IST = now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  });

  const UTC = now.toLocaleTimeString("en-GB", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  });

  return { IST, UTC };
};

const { IST, UTC } = getIndianTimes();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning 🌾";
    if (hour < 17) return "Good Afternoon 🌤️";
    if (hour < 20) return "Good Evening 🌇";
    return "Good Night 🌙";
  };

  const greeting = getGreeting();

  return (
    <Layout>
      {/* HEADER (NO BACKGROUND HERE) */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <h1 className="text-white/150 text-2xl sm:text-3xl font-heading font-extrabold text-white">
              🌾 Weather Dashboard
            </h1>

            <p className="text-white/150 text-medium text-white/90 mt-1 font-extrabold">
              Real-time weather insights for smarter farming
            </p>

            <p className="text-white/100 text-medium font-medium text-green-200 mt-1 font-extrabold">
              {greeting}
            </p>
          </div>

          <div className="text-right text-white space-y-1 font-extrabold">
  <p className="text-s sm:text-sm font-semibold">
    📅 {today}
  </p>

  <p className="text-s text-white/90 font-bold text-primary font-extrabold">
    🕒 IST: {IST}
  </p>

  {/* <p className="text-s text-white/90 font-bold text-primary">
    🌍 UTC: {UTC}
  </p> */}
</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-xl text-sm">
            ⚠️ {error}. Please check your API key.
          </div>
        )}

      {/* 🔍 SEARCH BY LOCATION */}
<div className="flex gap-2 mt-4">
  <input
    value={city}
onChange={(e) => setCity(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        fetchWeatherByCity(city);
      }
    }}
    placeholder="Enter city name..."
    // className="p-3 rounded-lg bg-white/60 backdrop-blur-md border border-white/20 shadow-lg"
    // focus:outline-none focus:ring-2 focus:ring-black/20 text-black
    className="p-3 rounded-lg w-full bg-white/70 backdrop-blur-md border border-white/20 shadow-lg placeholder:text-black"
  />

<button
  onClick={() => {
    setCity("");
    resetToCurrentLocation(); // ✅ CLEAN RESET
  }}
  className="px-3 bg-gray-500 text-white rounded-lg"
>
  x
</button>
  <button
    onClick={() => {
  if (!city.trim()) return;
  fetchWeatherByCity(city);
}}
    className="px-4 bg-neutral-900/70 backdrop-blur-lg border-b border-white/20 shadow-lg text-white rounded-lg"
  >
    Search
  </button>
</div>
        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : current ? (
          <>
            {/* CURRENT WEATHER */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              <Card className="lg:col-span-2 bg-white/60 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden">
              {/* className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden"> */}
                <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={getWeatherIconUrl(current.icon)}
                      alt={current.description}
                      width={80}
                      height={80}
                    />
                    <div>
                      <div className="text-5xl font-extrabold text-gray-900">
                        {Math.round(current.temp)}°C
                      </div>
                      <p className="text-black capitalize text-lg">
                        {current.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-2 gap-3 text-sm w-full">
                    <div className="flex items-center gap-2 text-black">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      {current.city}, {current.country}
                    </div>

                    <div className="flex items-center gap-2 text-black">
                      <Thermometer className="w-4 h-4 text-orange-500" />
                      Feels like {Math.round(current.feels_like)}°C
                    </div>

                    <div className="flex items-center gap-2 text-black">
                      <Droplets className="w-4 h-4 text-blue-400" />
                      Humidity {current.humidity}%
                    </div>

                    <div className="flex items-center gap-2 text-black">
                      <Wind className="w-4 h-4" />
                      Wind {current.wind_speed} m/s
                    </div>

                    <div className="flex items-center gap-2 text-black">
                      <Sunrise className="w-4 h-4 text-yellow-500" />
                      Rise {formatTime(current.sunrise)}
                    </div>

                    <div className="flex items-center gap-2 text-black">
                      <Sunset className="w-4 h-4 text-orange-400" />
                      Set {formatTime(current.sunset)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SIDE CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <Card className="bg-white/60 backdrop-blur-md border border-white/20 shadow-lg rounded-xl">
                {/* className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md rounded-xl"> */}
                  <CardContent className="p-4 flex items-center gap-3">
                    <Gauge className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-s text-black font-bold">Pressure</p>
                      <p className="font-bold text-gray-900">
                        {current.pressure} hPa
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/60 backdrop-blur-md border border-white/20 shadow-lg rounded-xl">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Eye className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-s text-black font-bold">Visibility</p>
                      <p className="font-bold text-gray-900">
                        {(current.visibility / 1000).toFixed(1)} km
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FORECAST */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">
                📅 7-Day Forecast
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {(forecast || []).map((day) => (
                  <Card
                    key={day.date}
                    className="bg-white/60 backdrop-blur-md border border-white/20 shadow-lg rounded-xl">
                    {/* className="bg-white/80 backdrop-blur-md border border-white/20 shadow-sm" */}
                  
                    <CardContent className="p-4 text-center space-y-2">
                      <p className="font-bold text-sm text-black text-medium">
                        {day.day}
                      </p>

                      <img
                        src={getWeatherIconUrl(day.icon)}
                        alt={day.description}
                        width={48}
                        height={48}
                        className="mx-auto"
                      />

                      <div className="flex justify-center gap-2 text-sm">
                        <span className="font-bold text-gray-900">
                          {Math.round(day.temp_max)}°
                        </span>
                        <span className="text-gray-600">
                          {Math.round(day.temp_min)}°
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-1 text-xs text-gray-700">
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