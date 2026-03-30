import { Link, useLocation } from "react-router-dom";
import { Cloud, BarChart3, Sprout, Home } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/graphs", label: "Analytics", icon: BarChart3 },
  { path: "/recommendations", label: "Crop Planner", icon: Sprout },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-gradient-earth shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="WeatherYield" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-heading font-bold text-primary-foreground tracking-tight">
              WeatherYield
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
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-card py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <Cloud className="w-4 h-4" />
          <span>WeatherYield — Smart Farming with XGBoost-powered Insights</span>
        </div>
      </footer>
    </div>
  );
}
