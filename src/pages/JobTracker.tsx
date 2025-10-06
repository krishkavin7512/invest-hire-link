import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Briefcase } from "lucide-react";

type JobApplication = {
  id: string;
  title: string;
  company: string;
  status: "applied" | "interviewing" | "offer" | "rejected";
  appliedDate: string;
};

const initialApplications: JobApplication[] = [
  { id: "1", title: "Senior Frontend Developer", company: "TechCorp", status: "interviewing", appliedDate: "2025-01-05" },
  { id: "2", title: "Full Stack Engineer", company: "StartupXYZ", status: "applied", appliedDate: "2025-01-10" },
  { id: "3", title: "React Developer", company: "Innovation Labs", status: "offer", appliedDate: "2024-12-28" },
];

const JobTracker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newJob, setNewJob] = useState({ title: "", company: "", status: "applied" as const });

  useEffect(() => {
    if (user) loadApplications();
  }, [user]);

  const loadApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_apps')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setApplications(data?.map((d: any) => ({
        id: d.id,
        title: d.title,
        company: d.company,
        status: d.status,
        appliedDate: d.date_applied,
      })) || []);
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  };

  const addApplication = async () => {
    if (!newJob.title || !newJob.company || !user) return;
    
    try {
      const { error } = await supabase.from('job_apps').insert({
        user_id: user.id,
        title: newJob.title,
        company: newJob.company,
        status: newJob.status,
      });
      
      if (error) throw error;
      
      toast.success('Application added!');
      setNewJob({ title: "", company: "", status: "applied" });
      setIsOpen(false);
      loadApplications();
    } catch (error: any) {
      toast.error('Failed to add application');
    }
  };

  const groupedApplications = {
    applied: applications.filter(app => app.status === "applied"),
    interviewing: applications.filter(app => app.status === "interviewing"),
    offer: applications.filter(app => app.status === "offer"),
    rejected: applications.filter(app => app.status === "rejected"),
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-16 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Job Application Tracker</h1>
            <p className="text-muted-foreground">Track your job applications in one place</p>
          </div>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Application
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Application</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="e.g., Senior Developer"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newJob.company}
                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                    placeholder="e.g., TechCorp"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newJob.status} onValueChange={(value: any) => setNewJob({ ...newJob, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="interviewing">Interviewing</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addApplication} className="w-full">
                  Add Application
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(groupedApplications).map(([status, apps]) => (
            <Card key={status} className="min-h-[400px]">
              <CardHeader>
                <CardTitle className="capitalize flex items-center justify-between">
                  {status}
                  <span className="text-sm font-normal bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                    {apps.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                   {apps.map((app) => (
                    <div 
                      key={app.id} 
                      className="p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer"
                      onClick={() => navigate(`/job-detail/${app.id}`)}
                    >
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{app.title}</h3>
                          <p className="text-sm text-muted-foreground truncate">{app.company}</p>
                          <p className="text-xs text-muted-foreground mt-2">{app.appliedDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JobTracker;
