import { X } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
// import { Sprout } from "lucide-react";
import heroFarm from "@/assets/hero-farm3.jpg";

export default function Fertilizers() {
  const fertilizerData = [
  { crop: "Rice", category: "Grains", fertilizer: "Urea", amount: "50 kg/acre", timing: "20–25 days", purpose: "Boosts leaf growth" },
  { crop: "Wheat", category: "Grains", fertilizer: "DAP", amount: "40 kg/acre", timing: "Before sowing", purpose: "Root development" },
  { crop: "Maize", category: "Grains", fertilizer: "NPK", amount: "60 kg/acre", timing: "Sowing + 30 days", purpose: "Balanced growth" },

  { crop: "Mango", category: "Fruits", fertilizer: "Organic + NPK", amount: "50 kg/tree", timing: "Before flowering", purpose: "Better fruiting" },
  { crop: "Banana", category: "Fruits", fertilizer: "NPK 19:19:19", amount: "60 kg/acre", timing: "Monthly", purpose: "Fruit development" },
  { crop: "Apple", category: "Fruits", fertilizer: "NPK + Compost", amount: "40 kg/tree", timing: "Spring", purpose: "Improves fruit quality" },

  { crop: "Tomato", category: "Vegetables", fertilizer: "Calcium Nitrate", amount: "25 kg/acre", timing: "Flowering", purpose: "Fruit quality" },
  { crop: "Potato", category: "Vegetables", fertilizer: "Potassium Sulphate", amount: "40 kg/acre", timing: "Tuber stage", purpose: "Tuber size" },

  { crop: "Cotton", category: "Cash Crops", fertilizer: "NPK 17:17:17", amount: "50 kg/acre", timing: "Flowering", purpose: "Boll formation" },
  { crop: "Sugarcane", category: "Cash Crops", fertilizer: "Urea + Potash", amount: "75 kg/acre", timing: "30–45 days", purpose: "Sugar content" },

  { crop: "Tea", category: "Plantation", fertilizer: "Ammonium Sulphate", amount: "35 kg/acre", timing: "Regular", purpose: "Leaf production" },
  { crop: "Coffee", category: "Plantation", fertilizer: "NPK + Compost", amount: "40 kg/acre", timing: "Pre-monsoon", purpose: "Bean yield" },

  { crop: "Barley", category: "Grains", fertilizer: "Urea", amount: "45 kg/acre", timing: "Early stage", purpose: "Improves yield" },
  { crop: "Millet", category: "Grains", fertilizer: "NPK", amount: "35 kg/acre", timing: "At sowing", purpose: "Growth boost" },
  { crop: "Sorghum", category: "Grains", fertilizer: "Urea", amount: "50 kg/acre", timing: "25 days", purpose: "Plant strength" },

  { crop: "Orange", category: "Fruits", fertilizer: "NPK", amount: "45 kg/tree", timing: "Before flowering", purpose: "Fruit quality" },
  { crop: "Papaya", category: "Fruits", fertilizer: "NPK", amount: "40 kg/acre", timing: "Monthly", purpose: "Fruit growth" },
  { crop: "Pineapple", category: "Fruits", fertilizer: "Potash", amount: "30 kg/acre", timing: "Fruit stage", purpose: "Sweetness" },

  { crop: "Onion", category: "Vegetables", fertilizer: "DAP + Urea", amount: "30 kg/acre", timing: "Bulb stage", purpose: "Bulb size" },
  { crop: "Garlic", category: "Vegetables", fertilizer: "NPK", amount: "25 kg/acre", timing: "Early stage", purpose: "Growth" },
  { crop: "Carrot", category: "Vegetables", fertilizer: "Potash", amount: "20 kg/acre", timing: "Root stage", purpose: "Root size" },
  { crop: "Spinach", category: "Vegetables", fertilizer: "Urea", amount: "15 kg/acre", timing: "Early stage", purpose: "Leaf growth" },

  { crop: "Groundnut", category: "Oil Seeds", fertilizer: "Gypsum", amount: "200 kg/acre", timing: "Flowering", purpose: "Pod formation" },
  { crop: "Soybean", category: "Oil Seeds", fertilizer: "Rhizobium", amount: "30 kg/acre", timing: "Before sowing", purpose: "Nitrogen fixation" },
  { crop: "Sunflower", category: "Oil Seeds", fertilizer: "NPK", amount: "40 kg/acre", timing: "Early stage", purpose: "Oil yield" },

  { crop: "Turmeric", category: "Spices", fertilizer: "Organic + NPK", amount: "50 kg/acre", timing: "After sprouting", purpose: "Rhizome growth" },
  { crop: "Ginger", category: "Spices", fertilizer: "Compost", amount: "45 kg/acre", timing: "Early stage", purpose: "Root growth" },
  { crop: "Chili", category: "Spices", fertilizer: "Urea + DAP", amount: "30 kg/acre", timing: "Vegetative", purpose: "Yield boost" },
  { crop: "Peanut", category: "Oil Seeds", fertilizer: "Gypsum", amount: "150 kg/acre", timing: "Flowering", purpose: "Pod filling" },
{ crop: "Mustard", category: "Oil Seeds", fertilizer: "NPK", amount: "35 kg/acre", timing: "Early stage", purpose: "Oil yield" },
{ crop: "Sesame", category: "Oil Seeds", fertilizer: "Urea", amount: "25 kg/acre", timing: "15 days", purpose: "Growth boost" },

{ crop: "Cabbage", category: "Vegetables", fertilizer: "NPK", amount: "40 kg/acre", timing: "Early stage", purpose: "Head formation" },
{ crop: "Cauliflower", category: "Vegetables", fertilizer: "Urea + Potash", amount: "35 kg/acre", timing: "Mid stage", purpose: "Curd quality" },
{ crop: "Brinjal", category: "Vegetables", fertilizer: "DAP", amount: "30 kg/acre", timing: "Before flowering", purpose: "Fruit set" },
{ crop: "Capsicum", category: "Vegetables", fertilizer: "NPK", amount: "28 kg/acre", timing: "Vegetative", purpose: "Yield increase" },
{ crop: "Pumpkin", category: "Vegetables", fertilizer: "Compost", amount: "50 kg/acre", timing: "Early stage", purpose: "Soil fertility" },
{ crop: "Cucumber", category: "Vegetables", fertilizer: "NPK", amount: "30 kg/acre", timing: "Flowering", purpose: "Fruit growth" },

{ crop: "Guava", category: "Fruits", fertilizer: "NPK", amount: "45 kg/tree", timing: "Before flowering", purpose: "Fruit yield" },
{ crop: "Pomegranate", category: "Fruits", fertilizer: "Organic + NPK", amount: "50 kg/tree", timing: "Flowering", purpose: "Fruit quality" },
{ crop: "Watermelon", category: "Fruits", fertilizer: "Potash", amount: "35 kg/acre", timing: "Fruit stage", purpose: "Sweetness" },
{ crop: "Muskmelon", category: "Fruits", fertilizer: "NPK", amount: "30 kg/acre", timing: "Early stage", purpose: "Growth" },
{ crop: "Sapota", category: "Fruits", fertilizer: "Compost", amount: "40 kg/tree", timing: "Yearly", purpose: "Tree health" },

{ crop: "Jute", category: "Cash Crops", fertilizer: "Urea", amount: "50 kg/acre", timing: "20 days", purpose: "Fiber quality" },
{ crop: "Tobacco", category: "Cash Crops", fertilizer: "NPK", amount: "45 kg/acre", timing: "Early stage", purpose: "Leaf quality" },

{ crop: "Rubber", category: "Plantation", fertilizer: "NPK", amount: "60 kg/acre", timing: "Yearly", purpose: "Latex yield" },
{ crop: "Coconut", category: "Plantation", fertilizer: "Urea + Potash", amount: "50 kg/tree", timing: "Twice yearly", purpose: "Nut production" },
{ crop: "Arecanut", category: "Plantation", fertilizer: "NPK", amount: "40 kg/acre", timing: "Pre-monsoon", purpose: "Nut yield" },

{ crop: "Black Pepper", category: "Spices", fertilizer: "Compost", amount: "30 kg/acre", timing: "Early stage", purpose: "Growth" },
{ crop: "Cardamom", category: "Spices", fertilizer: "NPK", amount: "35 kg/acre", timing: "Mid season", purpose: "Yield boost" },
{ crop: "Clove", category: "Spices", fertilizer: "Organic", amount: "25 kg/tree", timing: "Yearly", purpose: "Tree health" },
{ crop: "Coriander", category: "Spices", fertilizer: "Urea", amount: "20 kg/acre", timing: "Early stage", purpose: "Leaf growth" },
{ crop: "Cumin", category: "Spices", fertilizer: "DAP", amount: "25 kg/acre", timing: "Before sowing", purpose: "Root growth" },

{ crop: "Horse Gram", category: "Pulses", fertilizer: "Rhizobium", amount: "20 kg/acre", timing: "Before sowing", purpose: "Nitrogen fixation" },
{ crop: "Green Gram", category: "Pulses", fertilizer: "NPK", amount: "25 kg/acre", timing: "Early stage", purpose: "Yield boost" },
{ crop: "Black Gram", category: "Pulses", fertilizer: "DAP", amount: "30 kg/acre", timing: "Before sowing", purpose: "Root growth" },
{ crop: "Red Gram", category: "Pulses", fertilizer: "Urea", amount: "35 kg/acre", timing: "20 days", purpose: "Plant growth" },

{ crop: "Almond", category: "Fruits", fertilizer: "NPK", amount: "45 kg/tree", timing: "Spring", purpose: "Nut quality" },
{ crop: "Cashew", category: "Plantation", fertilizer: "Organic + NPK", amount: "50 kg/tree", timing: "Before flowering", purpose: "Nut yield" },
{ crop: "Lentil", category: "Pulses", fertilizer: "DAP", amount: "30 kg/acre", timing: "Before sowing", purpose: "Root growth" },
{ crop: "Chickpea", category: "Pulses", fertilizer: "Rhizobium", amount: "25 kg/acre", timing: "Before sowing", purpose: "Nitrogen fixation" },
{ crop: "Pea", category: "Pulses", fertilizer: "NPK", amount: "20 kg/acre", timing: "Early stage", purpose: "Growth" },

{ crop: "Beetroot", category: "Vegetables", fertilizer: "Potash", amount: "25 kg/acre", timing: "Root stage", purpose: "Root size" },
{ crop: "Radish", category: "Vegetables", fertilizer: "Urea", amount: "20 kg/acre", timing: "Early stage", purpose: "Root growth" },
{ crop: "Lettuce", category: "Vegetables", fertilizer: "NPK", amount: "15 kg/acre", timing: "Early stage", purpose: "Leaf growth" },

{ crop: "Strawberry", category: "Fruits", fertilizer: "NPK", amount: "25 kg/acre", timing: "Flowering", purpose: "Fruit quality" },
{ crop: "Blueberry", category: "Fruits", fertilizer: "Organic", amount: "20 kg/acre", timing: "Spring", purpose: "Growth" },
{ crop: "Cherry", category: "Fruits", fertilizer: "NPK", amount: "40 kg/tree", timing: "Before flowering", purpose: "Fruit yield" },

{ crop: "Oats", category: "Grains", fertilizer: "Urea", amount: "40 kg/acre", timing: "Early stage", purpose: "Growth" },
{ crop: "Rye", category: "Grains", fertilizer: "NPK", amount: "35 kg/acre", timing: "Sowing", purpose: "Balanced growth" },

{ crop: "Flax", category: "Oil Seeds", fertilizer: "DAP", amount: "30 kg/acre", timing: "Before sowing", purpose: "Fiber & oil" },
{ crop: "Castor", category: "Oil Seeds", fertilizer: "NPK", amount: "40 kg/acre", timing: "Early stage", purpose: "Oil yield" },

{ crop: "Bamboo", category: "Plantation", fertilizer: "Organic", amount: "50 kg/acre", timing: "Yearly", purpose: "Growth" },
{ crop: "Olive", category: "Plantation", fertilizer: "NPK", amount: "45 kg/tree", timing: "Spring", purpose: "Oil production" },

{ crop: "Vanilla", category: "Spices", fertilizer: "Compost", amount: "30 kg/acre", timing: "Early stage", purpose: "Growth" },
{ crop: "Saffron", category: "Spices", fertilizer: "Organic", amount: "20 kg/acre", timing: "Before planting", purpose: "Flower yield" },

{ crop: "Quinoa", category: "Grains", fertilizer: "NPK", amount: "30 kg/acre", timing: "Early stage", purpose: "Growth" },
{ crop: "Buckwheat", category: "Grains", fertilizer: "Urea", amount: "25 kg/acre", timing: "Early stage", purpose: "Yield" },

{ crop: "Dragon Fruit", category: "Fruits", fertilizer: "Organic + NPK", amount: "35 kg/acre", timing: "Flowering", purpose: "Fruit yield" },
{ crop: "Kiwi", category: "Fruits", fertilizer: "NPK", amount: "40 kg/tree", timing: "Spring", purpose: "Fruit quality" },

{ crop: "Avocado", category: "Fruits", fertilizer: "Organic", amount: "50 kg/tree", timing: "Yearly", purpose: "Tree health" },
{ crop: "Fig", category: "Fruits", fertilizer: "Compost", amount: "30 kg/tree", timing: "Spring", purpose: "Fruit growth" },

{ crop: "Sweet Potato", category: "Vegetables", fertilizer: "Potash", amount: "35 kg/acre", timing: "Tuber stage", purpose: "Tuber growth" },
{ crop: "Turnip", category: "Vegetables", fertilizer: "Urea", amount: "20 kg/acre", timing: "Early stage", purpose: "Root growth" },

{ crop: "Zucchini", category: "Vegetables", fertilizer: "NPK", amount: "30 kg/acre", timing: "Flowering", purpose: "Fruit growth" },
{ crop: "Asparagus", category: "Vegetables", fertilizer: "Compost", amount: "40 kg/acre", timing: "Early stage", purpose: "Growth" },

{ crop: "Hemp", category: "Cash Crops", fertilizer: "NPK", amount: "40 kg/acre", timing: "Early stage", purpose: "Fiber yield" },
{ crop: "Indigo", category: "Cash Crops", fertilizer: "Organic", amount: "30 kg/acre", timing: "Early stage", purpose: "Dye production" }
];

  const [hasSearched, setHasSearched] = useState(false);
  const [showCategoriesOnly, setShowCategoriesOnly] = useState(false);
  const categories = [...new Set(fertilizerData.map(item => item.category))];
  const [cropInput, setCropInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryResults, setCategoryResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSearch = () => {
  const value = cropInput.trim().toLowerCase();
  setSuggestions([]);
  setHasSearched(true); // 👈 important

  if (
    value.includes("cat") ||
    value.includes("categ") ||
    value.includes("category") ||
    value.includes("categories")
  ) {
    setShowCategoriesOnly(true);
    setResult(null);
    setCategoryResults([]);
    return;
  }

  const cropMatch = fertilizerData.find(
    (c) => c.crop.toLowerCase() === value
  );

  if (cropMatch) {
    setResult(cropMatch);
    setCategoryResults([]);
    return;
  }

  const categoryMatch = fertilizerData.filter(
    (c) => c.category.toLowerCase() === value
  );

  if (categoryMatch.length > 0) {
    setCategoryResults(categoryMatch);
    setResult(null);
  } else {
    setResult(null);
    setCategoryResults([]);
  }
};

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

        {/* Title */}
        <div>
          <h1 className="text-black text-3xl font-heading font-extrabold text-foreground">
            🌱 Fertilizer Recommendation
          </h1>
          <p className="text-black text-muted-primary mt-1">
            Smart fertilizer suggestions based on crop and growth stage
          </p>
        </div>





        {/* Input Section */}

        <div className="flex flex-col sm:flex-row gap-3 relative">
  <div className="relative flex-1">
    <input
      type="text"
      placeholder="Enter crop or category (e.g., Rice, Fruits...)"
      value={cropInput}
      onChange={(e) => {
        const value = e.target.value.toLowerCase();
        setShowCategoriesOnly(false);
        setCropInput(value);
        setResult(null);
        setCategoryResults([]);

        if (value.length > 0) {
          const cropMatches = fertilizerData.filter((c) =>
            c.crop.toLowerCase().includes(value)
          );

          const categoryMatches = categories
            .filter((cat) => cat.toLowerCase().includes(value))
            .map((cat) => ({ crop: cat, isCategory: true }));

          if (value.includes("category")) {
            const allCategories = categories.map((cat) => ({
              crop: cat,
              isCategory: true
            }));
            setSuggestions(allCategories);
            return;
          }

          const combined = [...categoryMatches, ...cropMatches].slice(0, 10);
          setSuggestions(combined);
        } else {
          setSuggestions([]);
        }
      }}
      className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg w-full p-3 pr-10 rounded-lg outline-none"
    />

    {/* ❌ Clear button */}
    {cropInput && (
      <button
        onClick={() => {
          setCropInput("");
          setSuggestions([]);
          setResult(null);
          setCategoryResults([]);
          setShowCategoriesOnly(false);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-red-500"
      >
         <X size={20} />
      </button>
    )}
  </div>

  <button
    onClick={handleSearch}
    className="px-5 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
  >
    Search
  </button>
</div>

{cropInput.length === 0 && (
  <p className="text-black text-medium mt-1 text-foreground">
    💡 You can search by <b>crop</b> or <b>category</b> (e.g., Fruits, Grains)
  </p>
)}
        
        

        {suggestions.length > 0 && !result && categoryResults.length === 0 && !showCategoriesOnly && (
            <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-lg mt-2 overflow-hidden">
                {suggestions.map((item) => (
                <div
                    key={item.crop}
                    onClick={() => {
  setSuggestions([]);

  // If it's a category
  if (item.isCategory) {
    const filtered = fertilizerData.filter(
      (c) => c.category === item.crop
    );
    setCategoryResults(filtered);
    setResult(null);
    setCropInput(item.crop);
  } else {
    setCropInput(item.crop);
    setResult(item);
    setCategoryResults([]);
  }
}}
                    className="px-4 py-2 cursor-pointer hover:bg-green-100 transition"
                >
                    {item.isCategory ? "📂 " : "🌾 "} {item.crop}
                </div>
                ))}
            </div>
            )}

        {showCategoriesOnly && (
          <div className="max-h-50 overflow-y-auto mt-2 w-full bg-white/50 backdrop-blur-md border border-white/20 shadow-lg rounded-lg overflow-hidden p-4">
  {/* <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-lg p-4"> */}
      <h2 className="text-lg font-bold mb-2">📂 Available Categories</h2>

    {categories.map((cat) => (
      <div
        key={cat}
        onClick={() => {
          const filtered = fertilizerData.filter(
            (item) => item.category === cat
          );
          setCategoryResults(filtered);
          setShowCategoriesOnly(false);
          setCropInput(cat);
        }}
        className="cursor-pointer px-3 py-2 rounded hover:bg-green-100"
      >
        📂 {cat}
      </div>
    ))}
  </div>
)}

        {/* Result Section */}
        {result ? (
  <Card className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg">
    <CardContent className="p-6 space-y-2">
      <h2 className="text-xl font-bold flex items-center gap-2">
        🌾 {result.crop}
      </h2>

      <p>🧪 <b>Fertilizer:</b> {result.fertilizer}</p>
      <p>📦 <b>Amount:</b> {result.amount}</p>
      <p>⏰ <b>When to Use:</b> {result.timing}</p>
      <p>🌱 <b>Purpose:</b> {result.purpose}</p>
    </CardContent>
  </Card>
) : cropInput &&
    categoryResults.length === 0 &&
    suggestions.length === 0 &&
    !showCategoriesOnly && hasSearched &&
  cropInput &&
  categoryResults.length === 0 &&
  suggestions.length === 0 &&
  !showCategoriesOnly &&
  !result && (
    <p className="text-black font-semibold">
      ❌ No data found. Try another crop 🌾
    </p>
)}


        {categoryResults.length > 0 && (
  <div>
    <h2 className="text-black text-xl font-bold mt-6">
  📂 Showing results for "{cropInput}"
</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {categoryResults.map((item) => (
        <Card key={item.crop} className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-4 space-y-1">
            <h3 className="font-bold text-lg">🌾 {item.crop}</h3>
            <p>🧪 {item.fertilizer}</p>
            <p>📦 {item.amount}</p>
            <p>⏰ {item.timing}</p>
            <p className="text-sm">🌱 {item.purpose}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)}

        {/* All Crops Section */}
        {!result && categoryResults.length === 0 && !showCategoriesOnly && (
        <div>
          <h2 className="text-black text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
            {/* <Sprout className="text-white w-5 h-5 text-primary" /> */}
            🧪 Common Crops Fertilizer Guide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fertilizerData
                .filter((item) => item.crop !== result?.crop)
                .sort(() => 0.5 - Math.random()).slice(0, 9)
                .map((item) => (
              <Card key={item.crop} className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg">
                <CardContent className="p-4 space-y-1">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                  🌾 {item.crop}
                  </h3>

                  <p>🧪 <b>{item.fertilizer}</b></p>
                  <p className="text-sm">📦 {item.amount}</p>
                  <p className="text-sm">⏰ {item.timing}</p>
                  <p className="text-xs text-muted-foreground">🌱 {item.purpose}</p>
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

