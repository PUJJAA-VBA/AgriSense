import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Graphs from "./pages/Graphs";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";
import Fertilizers from "./pages/Fertilizers";
import Pesticides from "./pages/Pesticides";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/pesticides" element={<Pesticides/>} />
          <Route path="/fertilizers" element={<Fertilizers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
