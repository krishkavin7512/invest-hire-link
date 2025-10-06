import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Plus, X } from "lucide-react";

const SkillGapAnalyzer = () => {
  const [currentSkills, setCurrentSkills] = useState<string[]>(["JavaScript", "React", "CSS"]);
  const [targetRole, setTargetRole] = useState("Senior Full-Stack Developer");
  const [newSkill, setNewSkill] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const requiredSkills = [
    { skill: "JavaScript", level: 100, has: true },
    { skill: "TypeScript", level: 90, has: false },
    { skill: "React", level: 100, has: true },
    { skill: "Node.js", level: 80, has: false },
    { skill: "PostgreSQL", level: 70, has: false },
    { skill: "Docker", level: 60, has: false },
    { skill: "AWS", level: 65, has: false },
    { skill: "CSS", level: 100, has: true },
  ];

  const addSkill = () => {
    if (newSkill && !currentSkills.includes(newSkill)) {
      setCurrentSkills([...currentSkills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setCurrentSkills(currentSkills.filter(s => s !== skill));
  };

  const matchPercentage = (currentSkills.length / requiredSkills.length) * 100;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Skill Gap Analyzer</h1>
          <p className="text-muted-foreground">Identify missing skills to improve your job match rate</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Your Current Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {currentSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-2 px-3 py-1.5">
                      {skill}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Target Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="role">What role are you targeting?</Label>
                  <Input
                    id="role"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g., Senior Full-Stack Developer"
                    className="mt-2"
                  />
                </div>
                
                <Button onClick={() => setAnalyzed(true)} className="w-full" size="lg">
                  Analyze Skill Gap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {analyzed && (
          <>
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold">Your Match Score</h3>
                  <div className="text-6xl font-bold text-primary">{Math.round(matchPercentage)}%</div>
                  <p className="text-muted-foreground">
                    You have {currentSkills.length} out of {requiredSkills.length} required skills
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Skills for {targetRole}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requiredSkills.map((item) => (
                    <div key={item.skill} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.skill}</span>
                          {item.has ? (
                            <Badge variant="default" className="bg-secondary">You have this</Badge>
                          ) : (
                            <Badge variant="outline" className="text-destructive border-destructive">Missing</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">Importance: {item.level}%</span>
                      </div>
                      <Progress value={item.has ? 100 : 0} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Learning Path</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {requiredSkills
                    .filter(s => !s.has)
                    .sort((a, b) => b.level - a.level)
                    .slice(0, 4)
                    .map((skill, i) => (
                      <div key={skill.skill} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary">#{i + 1}</span>
                              <h4 className="font-semibold">{skill.skill}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              High priority skill for this role
                            </p>
                          </div>
                          <Button variant="outline" size="sm">Learn</Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;
