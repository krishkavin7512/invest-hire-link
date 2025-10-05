import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="VentureConnect Hero" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Trusted by 10,000+ companies</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance max-w-5xl mx-auto">
          Where Capital Meets Innovation,{" "}
          <span className="gradient-hero bg-clip-text text-transparent">
            Talent Meets Opportunity
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-balance">
          Connect with verified investors, discover funded startups, and find transparent job opportunities
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/signup?type=startup">
            <Button variant="hero" size="xl" className="w-full sm:w-auto">
              Find Funding
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link to="/signup?type=jobseeker">
            <Button variant="secondary" size="xl" className="w-full sm:w-auto">
              Find Your Next Job
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">10,000+</div>
            <div className="text-sm text-muted-foreground">Funded Startups</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">$500M+</div>
            <div className="text-sm text-muted-foreground">Capital Raised</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">50,000+</div>
            <div className="text-sm text-muted-foreground">Jobs Filled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">1,000+</div>
            <div className="text-sm text-muted-foreground">Verified Investors</div>
          </div>
        </div>
      </div>
    </section>
  );
};
