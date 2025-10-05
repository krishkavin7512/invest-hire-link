import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Rocket, Briefcase, Building } from "lucide-react";

const Signup = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  const [selectedType, setSelectedType] = useState(typeParam || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userTypes = [
    { value: "investor", label: "Investor", icon: TrendingUp, description: "Looking for startups to invest in" },
    { value: "startup", label: "Startup", icon: Rocket, description: "Seeking funding for my company" },
    { value: "jobseeker", label: "Job Seeker", icon: Briefcase, description: "Finding my next opportunity" },
    { value: "employer", label: "Employer", icon: Building, description: "Hiring talent for my company" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual signup logic
    console.log("Signup:", { email, password, type: selectedType });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">Join VentureConnect and start your journey</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Choose your account type and get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div className="space-y-3">
                  <Label>I am a...</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {userTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setSelectedType(type.value)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedType === type.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <type.icon className="w-6 h-6 mb-2 text-primary" />
                        <div className="font-semibold">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" variant="default" size="lg" className="w-full" disabled={!selectedType}>
                  Create Account
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Log in
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Signup;
