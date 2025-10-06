import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, ThumbsUp, Plus, Tag, Calendar } from "lucide-react";

type Question = {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  upvotes: number;
  answers: number;
  timestamp: string;
};

const initialQuestions: Question[] = [
  {
    id: "1",
    title: "How to pitch to seed investors effectively?",
    content: "I'm preparing for my first investor pitch. What are the key elements I should focus on?",
    author: "Sarah Chen",
    tags: ["Fundraising", "Pitch"],
    upvotes: 24,
    answers: 8,
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "What's a good SaaS revenue for Series A?",
    content: "We're growing steadily but want to know if we're ready for Series A fundraising.",
    author: "Mike Johnson",
    tags: ["Series A", "SaaS"],
    upvotes: 18,
    answers: 12,
    timestamp: "5 hours ago",
  },
];

const amaEvents = [
  { speaker: "Jessica Lee", role: "Partner at VC Fund", topic: "Breaking into VC", date: "Jan 20, 2025" },
  { speaker: "David Park", role: "Serial Entrepreneur", topic: "Scaling to $10M ARR", date: "Jan 25, 2025" },
];

const Forum = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: '', body: '', tags: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedQuestions = data?.map((q: any) => ({
        id: q.id,
        title: q.title,
        content: q.body,
        author: q.profiles?.full_name || 'Anonymous',
        tags: q.tags || [],
        upvotes: 0,
        answers: 0,
        timestamp: new Date(q.created_at).toLocaleString(),
      })) || [];
      
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  const handlePostQuestion = async () => {
    if (!user || !newQuestion.title || !newQuestion.body) return;
    setLoading(true);

    try {
      const tags = newQuestion.tags.split(',').map(t => t.trim()).filter(Boolean);
      const { error } = await supabase
        .from('questions')
        .insert({
          user_id: user.id,
          title: newQuestion.title,
          body: newQuestion.body,
          tags,
        });

      if (error) throw error;

      setNewQuestion({ title: '', body: '', tags: '' });
      setIsOpen(false);
      loadQuestions();
    } catch (error: any) {
      console.error('Error posting question:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Community Forum</h1>
            <p className="text-muted-foreground">Ask questions, share knowledge, and learn from experts</p>
          </div>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-4 h-4" />
                Ask Question
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ask a Question</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input 
                  placeholder="Question title..." 
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                />
                <Textarea 
                  placeholder="Provide details..." 
                  className="min-h-[150px]"
                  value={newQuestion.body}
                  onChange={(e) => setNewQuestion({ ...newQuestion, body: e.target.value })}
                />
                <Input 
                  placeholder="Tags (comma separated)"
                  value={newQuestion.tags}
                  onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
                />
                <Button 
                  className="w-full" 
                  onClick={handlePostQuestion}
                  disabled={loading || !user}
                >
                  {loading ? 'Posting...' : 'Post Question'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="ama">AMA Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            {questions.map((q) => (
              <Card key={q.id} className="hover:border-primary transition-colors cursor-pointer">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{q.title}</h3>
                      <p className="text-muted-foreground text-sm">{q.content}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {q.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{q.author}</span>
                        <span>•</span>
                        <span>{q.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm font-medium">{q.upvotes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">{q.answers}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="ama" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming AMA Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {amaEvents.map((event, i) => (
                  <div key={i} className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-lg">{event.speaker}</h3>
                          <p className="text-sm text-muted-foreground">{event.role}</p>
                        </div>
                        <p className="text-sm font-medium">{event.topic}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                      </div>
                      <Button>Join AMA</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Forum;
