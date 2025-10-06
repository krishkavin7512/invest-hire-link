import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TrendingUp, Rocket, Briefcase, Building, UserCheck, Search, MessageCircle, Handshake } from "lucide-react";

const HowItWorks = () => {
  const investorStartupFlow = [
    { icon: UserCheck, title: "Sign Up", description: "Create your profile as an investor or startup founder" },
    { icon: Search, title: "Get Matched", description: "Our AI algorithm matches you based on preferences and criteria" },
    { icon: MessageCircle, title: "Connect", description: "Exchange messages and schedule meetings" },
    { icon: Handshake, title: "Close the Deal", description: "Complete due diligence and finalize investment terms" },
  ];

  const jobSeekerFlow = [
    { icon: Briefcase, title: "Build Profile", description: "Upload your resume and set job preferences" },
    { icon: Search, title: "Discover Jobs", description: "Browse matched job opportunities from verified companies" },
    { icon: MessageCircle, title: "Apply & Interview", description: "Apply with one click and communicate with employers" },
    { icon: Handshake, title: "Get Hired", description: "Accept offers and start your new career" },
  ];

  const mentorFlow = [
    { icon: UserCheck, title: "List Expertise", description: "Create your mentor profile with your skills and availability" },
    { icon: Search, title: "Get Discovered", description: "Users find you based on their needs" },
    { icon: MessageCircle, title: "Book Sessions", description: "Schedule and conduct mentorship sessions" },
    { icon: Handshake, title: "Build Reputation", description: "Earn reviews and grow your mentor profile" },
  ];

  const faqs = [
    {
      q: "Is VentureConnect free to use?",
      a: "We offer a free tier with basic features. Premium users get faster matching, direct messaging, and advanced analytics."
    },
    {
      q: "How does the matching algorithm work?",
      a: "Our AI analyzes your profile, preferences, and behavior to find the most relevant matches based on industry, stage, location, and other factors."
    },
    {
      q: "Are profiles verified?",
      a: "Yes, we verify all investor and employer profiles to ensure legitimacy and build trust in the platform."
    },
    {
      q: "Can I use VentureConnect as both an investor and job seeker?",
      a: "Absolutely! You can have multiple roles on the platform and switch between them as needed."
    },
    {
      q: "How is my data protected?",
      a: "We use industry-standard encryption and never share your data without your explicit permission."
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">How VentureConnect Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three powerful ecosystems in one platform: Fundraising, Hiring, and Mentorship
          </p>
        </div>

        {/* Investor & Startup Flow */}
        <section className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">For Investors & Startups</h2>
            <Rocket className="w-8 h-8 text-secondary" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {investorStartupFlow.map((step, i) => (
              <Card key={i} className="relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {i + 1}
                </div>
                <CardHeader>
                  <step.icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Job Seeker & Employer Flow */}
        <section className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Briefcase className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">For Job Seekers & Employers</h2>
            <Building className="w-8 h-8 text-secondary" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {jobSeekerFlow.map((step, i) => (
              <Card key={i} className="relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-lg">
                  {i + 1}
                </div>
                <CardHeader>
                  <step.icon className="w-12 h-12 text-secondary mb-4" />
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mentorship Flow */}
        <section className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <UserCheck className="w-8 h-8 text-accent" />
            <h2 className="text-3xl font-bold">For Mentors & Mentees</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {mentorFlow.map((step, i) => (
              <Card key={i} className="relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
                  {i + 1}
                </div>
                <CardHeader>
                  <step.icon className="w-12 h-12 text-accent mb-4" />
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  );
};

export default HowItWorks;
