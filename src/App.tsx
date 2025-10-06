import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PitchAnalytics from "./pages/PitchAnalytics";
import JobMarketTrends from "./pages/JobMarketTrends";
import JobTracker from "./pages/JobTracker";
import ResumeOptimizer from "./pages/ResumeOptimizer";
import SkillGapAnalyzer from "./pages/SkillGapAnalyzer";
import Forum from "./pages/Forum";
import SuccessStories from "./pages/SuccessStories";
import MentorshipMarketplace from "./pages/MentorshipMarketplace";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ventureconnect-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pitch-analytics" element={<PitchAnalytics />} />
            <Route path="/job-trends" element={<JobMarketTrends />} />
            <Route path="/job-tracker" element={<JobTracker />} />
            <Route path="/resume-optimizer" element={<ResumeOptimizer />} />
            <Route path="/skill-gap" element={<SkillGapAnalyzer />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/mentorship" element={<MentorshipMarketplace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
