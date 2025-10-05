import { Sparkles, ShieldCheck, Eye, MessageSquare, FolderOpen, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturesGrid = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Matching",
      description: "Smart algorithms connect you with the most relevant opportunities",
      color: "text-accent",
    },
    {
      icon: ShieldCheck,
      title: "Verified Profiles",
      description: "All users undergo verification for security and trust",
      color: "text-primary",
    },
    {
      icon: Eye,
      title: "Transparent Terms",
      description: "Clear information about deals, salaries, and expectations",
      color: "text-secondary",
    },
    {
      icon: MessageSquare,
      title: "Secure Messaging",
      description: "Private, encrypted communication between parties",
      color: "text-accent",
    },
    {
      icon: FolderOpen,
      title: "Data Room Access",
      description: "Secure document sharing for due diligence",
      color: "text-primary",
    },
    {
      icon: BarChart3,
      title: "Success Analytics",
      description: "Track your progress and optimize your approach",
      color: "text-secondary",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to find the perfect match
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
