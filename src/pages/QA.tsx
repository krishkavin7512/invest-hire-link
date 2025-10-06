import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ThumbsUp, MessageCircle, Tag } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { toast } from 'sonner';

type Answer = {
  id: string;
  body: string;
  author: string;
  upvotes: number;
  created_at: string;
};

type Question = {
  id: string;
  title: string;
  body: string;
  author: string;
  tags: string[];
  upvotes: number;
  status: string;
  created_at: string;
  answers: Answer[];
};

export default function QA() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const { data: questionsData, error } = await supabase
        .from('questions')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Load answers for each question
      const questionsWithAnswers = await Promise.all(
        (questionsData || []).map(async (q: any) => {
          const { data: answersData } = await supabase
            .from('answers')
            .select('*, profiles(full_name)')
            .eq('question_id', q.id)
            .order('created_at', { ascending: false });

          return {
            id: q.id,
            title: q.title,
            body: q.body,
            author: q.profiles?.full_name || 'Anonymous',
            tags: q.tags || [],
            upvotes: 0,
            status: q.status,
            created_at: q.created_at,
            answers: (answersData || []).map((a: any) => ({
              id: a.id,
              body: a.body,
              author: a.profiles?.full_name || 'Anonymous',
              upvotes: a.upvotes,
              created_at: a.created_at,
            })),
          };
        })
      );

      setQuestions(questionsWithAnswers);
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  const handleAnswerSubmit = async () => {
    if (!user || !selectedQuestion || !answerText.trim()) return;
    setLoading(true);

    try {
      const { error } = await supabase.from('answers').insert({
        question_id: selectedQuestion.id,
        user_id: user.id,
        body: answerText,
      });

      if (error) throw error;

      toast.success('Answer posted!');
      setAnswerText('');
      setSelectedQuestion(null);
      loadQuestions();
    } catch (error: any) {
      toast.error('Failed to post answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-16 p-8">
        <div className="max-w-5xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold mb-2">Questions & Answers</h1>
            <p className="text-muted-foreground mb-8">Get help from the community</p>
          </div>

          <div className="space-y-4">
            {questions.map((question) => (
              <Card key={question.id} className="hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{question.title}</h3>
                          <Badge variant={question.status === 'answered' ? 'default' : 'secondary'}>
                            {question.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">{question.body}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="gap-1">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{question.author}</span>
                        <span>•</span>
                        <span>{new Date(question.created_at).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm font-medium">{question.upvotes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">{question.answers.length}</span>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedQuestion(question)}
                            >
                              View / Answer
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{question.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div>
                                <p className="text-muted-foreground">{question.body}</p>
                              </div>

                              <div className="space-y-4">
                                <h4 className="font-semibold">
                                  {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
                                </h4>
                                {question.answers.map((answer) => (
                                  <Card key={answer.id}>
                                    <CardContent className="pt-6">
                                      <p className="mb-4">{answer.body}</p>
                                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <span>{answer.author}</span>
                                        <div className="flex items-center gap-2">
                                          <ThumbsUp className="w-4 h-4" />
                                          <span>{answer.upvotes}</span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>

                              {user && (
                                <div className="space-y-4 border-t pt-4">
                                  <h4 className="font-semibold">Your Answer</h4>
                                  <Textarea
                                    placeholder="Write your answer..."
                                    value={answerText}
                                    onChange={(e) => setAnswerText(e.target.value)}
                                    className="min-h-[150px]"
                                  />
                                  <Button
                                    onClick={handleAnswerSubmit}
                                    disabled={loading || !answerText.trim()}
                                  >
                                    {loading ? 'Posting...' : 'Post Answer'}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
