import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";
import { pesticideData } from "@/data/pesticideData";

export default function DiseaseScanner() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 MAIN FUNCTION
  const handleDetect = () => {
    if (!image) return;

    setLoading(true);

    // ✅ Fake AI (random result)
    const random =
      pesticideData[Math.floor(Math.random() * pesticideData.length)];

    setTimeout(() => {
      setResult([random]);
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">

        {/* 🔹 Title */}
        <h1 className="text-3xl font-bold text-black">
          📸 Disease Scanner
        </h1>

        {/* 🔹 IMAGE BOX */}
        <div className="w-72 h-72 border-2 border-dashed rounded-xl flex items-center justify-center bg-white/60 backdrop-blur-md shadow-lg">

          {image ? (
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-600">
              <Camera size={40} />
              <p>Scan / Upload</p>
            </div>
          )}

        </div>

        {/* 🔹 FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="bg-white p-2 rounded"
        />

        {/* 🔹 BUTTON */}
        <button
          onClick={handleDetect}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          Detect Disease
        </button>

        {/* 🔹 LOADING */}
        {loading && <p className="text-black">🔍 Detecting...</p>}

        {/* 🔹 RESULT */}
        {result.length > 0 && (
          <Card className="w-full max-w-md bg-white/70 backdrop-blur-md shadow-lg">
            <CardContent className="p-4 space-y-2">

              <h2 className="font-bold text-lg">
                🦠 {result[0].disease}
              </h2>

              <p><b>🌾 Crops:</b> {result[0].crops.join(", ")}</p>
              <p><b>⚠️ Severity:</b> {result[0].severity}</p>
              <p><b>⏰ Stage:</b> {result[0].timing}</p>
              <p><b>🧬 Symptoms:</b> {result[0].symptoms}</p>
              <p><b>🧪 Solution:</b> {result[0].pesticide}</p>
              <p><b>📦 Amount:</b> {result[0].amount}</p>

            </CardContent>
          </Card>
        )}

      </div>
    </Layout>
  );
}