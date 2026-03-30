// 7cb98fede82fd6e2b308e6ed97a7f887
import { useState } from "react";
import { getApiKey, setApiKey } from "@/lib/weather";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound } from "lucide-react";

export default function ApiKeyModal({ onSaved }: { onSaved: () => void }) {
  const [key, setKey] = useState(getApiKey() || "");

  const handleSave = () => {
    if (key.trim()) {
      setApiKey(key.trim());
      onSaved();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-heading font-bold text-foreground">OpenWeatherMap API Key</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-6">
          Get a free API key from{" "}
          <a href="https://openweathermap.org/api" target="_blank" rel="noopener" className="text-primary underline">
            openweathermap.org
          </a>{" "}
          to enable live weather data.
        </p>
        <Input
          type="password"
          placeholder="Enter your API key..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="mb-4"
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <Button onClick={handleSave} className="w-full bg-gradient-earth text-primary-foreground hover:opacity-90">
          Save & Continue
        </Button>
      </div>
    </div>
  );
}
