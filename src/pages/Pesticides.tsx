import { useState } from "react";
import { X } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import heroFarm from "@/assets/hero-farm4.jpg";

export default function Pesticides() {

  const pesticideData = [
    {
      disease: "Leaf Spot",
      crops: ["Rice", "Wheat", "Maize"],
      symptoms: "Brown spots on leaves",
      severity: "Medium",
      pesticide: "Mancozeb",
      amount: "2 kg/acre",
      timing: "Early stage",
      purpose: "Controls fungal infection"
    },
    {
      disease: "Powdery Mildew",
      crops: ["Tomato", "Cucumber"],
      symptoms: "White powder on leaves",
      severity: "High",
      pesticide: "Sulfur",
      amount: "3 kg/acre",
      timing: "When detected",
      purpose: "Stops fungal spread"
    },
    {
      disease: "Rust",
      crops: ["Wheat", "Barley"],
      symptoms: "Orange pustules",
      severity: "High",
      pesticide: "Propiconazole",
      amount: "1 L/acre",
      timing: "Early infection",
      purpose: "Stops rust spread"
    },
    {
      disease: "Blight",
      crops: ["Potato", "Tomato"],
      symptoms: "Dark lesions",
      severity: "High",
      pesticide: "Chlorothalonil",
      amount: "2 kg/acre",
      timing: "Before spread",
      purpose: "Disease control"
    },
    {
      disease: "Wilt",
      crops: ["Banana", "Tomato"],
      symptoms: "Drooping plants",
      severity: "Medium",
      pesticide: "Carbendazim",
      amount: "1 kg/acre",
      timing: "Soil treatment",
      purpose: "Controls fungus"
    },
    {
      disease: "Root Rot",
      crops: ["Cotton", "Chili"],
      symptoms: "Rotten roots",
      severity: "High",
      pesticide: "Metalaxyl",
      amount: "2 kg/acre",
      timing: "Early stage",
      purpose: "Root protection"
    },
    {
      disease: "Downy Mildew",
      crops: ["Grapes", "Onion"],
      symptoms: "Yellow patches",
      severity: "Medium",
      pesticide: "Ridomil",
      amount: "2 kg/acre",
      timing: "When symptoms appear",
      purpose: "Fungal control"
    },
    {
      disease: "Bacterial Leaf Blight",
      crops: ["Rice"],
      symptoms: "Yellowing leaves",
      severity: "High",
      pesticide: "Streptomycin",
      amount: "500 g/acre",
      timing: "Early stage",
      purpose: "Bacteria control"
    },
    {
      disease: "Anthracnose",
      crops: ["Mango", "Chili"],
      symptoms: "Black spots",
      severity: "Medium",
      pesticide: "Copper Oxychloride",
      amount: "2 kg/acre",
      timing: "Before spread",
      purpose: "Fungal control"
    }
  ];

  const [input, setInput] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const value = input.toLowerCase();
    setHasSearched(true);

    const matches = pesticideData.filter(
      (item) =>
        item.disease.toLowerCase().includes(value) ||
        item.symptoms.toLowerCase().includes(value) ||
        item.crops.some((c) => c.toLowerCase().includes(value))
    );

    setResult(matches);
    setSuggestions([]);
  };

  return (
    <Layout>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroFarm})` }}
      >
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

        <div className="relative container mx-auto px-6 py-8 space-y-8">

          {/* Title */}
          <div>
            <h1 className="text-black text-3xl font-extrabold">
              🦠 Pesticide Recommendation
            </h1>
            <p className="text-black mt-1">
              Detect, understand, and control crop diseases effectively
            </p>
          </div>

          {/* Search */}
          <div className="flex gap-3 relative">
            <div className="relative flex-1">
              <input
                value={input}
                onChange={(e) => {
                  const val = e.target.value.toLowerCase();
                  setInput(val);
                  setResult([]);
                  setHasSearched(false);

                  if (val.length > 0) {
                    const matches = pesticideData.filter(
                      (item) =>
                        item.disease.toLowerCase().includes(val) ||
                        item.crops.some((c) =>
                          c.toLowerCase().includes(val)
                        )
                    );
                    setSuggestions(matches.slice(0, 5));
                  } else {
                    setSuggestions([]);
                  }
                }}
                
                className="w-full p-3 pr-10 rounded-lg bg-white/70 text-primary text-black"
                placeholder="Enter crop / disease / symptoms"
              />

              {input && (
                <button
                  onClick={() => {
                    setInput("");
                    setResult([]);
                    setSuggestions([]);
                    setHasSearched(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-red-500"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <button
              onClick={handleSearch}
              className="px-5 py-3 bg-green-600 text-white rounded-lg"
            >
              Search
            </button>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-white rounded-lg">
              {suggestions.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setInput(item.disease);
                    setResult([item]);
                    setSuggestions([]);
                  }}
                  className="p-2 cursor-pointer hover:bg-green-100"
                >
                  🦠 {item.disease}
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {result.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {result.map((item, i) => (
                <Card key={i} className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg">
                  <CardContent className="p-4 space-y-1">
                    <h2 className="font-bold text-lg">🦠 {item.disease}</h2>
                    <p>🌾 {item.crops.join(", ")}</p>
                    <p>⚠️ {item.severity}</p>
                    <p>🧬 {item.symptoms}</p>
                    <p>🧪 {item.pesticide}</p>
                    <p>📦 {item.amount}</p>
                    <p>⏰ {item.timing}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : hasSearched && input ? (
            <p className="text-black font-semibold">
              ❌ No data found
            </p>
          ) : null}

          {/* Default 9 diseases */}
          {!input && (
            <div>
              <h2 className="text-xl font-bold mb-3">
                🧪 Common Crop Diseases
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                {pesticideData.slice(0, 9).map((item, i) => (
                  <Card key={i} className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg">
                    <CardContent className="p-3">
                      🦠 {item.disease}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}