import { Header } from "@/components/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { UserTypeCards } from "@/components/landing/UserTypeCards";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturesGrid />
        <UserTypeCards />
      </main>
      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 VentureConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
