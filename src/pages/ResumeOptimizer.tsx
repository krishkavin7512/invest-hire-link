import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Upload, CheckCircle2, AlertCircle, Briefcase } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ResumeOptimizer = () => {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeResume = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setSuggestions([
        "Add keywords: 'React', 'TypeScript', 'Agile' to match job requirements",
        "Quantify your achievements: Replace 'Improved performance' with 'Improved performance by 40%'",
        "Use action verbs: Start bullet points with 'Developed', 'Implemented', 'Led'",
        "ATS optimization: Use standard section headers like 'Experience', 'Education', 'Skills'",
        "Include a skills section with: JavaScript, React, Node.js, AWS",
        "Format tip: Use simple fonts and avoid tables for better ATS parsing",
        "Add relevant certifications or online courses related to the job",
        "Include metrics: 'Managed team of X', 'Reduced costs by Y%'",
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">AI Resume Optimizer</h1>
          <p className="text-muted-foreground">Get AI-powered suggestions to improve your resume and pass ATS systems</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Your Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resume">Paste your resume text</Label>
                  <Textarea
                    id="resume"
                    placeholder="Paste your resume content here..."
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    className="min-h-[300px] mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Job Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="jobDesc">Paste the job description</Label>
                  <Textarea
                    id="jobDesc"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[300px] mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={analyzeResume}
            disabled={!resume || !jobDescription || isAnalyzing}
            className="gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {isAnalyzing ? "Analyzing..." : "Analyze & Optimize"}
          </Button>
        </div>

        {suggestions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>AI Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {suggestions.map((suggestion, i) => (
                  <Alert key={i}>
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <AlertDescription>{suggestion}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-accent/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Tailor your resume for each job application</li>
              <li>Use keywords from the job description naturally</li>
              <li>Keep your resume to 1-2 pages maximum</li>
              <li>Use a clean, ATS-friendly format without images or complex layouts</li>
              <li>Quantify your achievements with numbers and percentages</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeOptimizer;
