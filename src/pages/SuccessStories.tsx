import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Users, Award } from "lucide-react";

const stories = [
  {
    company: "DataFlow AI",
    logo: "D",
    outcome: "Raised $2.5M Seed",
    description: "Connected with lead investor through VentureConnect, closed round in 45 days",
    category: "Funding",
    metrics: ["$2.5M raised", "3 investors", "45 days"],
    tags: ["AI/ML", "Series A"],
  },
  {
    company: "GreenTech Solutions",
    logo: "G",
    outcome: "Hired 5 Engineers",
    description: "Built core engineering team in 60 days using skill-matching algorithm",
    category: "Hiring",
    metrics: ["5 hires", "60 days", "98% retention"],
    tags: ["CleanTech", "Remote"],
  },
  {
    company: "FinFlow",
    logo: "F",
    outcome: "Series A: $10M",
    description: "Scaled from seed to Series A with help from platform mentors and investors",
    category: "Funding",
    metrics: ["$10M raised", "Led by top VC", "3x valuation"],
    tags: ["FinTech", "Series A"],
  },
  {
    company: "HealthConnect",
    logo: "H",
    outcome: "Found Co-Founder",
    description: "Matched with technical co-founder who became CTO, now a $5M company",
    category: "Team Building",
    metrics: ["1 co-founder", "CTO hired", "$5M revenue"],
    tags: ["HealthTech", "Team"],
  },
];

const SuccessStories = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Success Stories</h1>
          <p className="text-muted-foreground">Real outcomes from companies that found success on VentureConnect</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Total Raised
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$500M+</div>
              <p className="text-xs text-secondary">Across 1,000+ startups</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Funded Startups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">10,000+</div>
              <p className="text-xs text-secondary">Successfully raised capital</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Jobs Filled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">50,000+</div>
              <p className="text-xs text-secondary">Successful placements</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Award className="w-4 h-4" />
                Unicorns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-secondary">Started on our platform</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stories.map((story, i) => (
            <Card key={i} className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                      {story.logo}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{story.company}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{story.category}</Badge>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-secondary text-secondary-foreground">
                    {story.outcome}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{story.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  {story.metrics.map((metric, j) => (
                    <div key={j} className="text-center">
                      <p className="text-sm font-semibold">{metric.split(' ')[0]}</p>
                      <p className="text-xs text-muted-foreground">{metric.split(' ').slice(1).join(' ')}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="py-12 text-center space-y-4">
            <h2 className="text-3xl font-bold">Want to be featured?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your success story and inspire others in the VentureConnect community
            </p>
            <button className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-hover transition-colors">
              Submit Your Story
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessStories;
