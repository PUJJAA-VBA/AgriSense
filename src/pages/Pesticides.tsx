import { useMemo } from "react";
import { useState } from "react";
import { X } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import heroFarm from "@/assets/hero-farm4.jpg";
import { pesticideData } from "@/data/pesticideData";


export default function Pesticides() {



  const [activeTab, setActiveTab] = useState("info");
  const [showOnlyNames, setShowOnlyNames] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
  const value = input.toLowerCase();
  setHasSearched(true);

  // ✅ NEW: Show all data
  if (["list", "total", "crops", "disease", "diseases"].includes(value)) {
  setResult(pesticideData);
  setShowOnlyNames(true); // 👈 IMPORTANT
  setSuggestions([]);
  return;
}

  const matches = pesticideData.filter(
    (item) =>
      item.disease.toLowerCase().includes(value) ||
      item.symptoms.toLowerCase().includes(value) ||
      item.crops.some((c) => c.toLowerCase().includes(value))
  );

  setResult(matches);
  setSuggestions([]);
};


const getClosestMatch = (value: string) => {
  const keywords = ["list", "total", "crops", "disease", "diseases"];

  if (!value) return null;

  return keywords.find((word) => {
    let matchCount = 0;

    for (let char of value) {
      if (word.includes(char)) matchCount++;
    }

    // ✅ if most letters match → suggest
    return matchCount >= Math.floor(value.length / 2);
  });
};



const randomDiseases = useMemo(() => {
  return [...pesticideData] // ✅ copy array
    .sort(() => 0.5 - Math.random())
    .slice(0, 9);
}, []);

const suggestionWord = getClosestMatch(input);
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



          {/* Input Section */}
          <div className="flex gap-3 relative">
            <div className="relative flex-1">
              <input
                value={input}
                onChange={(e) => {
  const val = e.target.value.toLowerCase();
  setInput(val);
  setHasSearched(false);

  // ✅ HANDLE "list" instantly
  if (["list", "total", "crops", "disease", "diseases"].includes(val)) {
    setResult(pesticideData);
    setSuggestions([]);
    return;
  }

  if (val.length > 0) {
    const matches = pesticideData.filter(
      (item) =>
        item.disease.toLowerCase().includes(val) ||
        item.symptoms.toLowerCase().includes(val) ||
        item.crops.some((c) => c.toLowerCase().includes(val))
    );

    setSuggestions(matches.slice(0, 5));
    setResult(matches);
    setShowOnlyNames(false);
  } else {
    setSuggestions([]);
    setResult([]);
  }
}}
                
                className="w-full p-3 pr-10 rounded-lg bg-white/70 text-foreground text-black"
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

{/* 🔥 Severity Filter */}
<div className="flex gap-2 mt-3">
  {["High", "Medium", "Low"].map((level) => (
    <button
      key={level}
      onClick={() => {
        const matches = pesticideData.filter(
          (item) => item.severity === level
        );

        setResult(matches);
        setShowOnlyNames(false);
        setInput(""); // optional (clears search box)
      }}
      className={`px-3 py-1 rounded-full text-sm text-black ${
        level === "High"
          ? "bg-red-400"
          : level === "Medium"
          ? "bg-yellow-400"
          : "bg-green-400"
      }`}
    >
      {level}
    </button>
  ))}
</div>

          {!input && (
  <p className="text-black text-sm mt-2">
    💡 Type <b>"list"</b>, <b>"total"</b>, <b>"crops"</b>, or <b>"diseases"</b> to view all available items.
  </p>
)}

          {/* Suggestions */}
          {suggestions.length > 0 && (
  <div className="max-h-48 overflow-y-auto mt-2 w-full bg-white/50 backdrop-blur-md border border-white/20 shadow-lg rounded-lg overflow-hidden">
    {suggestions.map((item, i) => (
      <div
        key={i}
        onClick={() => {
          setInput(item.disease);
          setResult([item]);
          setSuggestions([]);
        }}
        className="p-3 cursor-pointer hover:bg-white/30 text-black transition"
      >
        🦠 {item.disease}
      </div>
    ))}
  </div>
)}

          

          {/* Smart suggestion for common typo */}
{/* TYPO SUGGESTION */}
          {input && result.length === 0 && suggestionWord && (
            <div
              className="p-2 bg-yellow-100 rounded cursor-pointer "
              onClick={() => {
                setInput(suggestionWord);
                setResult(pesticideData);
              }}
            >
              🤔 Did you mean <b>{suggestionWord}</b>?
            </div>
          )}

          {result.length > 0 ? (
  <div>

    {showOnlyNames ? (
      // ✅ ONLY NAMES VIEW
      <div className="space-y-2">
        {result.map((item, i) => (
          <div
            key={i}
  

            onClick={() => {
              setResult([item]); // show full details
              setShowOnlyNames(false);
            }}
            className="p-3 bg-white/50 backdrop-blur-md border border-white/20 shadow-lg rounded cursor-pointer hover:bg-green-100 font-semibold"
            // className="p-3 bg-white rounded cursor-pointer hover:bg-green-100 font-semibold"
          >
            🦠 {item.disease}
          </div>
        ))}
      </div>

    ) : (
      // ✅ FULL DETAILS VIEW
      <div className="grid md:grid-cols-2 gap-4">
        {result.map((item, i) => (
          <Card key={i} className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg">
            <CardContent className="p-4 space-y-2">

              <h2 className="font-bold text-lg text-black">
                🦠 {item.disease}
              </h2>

              <p><b>🌾 Crops:</b> {item.crops.join(", ")}</p>
              <p><b>⚠️ Seriousness:</b> {item.severity}</p>
              <p><b>⏰ Stage:</b> {item.timing}</p>
              <p><b>🧬 Symptoms:</b> {item.symptoms}</p>
              <p><b>🧪 Solution:</b> {item.pesticide}</p>
              <p><b>📦 Quantity:</b> {item.amount}</p>

            </CardContent>
          </Card>
        ))}
      </div>
    )}

  </div>
) : input && result.length === 0 && suggestions.length === 0 ? (
  <p className="text-black font-semibold">
    ❌ No data found. Try another crop 🌾
  </p>
) : null}

          {/* Default 9 diseases */}
          {!input && (
            <div>
              <h2 className="text-black text-xl font-bold mb-3">
                🧪 Common Crop Diseases
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                {randomDiseases.map((item, i) => (
  <Card key={i} className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg">
    <CardContent className="p-4 space-y-2">

      {/* 🦠 Disease Name */}
      <h2 className="font-bold text-lg text-black">
        🦠 {item.disease}
      </h2>

      {/* 🌾 Crops */}
      <p><b>🌾 Crops:</b> {item.crops.join(", ")}</p>

      {/* ⚠️ Seriousness */}
      <p><b>⚠️ Seriousness:</b> {item.severity}</p>

      {/* ⏰ Stage */}
      <p><b>⏰ Stage:</b> {item.timing}</p>

      {/* 🧬 Symptoms */}
      <p><b>🧬 Symptoms:</b> {item.symptoms}</p>

      {/* 🧪 Solution */}
      <p><b>🧪 Solution:</b> {item.pesticide}</p>

      {/* 📦 Quantity */}
      <p><b>📦 Quantity:</b> {item.amount}</p>

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