import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, Users } from "lucide-react";

const skillDemandData = [
  { skill: "React", demand: 4200 },
  { skill: "TypeScript", demand: 3800 },
  { skill: "Python", demand: 3500 },
  { skill: "Node.js", demand: 3200 },
  { skill: "AWS", demand: 2900 },
  { skill: "Docker", demand: 2400 },
];

const salaryTrendsData = [
  { role: "Senior Dev", avg: 145000 },
  { role: "Mid-level Dev", avg: 95000 },
  { role: "Junior Dev", avg: 68000 },
  { role: "Tech Lead", avg: 175000 },
  { role: "DevOps", avg: 125000 },
];

const roleDistributionData = [
  { name: "Engineering", value: 45 },
  { name: "Product", value: 20 },
  { name: "Design", value: 15 },
  { name: "Marketing", value: 12 },
  { name: "Sales", value: 8 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))", "#10B981", "#8B5CF6"];

const JobMarketTrends = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Job Market Trends</h1>
          <p className="text-muted-foreground">Insights into skill demand, salaries, and hiring patterns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">React</div>
              <p className="text-xs text-secondary">+28% demand this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Avg. Salary (Senior)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$145k</div>
              <p className="text-xs text-secondary">+8% from last year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Active Job Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8,542</div>
              <p className="text-xs text-secondary">+215 new this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top In-Demand Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillDemandData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="skill" type="category" className="text-xs" width={80} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Bar dataKey="demand" fill="hsl(var(--accent))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Salaries by Role</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salaryTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="role" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Bar dataKey="avg" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Distribution by Department</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roleDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emerging Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { trend: "AI/ML Engineers", growth: "+45%", description: "Fastest growing role this quarter" },
                  { trend: "Remote-First Positions", growth: "+32%", description: "Companies embracing distributed teams" },
                  { trend: "Full-Stack Developers", growth: "+28%", description: "Demand for versatile engineers" },
                  { trend: "DevSecOps", growth: "+24%", description: "Security-focused development roles" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-start p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{item.trend}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="text-lg font-bold text-secondary">{item.growth}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobMarketTrends;
