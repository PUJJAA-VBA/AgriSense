import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Graphs from "./pages/analytics";
import Recommendations from "./pages/cropplanner";
import NotFound from "./pages/NotFound";
import Fertilizers from "./pages/Fertilizers";
import Pesticides from "./pages/Pesticides";
// import Scanner from "@/components/Scanner";
import { Toaster } from "sonner";
import { LocationProvider } from "./context/LocationContext";
import { HashRouter } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocationProvider>
    <HashRouter>
    <TooltipProvider>
      <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/scanner" element={<Scanner />} /> */}
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/pesticides" element={<Pesticides/>} />
          <Route path="/fertilizers" element={<Fertilizers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </TooltipProvider>
    </HashRouter>
    </LocationProvider>
  </QueryClientProvider>
);

export default App;
