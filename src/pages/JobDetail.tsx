import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sidebar } from '@/components/Sidebar';
import { toast } from 'sonner';
import { Calendar, Link as LinkIcon, FileText, Users, TrendingUp, Bell, Paperclip } from 'lucide-react';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    if (id) {
      loadJob();
    }
  }, [id]);

  const loadJob = async () => {
    try {
      const { data, error } = await supabase
        .from('job_apps')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setJob(data);
    } catch (error: any) {
      toast.error('Failed to load job details');
      navigate('/job-tracker');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('job_apps')
        .update({
          ...job,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
      toast.success('Changes saved!');
    } catch (error: any) {
      toast.error('Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-16 p-8">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-16 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
              <p className="text-xl text-muted-foreground">{job.company}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/job-tracker')}>
                Back
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={job.title}
                    onChange={(e) => setJob({ ...job, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={job.company}
                    onChange={(e) => setJob({ ...job, company: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="jd_url">Job Description URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="jd_url"
                      value={job.jd_url || ''}
                      onChange={(e) => setJob({ ...job, jd_url: e.target.value })}
                      placeholder="https://..."
                    />
                    {job.jd_url && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={job.jd_url} target="_blank" rel="noopener noreferrer">
                          <LinkIcon className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={job.status} onValueChange={(value) => setJob({ ...job, status: value })}>
                      <SelectTrigger id="status">
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
                  <div>
                    <Label htmlFor="date_applied">Date Applied</Label>
                    <Input
                      id="date_applied"
                      type="date"
                      value={job.date_applied}
                      onChange={(e) => setJob({ ...job, date_applied: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="resume_version">Resume Version</Label>
                  <Input
                    id="resume_version"
                    value={job.resume_version || ''}
                    onChange={(e) => setJob({ ...job, resume_version: e.target.value })}
                    placeholder="e.g., Tech-2024-v2"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={job.notes || ''}
                    onChange={(e) => setJob({ ...job, notes: e.target.value })}
                    className="min-h-[150px]"
                    placeholder="Add your notes about this application..."
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Chance Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {job.chance_score || 0}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Predicted likelihood of success
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Applied:</strong>{' '}
                      {new Date(job.date_applied).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Last Updated:</strong>{' '}
                      {new Date(job.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">Coming Soon</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Interviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">Coming Soon</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
