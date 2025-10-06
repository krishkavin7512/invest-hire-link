import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import HowItWorks from "./pages/HowItWorks";
import Settings from "./pages/Settings";
import QA from "./pages/QA";
import JobDetail from "./pages/JobDetail";
import Premium from "./pages/Premium";
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
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/qa" element={<QA />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/pitch-analytics" element={<PitchAnalytics />} />
              <Route path="/job-trends" element={<JobMarketTrends />} />
              <Route path="/job-tracker" element={<JobTracker />} />
              <Route path="/job-detail/:id" element={<JobDetail />} />
              <Route path="/resume-optimizer" element={<ResumeOptimizer />} />
              <Route path="/skill-gap" element={<SkillGapAnalyzer />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/mentorship" element={<MentorshipMarketplace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
