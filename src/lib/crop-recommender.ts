// Simulated XGBoost-style crop recommendation engine
// Uses decision tree logic mimicking gradient boosted model predictions

export interface CropRecommendation {
  name: string;
  confidence: number; // 0-100
  season: string;
  idealTemp: string;
  waterNeeds: string;
  growthDuration: string;
  description: string;
  emoji: string;
}

interface WeatherFeatures {
  avgTemp: number;
  humidity: number;
  rainfall: number;
  month: number;
}

function getSeason(month: number): string {
  if (month >= 3 && month <= 5) return "Spring";
  if (month >= 6 && month <= 8) return "Summer";
  if (month >= 9 && month <= 11) return "Autumn";
  return "Winter";
}

const CROPS: CropRecommendation[] = [
  { name: "Rice", confidence: 0, season: "Summer", idealTemp: "20-35°C", waterNeeds: "High", growthDuration: "120-150 days", description: "Thrives in warm, humid conditions with abundant water. Best planted during monsoon season.", emoji: "🌾" },
  { name: "Wheat", confidence: 0, season: "Winter", idealTemp: "10-25°C", waterNeeds: "Medium", growthDuration: "100-120 days", description: "Cool-season crop ideal for well-drained soils. Requires moderate moisture during growth.", emoji: "🌿" },
  { name: "Corn (Maize)", confidence: 0, season: "Summer", idealTemp: "21-30°C", waterNeeds: "Medium-High", growthDuration: "80-110 days", description: "Warm-season crop requiring consistent moisture and full sunlight for optimal yield.", emoji: "🌽" },
  { name: "Soybean", confidence: 0, season: "Summer", idealTemp: "20-30°C", waterNeeds: "Medium", growthDuration: "80-120 days", description: "Nitrogen-fixing legume that improves soil health. Performs well in warm, moist conditions.", emoji: "🫘" },
  { name: "Cotton", confidence: 0, season: "Summer", idealTemp: "25-35°C", waterNeeds: "Medium", growthDuration: "150-180 days", description: "Requires long, warm growing season with dry harvest conditions.", emoji: "☁️" },
  { name: "Potato", confidence: 0, season: "Spring", idealTemp: "15-22°C", waterNeeds: "Medium", growthDuration: "70-120 days", description: "Cool-season tuber that thrives in loose, well-drained soil with moderate temperature.", emoji: "🥔" },
  { name: "Tomato", confidence: 0, season: "Spring/Summer", idealTemp: "18-29°C", waterNeeds: "Medium", growthDuration: "60-90 days", description: "Warm-weather crop needing full sun and consistent watering for best fruit production.", emoji: "🍅" },
  { name: "Barley", confidence: 0, season: "Winter/Spring", idealTemp: "8-20°C", waterNeeds: "Low-Medium", growthDuration: "60-90 days", description: "Hardy cereal crop tolerant of cool conditions. Drought-resistant once established.", emoji: "🌱" },
  { name: "Sugarcane", confidence: 0, season: "Year-round", idealTemp: "25-38°C", waterNeeds: "Very High", growthDuration: "270-365 days", description: "Tropical grass requiring sustained heat, heavy rainfall, and long growing season.", emoji: "🎋" },
  { name: "Mustard", confidence: 0, season: "Winter", idealTemp: "10-20°C", waterNeeds: "Low", growthDuration: "90-120 days", description: "Cool-weather oilseed crop that grows well in dry, cold climates.", emoji: "🌻" },
  { name: "Lentils", confidence: 0, season: "Winter", idealTemp: "10-22°C", waterNeeds: "Low", growthDuration: "80-110 days", description: "Cool-season legume with low water requirements. Enriches soil nitrogen.", emoji: "🟤" },
  { name: "Sunflower", confidence: 0, season: "Spring/Summer", idealTemp: "20-28°C", waterNeeds: "Low-Medium", growthDuration: "70-100 days", description: "Drought-tolerant oilseed crop that thrives in full sun with moderate temperatures.", emoji: "🌻" },
];

// Simulated XGBoost scoring: weighted feature importance
function xgboostScore(crop: CropRecommendation, features: WeatherFeatures): number {
  const season = getSeason(features.month);
  let score = 50; // base

  // Temperature scoring (weight: 0.35)
  const [minT, maxT] = crop.idealTemp.replace("°C", "").split("-").map(Number);
  const midT = (minT + maxT) / 2;
  const tempDiff = Math.abs(features.avgTemp - midT);
  const tempScore = Math.max(0, 100 - tempDiff * 5);
  score += tempScore * 0.35;

  // Season matching (weight: 0.25)
  const cropSeasons = crop.season.split("/");
  const seasonMatch = cropSeasons.some(s => s.trim() === season) || crop.season === "Year-round";
  score += (seasonMatch ? 100 : 15) * 0.25;

  // Humidity/rainfall alignment (weight: 0.20)
  const waterMap: Record<string, number> = { "Low": 25, "Low-Medium": 40, "Medium": 55, "Medium-High": 70, "High": 85, "Very High": 95 };
  const idealHumidity = waterMap[crop.waterNeeds] || 50;
  const humidityDiff = Math.abs(features.humidity - idealHumidity);
  score += Math.max(0, 100 - humidityDiff * 1.5) * 0.20;

  // Rainfall scoring (weight: 0.20)
  const rainfallScore = crop.waterNeeds.includes("High")
    ? Math.min(100, features.rainfall * 8)
    : crop.waterNeeds.includes("Low")
    ? Math.max(0, 100 - features.rainfall * 10)
    : Math.min(100, 50 + features.rainfall * 3);
  score += rainfallScore * 0.20;

  // Add small randomness to simulate model variance
  score += (Math.random() - 0.5) * 5;

  return Math.min(98, Math.max(5, score));
}

export function recommendCrops(
  avgTemp: number,
  humidity: number,
  rainfall: number,
  month: number
): CropRecommendation[] {
  const features: WeatherFeatures = { avgTemp, humidity, rainfall, month };

  const scored = CROPS.map(crop => ({
    ...crop,
    confidence: Math.round(xgboostScore(crop, features)),
  }));

  scored.sort((a, b) => b.confidence - a.confidence);
  return scored;
}

export { getSeason };
