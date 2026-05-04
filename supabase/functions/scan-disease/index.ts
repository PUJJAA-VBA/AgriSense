// AIzaSyBNO3GURucb-DQ4MpFgT_q1KHTKQ0zCNHg
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { imageBase64, mimeType } = await req.json();

    // ✅ STEP 1: Get API Key
    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
  throw new Error("GEMINI API KEY NOT SET");
}

    console.log("API KEY:", apiKey);

    // ✅ STEP 2: Call Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxa2piemVycWR3dG50dGlkemlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczODM0NjcsImV4cCI6MjA5Mjk1OTQ2N30.6W6qOpAeu-8vH8AYAJyvPmzjz-w1F5LlsX42rBrldoE",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxa2piemVycWR3dG50dGlkemlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczODM0NjcsImV4cCI6MjA5Mjk1OTQ2N30.6W6qOpAeu-8vH8AYAJyvPmzjz-w1F5LlsX42rBrldoE"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Analyze this crop image.

IMPORTANT:
- Return ONLY valid JSON
- Do NOT add explanation
- Do NOT add markdown

Format:
{
  "crop": "",
  "healthy": true,
  "disease": "",
  "confidence": "Low",
  "severity": "Mild",
  "symptoms": [],
  "causes": [],
  "treatment": {
    "pesticide": "",
    "dosage": "",
    "application": "",
    "organic_alternative": ""
  },
  "prevention": []
}
                  `,
                },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: imageBase64,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const result = await response.json();

    if (result.error) {
  console.error("Gemini API Error:", result.error);
  throw new Error(result.error.message || "Gemini API failed");
}

if (!result.candidates || result.candidates.length === 0) {
  console.error("No candidates:", result);
  throw new Error("No response from AI");
}

    console.log("FULL RESULT:", JSON.stringify(result, null, 2));

    // ✅ STEP 3: Extract AI text
    const parts = result.candidates?.[0]?.content?.parts;

let text = "";

if (parts && parts.length > 0) {
  for (const part of parts) {
    if (part.text) {
      text += part.text;
    }
  }
}

console.log("AI RAW:", text);

    console.log("AI RAW:", text);

    // ✅ STEP 4: Convert text → JSON
    if (!text || text.trim() === "") {
  console.error("FULL RESULT:", JSON.stringify(result, null, 2));
  throw new Error("AI returned empty response");
}

// Clean markdown (very common issue)
const cleanedText = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let diagnosis;

try {
  diagnosis = JSON.parse(cleanedText);
} catch (e) {
  console.error("Invalid JSON from AI:", cleanedText);
  throw new Error("AI returned invalid JSON format");
}

    // ✅ STEP 5: Return to frontend
    return new Response(
      JSON.stringify({ diagnosis }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (err: any) {
    console.error(err);

    return new Response(
      JSON.stringify({ error: err.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});