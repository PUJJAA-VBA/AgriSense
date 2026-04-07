import { useState, useEffect, useCallback } from "react";
import { fetchCurrentWeather, fetchForecast, getApiKey, type CurrentWeather, type ForecastDay } from "@/lib/weather";

export function useWeather(city?: string) {
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [hasKey, setHasKey] = useState(!!getApiKey());
  const [manualLocation, setManualLocation] = useState(false);
  const checkKey = useCallback(() => setHasKey(!!getApiKey()), []);



  const fetchWeatherByCity = async (city: string) => {
  if (!city.trim()) return;
  setError(null); // ✅ CLEAR OLD ERROR
  setManualLocation(true); // ✅ VERY IMPORTANT
  setLoading(true);

  try {
    const apiKey = getApiKey();

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (!data.coord) {
      setError("City not found");
      return;
    }

    await fetchDataByCoords(data.coord.lat, data.coord.lon);

  } catch {
    setError("Error fetching weather");
  }

  setLoading(false);
};

useEffect(() => {
  if (city) {
    fetchWeatherByCity(city);
  }
}, [city]);

  useEffect(() => {
  // 👉 If user has searched city → DON'T use GPS
  if (city) return;

  navigator.geolocation.getCurrentPosition(
    (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
    () => setCoords({ lat: 28.6139, lon: 77.209 })
  );
}, [city]);

  const fetchDataByCoords = async (lat: number, lon: number) => {
  try {
    const [c, f] = await Promise.all([
      fetchCurrentWeather(lat, lon),
      fetchForecast(lat, lon),
    ]);

    setCurrent(c);
    setForecast(f);
  } catch (e: any) {
    setError(e.message);
  }
};


  const fetchData = useCallback(async () => {
    if (!coords || !getApiKey()) return;
    setLoading(true);
    setError(null);
    try {
      const [c, f] = await Promise.all([
        fetchCurrentWeather(coords.lat, coords.lon),
        fetchForecast(coords.lat, coords.lon),
      ]);
      setCurrent(c);
      setForecast(f);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [coords]);

  useEffect(() => {
  if (manualLocation) return; // 🔥 STOP override
  if (hasKey && coords) fetchData();
}, [hasKey, coords, fetchData, manualLocation]);

  return { current, forecast, loading, error, hasKey, checkKey, refetch: fetchData, fetchWeatherByCity, resetToCurrentLocation: () => {
    setManualLocation(false);
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        fetchDataByCoords(pos.coords.latitude, pos.coords.longitude)
    );
  }, };
}
