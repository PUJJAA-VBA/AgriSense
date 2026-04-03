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
    },
    {
  disease: "Aphid Attack",
  crops: ["Cotton", "Chili", "Mustard"],
  symptoms: "Sticky leaves, insects on stems",
  severity: "Medium",
  pesticide: "Imidacloprid",
  amount: "0.5 L/acre",
  timing: "Early infestation",
  purpose: "Kills sucking pests"
},
{
  disease: "Stem Borer",
  crops: ["Rice", "Maize"],
  symptoms: "Dead heart in plants",
  severity: "High",
  pesticide: "Chlorpyrifos",
  amount: "1 L/acre",
  timing: "Early stage",
  purpose: "Controls larvae"
},
{
  disease: "Leaf Curl",
  crops: ["Chili", "Tomato"],
  symptoms: "Curled leaves",
  severity: "Medium",
  pesticide: "Thiamethoxam",
  amount: "0.4 g/L",
  timing: "Initial stage",
  purpose: "Virus control"
},
{
  disease: "Fruit Borer",
  crops: ["Tomato", "Brinjal"],
  symptoms: "Holes in fruits",
  severity: "High",
  pesticide: "Spinosad",
  amount: "0.3 ml/L",
  timing: "Fruit stage",
  purpose: "Protects fruits"
},
{
  disease: "Whitefly",
  crops: ["Cotton", "Tomato"],
  symptoms: "White insects under leaves",
  severity: "High",
  pesticide: "Acetamiprid",
  amount: "0.5 g/L",
  timing: "Early stage",
  purpose: "Controls sap sucking pests"
},
{
  disease: "Thrips",
  crops: ["Onion", "Chili"],
  symptoms: "Silvery streaks",
  severity: "Medium",
  pesticide: "Fipronil",
  amount: "1 ml/L",
  timing: "Early stage",
  purpose: "Insect control"
},
{
  disease: "Mealybugs",
  crops: ["Grapes", "Mango"],
  symptoms: "White cotton-like insects",
  severity: "Medium",
  pesticide: "Neem Oil",
  amount: "2 ml/L",
  timing: "Early stage",
  purpose: "Eco pest control"
},
{
  disease: "Scab",
  crops: ["Apple", "Potato"],
  symptoms: "Rough lesions",
  severity: "Medium",
  pesticide: "Captan",
  amount: "2 g/L",
  timing: "Early stage",
  purpose: "Fungal control"
},
{
  disease: "Blast",
  crops: ["Rice"],
  symptoms: "Diamond-shaped spots",
  severity: "High",
  pesticide: "Tricyclazole",
  amount: "0.6 g/L",
  timing: "Tillering stage",
  purpose: "Stops spread"
},
{
  disease: "Smut",
  crops: ["Maize", "Wheat"],
  symptoms: "Black powder spores",
  severity: "Medium",
  pesticide: "Carboxin",
  amount: "2 g/kg seed",
  timing: "Before sowing",
  purpose: "Seed treatment"
},
{
  disease: "Early Blight",
  crops: ["Tomato", "Potato"],
  symptoms: "Target-like spots",
  severity: "Medium",
  pesticide: "Mancozeb",
  amount: "2 g/L",
  timing: "Early stage",
  purpose: "Fungal control"
},
{
  disease: "Late Blight",
  crops: ["Potato", "Tomato"],
  symptoms: "Water-soaked lesions",
  severity: "High",
  pesticide: "Metalaxyl",
  amount: "2 g/L",
  timing: "Humid conditions",
  purpose: "Stops spread"
},
{
  disease: "Gall Midge",
  crops: ["Rice"],
  symptoms: "Silver shoot",
  severity: "High",
  pesticide: "Carbofuran",
  amount: "1 kg/acre",
  timing: "Early stage",
  purpose: "Larvae control"
},
{
  disease: "Red Spider Mite",
  crops: ["Tea", "Cotton"],
  symptoms: "Yellowing leaves",
  severity: "Medium",
  pesticide: "Dicofol",
  amount: "2 ml/L",
  timing: "Dry weather",
  purpose: "Mite control"
},
{
  disease: "Canker",
  crops: ["Citrus"],
  symptoms: "Lesions on stems",
  severity: "High",
  pesticide: "Copper fungicide",
  amount: "3 g/L",
  timing: "Early stage",
  purpose: "Bacterial control"
},
{
  disease: "Leaf Miner",
  crops: ["Tomato", "Beans"],
  symptoms: "Zig-zag lines on leaves",
  severity: "Medium",
  pesticide: "Abamectin",
  amount: "0.5 ml/L",
  timing: "Early stage"
},
{
  disease: "Cutworm",
  crops: ["Corn", "Vegetables"],
  symptoms: "Cut seedlings at base",
  severity: "High",
  pesticide: "Cypermethrin",
  amount: "1 ml/L",
  timing: "Night time control"
},
{
  disease: "Armyworm",
  crops: ["Maize", "Rice"],
  symptoms: "Leaves eaten rapidly",
  severity: "High",
  pesticide: "Chlorantraniliprole",
  amount: "0.4 ml/L",
  timing: "Early infestation"
},
{
  disease: "Termites",
  crops: ["Sugarcane", "Wheat"],
  symptoms: "Hollow stems, plant wilting",
  severity: "High",
  pesticide: "Chlorpyrifos",
  amount: "2 L/acre",
  timing: "Soil treatment"
},
{
  disease: "Yellow Mosaic Virus",
  crops: ["Beans", "Okra"],
  symptoms: "Yellow patches on leaves",
  severity: "High",
  pesticide: "Imidacloprid",
  amount: "0.3 ml/L",
  timing: "Early stage"
},
{
  disease: "Leaf Hopper",
  crops: ["Rice", "Cotton"],
  symptoms: "Yellowing and drying leaves",
  severity: "Medium",
  pesticide: "Buprofezin",
  amount: "1 ml/L",
  timing: "Early stage"
},
{
  disease: "Shoot and Fruit Borer",
  crops: ["Brinjal"],
  symptoms: "Bored shoots and fruits",
  severity: "High",
  pesticide: "Emamectin Benzoate",
  amount: "0.4 g/L",
  timing: "Flowering stage"
},
{
  disease: "Grasshopper Attack",
  crops: ["Millets", "Vegetables"],
  symptoms: "Chewed leaves",
  severity: "Medium",
  pesticide: "Malathion",
  amount: "2 ml/L",
  timing: "Early stage"
},
{
  disease: "Black Rot",
  crops: ["Cabbage"],
  symptoms: "V-shaped yellow lesions",
  severity: "High",
  pesticide: "Copper fungicide",
  amount: "3 g/L",
  timing: "Early stage"
},
{
  disease: "Damping Off",
  crops: ["Seedlings"],
  symptoms: "Seedlings collapse",
  severity: "High",
  pesticide: "Thiram",
  amount: "2 g/kg seed",
  timing: "Before sowing"
},
{
  disease: "Brown Planthopper",
  crops: ["Rice"],
  symptoms: "Yellowing and drying patches, hopper insects",
  severity: "High",
  pesticide: "Imidacloprid",
  amount: "0.3 ml/L",
  timing: "Early infestation",
  purpose: "Controls sap sucking insects"
},
{
  disease: "Sheath Blight",
  crops: ["Rice"],
  symptoms: "Oval lesions on leaf sheath",
  severity: "High",
  pesticide: "Validamycin",
  amount: "2 ml/L",
  timing: "Tillering stage",
  purpose: "Fungal control"
},
{
  disease: "False Smut",
  crops: ["Rice"],
  symptoms: "Green balls on grains",
  severity: "Medium",
  pesticide: "Propiconazole",
  amount: "1 ml/L",
  timing: "Flowering stage",
  purpose: "Prevents grain infection"
},
{
  disease: "Stem Rot",
  crops: ["Rice"],
  symptoms: "Black lesions at stem base",
  severity: "High",
  pesticide: "Carbendazim",
  amount: "1 g/L",
  timing: "Early stage",
  purpose: "Controls fungal infection"
},
{
  disease: "Tungro Virus",
  crops: ["Rice"],
  symptoms: "Yellow-orange leaves, stunted growth",
  severity: "High",
  pesticide: "Imidacloprid",
  amount: "0.5 ml/L",
  timing: "Early stage",
  purpose: "Controls vector insects"
},
{
  disease: "Pink Bollworm",
  crops: ["Cotton"],
  symptoms: "Damaged cotton bolls",
  severity: "High",
  pesticide: "Spinosad",
  amount: "0.3 ml/L",
  timing: "Flowering stage",
  purpose: "Controls larvae"
},
{
  disease: "Alternaria Leaf Spot",
  crops: ["Mustard"],
  symptoms: "Dark concentric rings on leaves",
  severity: "Medium",
  pesticide: "Mancozeb",
  amount: "2 g/L",
  timing: "Early stage",
  purpose: "Fungal control"
},
{
  disease: "Yellow Rust",
  crops: ["Wheat"],
  symptoms: "Yellow stripes on leaves",
  severity: "High",
  pesticide: "Tebuconazole",
  amount: "1 ml/L",
  timing: "Early stage",
  purpose: "Stops fungal spread"
},
{
  disease: "Loose Smut",
  crops: ["Wheat"],
  symptoms: "Black powdery heads",
  severity: "High",
  pesticide: "Carboxin",
  amount: "2 g/kg seed",
  timing: "Before sowing",
  purpose: "Seed treatment"
},
{
  disease: "Pod Borer",
  crops: ["Chickpea", "Pigeon Pea"],
  symptoms: "Holes in pods",
  severity: "High",
  pesticide: "Indoxacarb",
  amount: "1 ml/L",
  timing: "Pod stage",
  purpose: "Controls larvae"
},
{
  disease: "Gram Wilt",
  crops: ["Chickpea"],
  symptoms: "Sudden drying plants",
  severity: "High",
  pesticide: "Carbendazim",
  amount: "1 g/L",
  timing: "Soil treatment",
  purpose: "Fungal control"
},
{
  disease: "Leaf Blotch",
  crops: ["Wheat"],
  symptoms: "Brown irregular spots",
  severity: "Medium",
  pesticide: "Chlorothalonil",
  amount: "2 g/L",
  timing: "Early stage",
  purpose: "Fungal control"
},
{
  disease: "Red Rot",
  crops: ["Sugarcane"],
  symptoms: "Red discoloration inside stem",
  severity: "High",
  pesticide: "Carbendazim",
  amount: "1 g/L",
  timing: "Early stage",
  purpose: "Controls fungus"
},
{
  disease: "Top Rot",
  crops: ["Sugarcane"],
  symptoms: "Rotting top leaves",
  severity: "Medium",
  pesticide: "Metalaxyl",
  amount: "2 g/L",
  timing: "Early stage",
  purpose: "Fungal control"
},
{
  disease: "Sigatoka Leaf Spot",
  crops: ["Banana"],
  symptoms: "Black streaks on leaves",
  severity: "High",
  pesticide: "Propiconazole",
  amount: "1 ml/L",
  timing: "Early stage",
  purpose: "Fungal control"
},
{
  disease: "Panama Wilt",
  crops: ["Banana"],
  symptoms: "Yellowing and wilting",
  severity: "High",
  pesticide: "Carbendazim",
  amount: "2 g/L",
  timing: "Soil treatment",
  purpose: "Controls fungus"
},
{
  disease: "Chilli Dieback",
  crops: ["Chili"],
  symptoms: "Drying branches",
  severity: "High",
  pesticide: "Copper fungicide",
  amount: "3 g/L",
  timing: "Early stage",
  purpose: "Fungal control"
},
{
  disease: "Leaf Curl Virus",
  crops: ["Cotton", "Tomato"],
  symptoms: "Curled leaves",
  severity: "High",
  pesticide: "Thiamethoxam",
  amount: "0.4 g/L",
  timing: "Early stage",
  purpose: "Controls vector insects"
},
{
  disease: "Brinjal Wilt",
  crops: ["Brinjal"],
  symptoms: "Sudden plant wilting",
  severity: "High",
  pesticide: "Carbendazim",
  amount: "1 g/L",
  timing: "Soil treatment",
  purpose: "Fungal control"
},
{
  disease: "Okra Yellow Vein Mosaic",
  crops: ["Okra"],
  symptoms: "Yellow veins on leaves",
  severity: "High",
  pesticide: "Imidacloprid",
  amount: "0.3 ml/L",
  timing: "Early stage",
  purpose: "Controls whiteflies"
},
{
  disease: "Citrus Greening",
  crops: ["Citrus"],
  symptoms: "Yellow shoots, bitter fruits",
  severity: "High",
  pesticide: "Imidacloprid",
  amount: "0.5 ml/L",
  timing: "Early stage",
  purpose: "Controls psyllids"
},
{
  disease: "Tea Mosquito Bug",
  crops: ["Tea"],
  symptoms: "Brown patches on leaves",
  severity: "Medium",
  pesticide: "Quinalphos",
  amount: "2 ml/L",
  timing: "Early stage",
  purpose: "Insect control"
},
{
  disease: "Coffee Berry Borer",
  crops: ["Coffee"],
  symptoms: "Holes in berries",
  severity: "High",
  pesticide: "Chlorpyrifos",
  amount: "1 ml/L",
  timing: "Fruit stage",
  purpose: "Controls beetles"
},
{
  disease: "Mango Hopper",
  crops: ["Mango"],
  symptoms: "Sticky leaves, insects",
  severity: "Medium",
  pesticide: "Imidacloprid",
  amount: "0.3 ml/L",
  timing: "Flowering stage",
  purpose: "Insect control"
},
{
  disease: "Papaya Ring Spot Virus",
  crops: ["Papaya"],
  symptoms: "Ring patterns on fruits",
  severity: "High",
  pesticide: "Neem Oil",
  amount: "3 ml/L",
  timing: "Early stage",
  purpose: "Controls vectors"
},
{
  disease: "Groundnut Leaf Spot",
  crops: ["Groundnut"],
  symptoms: "Brown circular spots",
  severity: "Medium",
  pesticide: "Mancozeb",
  amount: "2 g/L",
  timing: "Early stage",
  purpose: "Fungal control"
},
{
  disease: "Tikka Disease",
  crops: ["Groundnut"],
  symptoms: "Dark leaf spots",
  severity: "High",
  pesticide: "Chlorothalonil",
  amount: "2 g/L",
  timing: "Early stage",
  purpose: "Fungal control"
},
{
  disease: "Sunflower Downy Mildew",
  crops: ["Sunflower"],
  symptoms: "White fungal growth",
  severity: "Medium",
  pesticide: "Metalaxyl",
  amount: "2 g/L",
  timing: "Early stage",
  purpose: "Fungal control"
},
{
  disease: "Soybean Rust",
  crops: ["Soybean"],
  symptoms: "Brown pustules",
  severity: "High",
  pesticide: "Tebuconazole",
  amount: "1 ml/L",
  timing: "Early stage",
  purpose: "Fungal control"
},
{
  disease: "Castor Wilt",
  crops: ["Castor"],
  symptoms: "Wilting plants",
  severity: "High",
  pesticide: "Carbendazim",
  amount: "1 g/L",
  timing: "Soil treatment",
  purpose: "Fungal control"
}
  ];

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
                {pesticideData.sort(() => 0.5 - Math.random()).slice(0, 9).map((item, i) => (
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