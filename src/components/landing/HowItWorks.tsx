import { UserPlus, Sparkles, MessageCircle, TrendingUp } from "lucide-react";

export const HowItWorks = () => {
  const investorFlow = [
    {
      icon: UserPlus,
      title: "Create Profile",
      description: "Set up your investor profile with preferences and criteria",
    },
    {
      icon: Sparkles,
      title: "Get Matched",
      description: "AI-powered algorithm matches you with relevant startups",
    },
    {
      icon: MessageCircle,
      title: "Connect",
      description: "Reach out to founders and schedule meetings",
    },
    {
      icon: TrendingUp,
      title: "Invest & Grow",
      description: "Close deals and grow your portfolio",
    },
  ];

  const jobFlow = [
    {
      icon: UserPlus,
      title: "Build Profile",
      description: "Create your professional profile and upload resume",
    },
    {
      icon: Sparkles,
      title: "Match Jobs",
      description: "Get matched with opportunities that fit your skills",
    },
    {
      icon: MessageCircle,
      title: "Connect",
      description: "Message employers and schedule interviews",
    },
    {
      icon: TrendingUp,
      title: "Get Hired",
      description: "Land your dream role and advance your career",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Two powerful pathways to connect, collaborate, and grow
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Investor/Startup Flow */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-center">For Investors & Startups</h3>
            <div className="space-y-6">
              {investorFlow.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Flow */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-center">For Job Seekers & Employers</h3>
            <div className="space-y-6">
              {jobFlow.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
