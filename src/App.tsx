import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FullPhotoGallery from "./pages/FullPhotoGallery";
import Event from "./pages/Event";
import InternalRegistrationForm from "./pages/InternalRegistrationForm";
import ExternalRegistrationForm from "./pages/ExternalRegistrationForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Event />} />
          <Route path="/full-gallery" element={<FullPhotoGallery />} />
          <Route path="/registration/internal" element={<InternalRegistrationForm />} />
          <Route path="/registration/external" element={<ExternalRegistrationForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
