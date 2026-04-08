import { Link, useLocation } from "react-router-dom";
import { Cloud, BarChart3, Sprout, Home, Camera } from "lucide-react";
import logo from "@/assets/logo.png";
import heroFarm from "@/assets/hero-farm.jpg";
import { FlaskConical } from "lucide-react";
import { Bug } from "lucide-react"; // or use FlaskConical again if you want
// import ChatBot from "@/components/ChatBot";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/graphs", label: "Analytics", icon: BarChart3 },
  { path: "/recommendations", label: "Crop Planner", icon: Sprout },
  { path: "/fertilizers", label: "Fertilizers", icon: FlaskConical },
  { path: "/pesticides", label: "Pesticides", icon: Bug },
  { label: "Scanner", path: "/scanner", icon: Camera },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="relative min-h-screen flex flex-col">

  {/* 🔹 Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
    style={{ backgroundImage: `url(${heroFarm})` }}
  />

  {/* 🔹 Overlay for readability */}
  <div className="absolute inset-0 bg-black/40" />

  {/* 🔹 Content */}
  <div className="relative flex-1 flex-col min-h-screen">
      <header className="bg-neutral-900/70 backdrop-blur-lg border-b border-white/20 shadow-lg  text-center text-sm text-white">
      {/* className="bg-neutral-900/70 backdrop-blur-lg border-b border-white/20 shadow-lg"> */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="WeatherYield" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-heading font-bold text-primary-foreground tracking-tight">
              AgriSense
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === path
                    ? "bg-secondary text-secondary-foreground shadow-sm"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 flex-col min-h-screen">{children}</main>
      {/* <ChatBot /> */}
      <footer className="bg-neutral-900/50 backdrop-blur-lg border-b border-white/20 shadow-lg border-t border-white/20 bg-neutral-900/80 backdrop-blur-md py-4 text-center text-sm text-white">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <Cloud className="w-4 h-4" />
          <span>AgriSense: A Next-Gen Weather-Driven Agricultural Intelligence System</span>
        </div>
      </footer>
    </div>
    </div>
  );
}
