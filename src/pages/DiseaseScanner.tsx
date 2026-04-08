import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";
import { pesticideData } from "@/data/pesticideData";
import Webcam from "react-webcam";
import heroFarm from "@/assets/hero-farm5.jpg";

export default function DiseaseScanner() {
  const [image, setImage] = useState<File | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef<any>(null);
  const [fileName, setFileName] = useState("");

  const handleClear = () => {
  setImage(null);
  setCapturedImage(null);
  setResult([]);
  setLoading(false);
  setFileName(""); // ✅ reset
};

  const handleDetect = () => {
    if (!image && !capturedImage) return;

    setLoading(true);

    const random =
      pesticideData[Math.floor(Math.random() * pesticideData.length)];

    setTimeout(() => {
      setResult([random]);
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
        <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroFarm})` }}
      >
        <div className="relative inset-0 bg-white/30 backdrop-blur-[2px]" />

       
      <div  className="min-h-screen flex flex-col items-center justify-center px-4 py-10  backdrop-blur-sm border border-black shadow-Medium">
      {/* className="min-h-screen flex flex-col items-center justify-center px-4 py-10"> */}

        {/* 🔹 CARD CONTAINER */}
        <div className="bg-white/50 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6 flex flex-col items-center gap-5 w-full max-w-md">

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-gray-800">
            📸 Disease Scanner
          </h1>

          {/* IMAGE / CAMERA */}
          <div className="w-72 h-72 border-2 border-dashed rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">

            {capturedImage || image ? (
              <img
                src={
                  capturedImage
                    ? capturedImage
                    : URL.createObjectURL(image as File)
                }
                className="w-full h-full object-cover"
              />
            ) : (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* 📸 CAPTURE BUTTON */}
          {!capturedImage && !image && (
            <button
              onClick={() => {
                const img = webcamRef.current.getScreenshot();
                setCapturedImage(img);
                setImage(null);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              📸 Capture
            </button>
          )}

          {/* 📂 UPLOAD (HIDDEN AFTER CAPTURE) */}
          {!capturedImage && !fileName && (
            <input
              key={image ? image.name : "empty"}
              type="file"
              accept="image/*"
              onChange={(e) => {
  const file = e.target.files?.[0];
  setImage(file || null);
  setCapturedImage(null);

  if (file) setFileName(file.name); // ✅ store file name
}}
            
            className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded p-2 flex flex-col items-center "
            //   className="bg-gray-100 p-2 rounded-sm w-full"
            />
          )}
          {fileName && (
  <p className="text-Medium text-gray-900">
    Selected file: {fileName}
  </p>
)}

          {/* 🔘 BUTTON ROW */}
          <div className="flex gap-3 w-full justify-center">

            <button
              onClick={handleDetect}
              disabled={!image && !capturedImage}
              className={`px-4 py-2 rounded-lg text-white ${
                image || capturedImage
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Detect
            </button>

            <button
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Clear
            </button>
          </div>

          {/* 🔄 SCAN AGAIN */}
          {result.length > 0 && (
            <button
              onClick={handleClear}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
            >
              🔄 Scan Another Image
            </button>
          )}

          {/* LOADING */}
          {loading && <p className="text-gray-700">🔍 Detecting...</p>}

        </div>

        {/* RESULT CARD */}
        {result.length > 0 && (
          <Card className="mt-6 w-full max-w-md shadow-lg">
            <CardContent className="p-5 space-y-3">

              <h2 className="font-bold text-lg text-green-700">
                🦠 {result[0].disease}
              </h2>

              <p><b>🌾 Crops:</b> {result[0].crops.join(", ")}</p>
              <p><b>⚠️ Severity:</b> {result[0].severity}</p>
              <p><b>⏰ Stage:</b> {result[0].timing}</p>
              <p><b>🧬 Symptoms:</b> {result[0].symptoms}</p>

              <div className="bg-green-50 p-3 rounded-lg border">
                <p><b>🧪 Solution:</b> {result[0].pesticide}</p>
                <p><b>📦 Amount:</b> {result[0].amount}</p>
              </div>

              <p className="text-xs text-yellow-600">
                ⚠️ AI suggestion only. Verify before use.
              </p>

            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </Layout>
  );
}