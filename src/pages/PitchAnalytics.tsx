import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Eye, Clock, MessageCircle } from "lucide-react";

const slideViewData = [
  { slide: "Slide 1", views: 145 },
  { slide: "Slide 2", views: 132 },
  { slide: "Slide 3", views: 118 },
  { slide: "Slide 4", views: 95 },
  { slide: "Slide 5", views: 78 },
];

const timeSpentData = [
  { slide: "Slide 1", seconds: 45 },
  { slide: "Slide 2", seconds: 62 },
  { slide: "Slide 3", seconds: 58 },
  { slide: "Slide 4", seconds: 71 },
  { slide: "Slide 5", seconds: 54 },
];

const PitchAnalytics = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Pitch Analytics</h1>
          <p className="text-muted-foreground">Track how investors engage with your pitch deck</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,247</div>
              <p className="text-xs text-secondary">+18% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Avg. Time Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4m 38s</div>
              <p className="text-xs text-secondary">+12% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Questions Asked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">34</div>
              <p className="text-xs text-secondary">+5 new this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Views per Slide</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={slideViewData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="slide" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Bar dataKey="views" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Time per Slide</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSpentData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="slide" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Legend />
                  <Line type="monotone" dataKey="seconds" stroke="hsl(var(--accent))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { investor: "Sarah Chen", question: "What's your customer acquisition cost?", time: "2 hours ago" },
                { investor: "Michael Roberts", question: "How do you plan to scale to enterprise?", time: "5 hours ago" },
                { investor: "James Wilson", question: "What's your monthly recurring revenue?", time: "1 day ago" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-start p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{item.investor}</p>
                    <p className="text-sm text-muted-foreground">{item.question}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PitchAnalytics;
