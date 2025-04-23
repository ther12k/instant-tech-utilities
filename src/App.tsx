
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Base64Page from "./pages/Base64Page";
import JsonPage from "./pages/JsonPage";
import ColorPage from "./pages/ColorPage";
import RegexPage from "./pages/RegexPage";
import HashPage from "./pages/HashPage";
import TokenPage from "./pages/TokenPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/base64" element={<Base64Page />} />
          <Route path="/json" element={<JsonPage />} />
          <Route path="/color" element={<ColorPage />} />
          <Route path="/regex" element={<RegexPage />} />
          <Route path="/hash" element={<HashPage />} />
          <Route path="/token" element={<TokenPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
