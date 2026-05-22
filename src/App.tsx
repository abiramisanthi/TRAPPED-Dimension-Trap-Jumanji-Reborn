import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TeamPage from "./pages/TeamPage";
import DimensionsPage from "./pages/DimensionsPage";
import DimensionPlayPage from "./pages/DimensionPlayPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import StorePage from "./pages/StorePage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/dimensions" element={<DimensionsPage />} />
          <Route path="/play/:dimensionId" element={<DimensionPlayPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
