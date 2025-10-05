import { Link } from "react-router-dom";
import { TrendingUp, Rocket, Briefcase, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const UserTypeCards = () => {
  const userTypes = [
    {
      icon: TrendingUp,
      title: "For Investors",
      description: "Discover promising startups and investment opportunities",
      type: "investor",
      gradient: "from-primary/10 to-primary/5",
    },
    {
      icon: Rocket,
      title: "For Startups",
      description: "Connect with investors who align with your vision",
      type: "startup",
      gradient: "from-accent/10 to-accent/5",
    },
    {
      icon: Briefcase,
      title: "For Job Seekers",
      description: "Find transparent opportunities at growing companies",
      type: "jobseeker",
      gradient: "from-secondary/10 to-secondary/5",
    },
    {
      icon: Building,
      title: "For Employers",
      description: "Hire top talent with verified profiles and clear expectations",
      type: "employer",
      gradient: "from-primary/10 to-primary/5",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Path</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the community that fits your goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {userTypes.map((type, index) => (
            <Card key={index} className={`border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br ${type.gradient}`}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-background/80 flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-muted-foreground mb-6">{type.description}</p>
                <Link to={`/signup?type=${type.type}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
