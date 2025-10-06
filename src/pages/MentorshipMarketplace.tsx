import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Clock, DollarSign, Video, Search } from "lucide-react";

const mentors = [
  {
    name: "Sarah Chen",
    title: "Ex-Google PM, 2x Founder",
    avatar: "S",
    expertise: ["Product Strategy", "Go-to-Market", "Fundraising"],
    rate: "Free",
    rating: 4.9,
    sessions: 127,
    availability: "Available",
  },
  {
    name: "Michael Torres",
    title: "Engineering Leader at Meta",
    avatar: "M",
    expertise: ["Technical Architecture", "Team Building", "Scaling"],
    rate: "$200/hr",
    rating: 4.8,
    sessions: 89,
    availability: "Available",
  },
  {
    name: "Emily Roberts",
    title: "Partner at Sequoia Capital",
    avatar: "E",
    expertise: ["VC Fundraising", "Pitch Deck", "Due Diligence"],
    rate: "$350/hr",
    rating: 5.0,
    sessions: 64,
    availability: "Limited",
  },
  {
    name: "James Kim",
    title: "Head of Design at Airbnb",
    avatar: "J",
    expertise: ["UI/UX Design", "Design Systems", "User Research"],
    rate: "$150/hr",
    rating: 4.7,
    sessions: 103,
    availability: "Available",
  },
];

const MentorshipMarketplace = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Mentorship Marketplace</h1>
          <p className="text-muted-foreground">Connect with experienced mentors to accelerate your growth</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by expertise, name, or company..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Expertise</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="fundraising">Fundraising</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rates</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentors.map((mentor, i) => (
            <Card key={i} className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-2xl">
                    {mentor.avatar}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{mentor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{mentor.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{mentor.sessions} sessions</span>
                    </div>
                  </div>
                  <Badge variant={mentor.rate === "Free" ? "secondary" : "outline"}>
                    {mentor.rate}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{mentor.availability}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    <span>Video Call</span>
                  </div>
                  {mentor.rate !== "Free" && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>Hourly Rate</span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1">View Profile</Button>
                  <Button className="flex-1">Book Session</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-accent/10 to-primary/10">
          <CardContent className="py-12 text-center space-y-4">
            <h2 className="text-3xl font-bold">Become a Mentor</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your expertise, help others grow, and build your personal brand
            </p>
            <Button size="lg" className="mt-4">
              Apply as Mentor
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentorshipMarketplace;
