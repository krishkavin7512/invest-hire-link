import { Link } from "react-router-dom";
import { Building2, Home, Search, Heart, MessageCircle, Bookmark, User, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    { label: "Profile Views", value: "248", change: "+12%" },
    { label: "Match Rate", value: "78%", change: "+5%" },
    { label: "Response Rate", value: "92%", change: "+3%" },
    { label: "Success Score", value: "8.9", change: "+0.4" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card fixed h-full">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <Building2 className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">VentureConnect</span>
          </Link>

          <nav className="space-y-2">
            <Link to="/dashboard">
              <Button variant="ghost" className="w-full justify-start" size="default">
                <Home className="mr-2 w-4 h-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/discover">
              <Button variant="ghost" className="w-full justify-start" size="default">
                <Search className="mr-2 w-4 h-4" />
                Discover
              </Button>
            </Link>
            <Link to="/matches">
              <Button variant="ghost" className="w-full justify-start" size="default">
                <Heart className="mr-2 w-4 h-4" />
                Matches
                <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">5</span>
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="ghost" className="w-full justify-start" size="default">
                <MessageCircle className="mr-2 w-4 h-4" />
                Messages
                <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">3</span>
              </Button>
            </Link>
            <Link to="/saved">
              <Button variant="ghost" className="w-full justify-start" size="default">
                <Bookmark className="mr-2 w-4 h-4" />
                Saved
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" className="w-full justify-start" size="default">
                <User className="mr-2 w-4 h-4" />
                Profile
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" className="w-full justify-start" size="default">
                <Settings className="mr-2 w-4 h-4" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-8 border border-border">
          <h1 className="text-3xl font-bold mb-2">Welcome back, User!</h1>
          <p className="text-muted-foreground mb-4">Your profile is 85% complete</p>
          <Button variant="default" size="sm">
            Complete Profile
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-secondary">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Matches */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Top Matches Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Matches will appear here once you complete your profile and set your preferences.
            </p>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your activity feed will appear here as you start connecting with others.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
