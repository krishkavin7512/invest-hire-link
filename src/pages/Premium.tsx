import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/Sidebar';
import { Check, Crown, Zap, MessageCircle, TrendingUp, Shield } from 'lucide-react';
import { toast } from 'sonner';

const features = {
  free: [
    'Basic profile',
    'Limited matches per day',
    'Email support',
    'Standard analytics',
  ],
  premium: [
    'Premium badge',
    'Unlimited matches',
    'Priority support (24/7)',
    'Advanced analytics',
    'Faster Connect - skip verification queue',
    'Direct Messaging - message anyone',
    'Profile boosting',
    'Custom branding',
  ],
};

export default function Premium() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {
      toast.error('Please sign in to upgrade');
      return;
    }

    setLoading(true);
    try {
      // Update user profile to premium
      const { error } = await supabase
        .from('profiles')
        .update({ premium: true })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Upgraded to Premium! 🎉');
      // In a real app, you'd integrate with a payment processor here
    } catch (error: any) {
      toast.error('Failed to upgrade');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-16 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-12 h-12 text-yellow-500" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Upgrade to Premium</h1>
            <p className="text-xl text-muted-foreground">
              Unlock powerful features to accelerate your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.free.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-muted-foreground" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
                POPULAR
              </div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  Premium
                  <Crown className="w-6 h-6 text-yellow-500" />
                </CardTitle>
                <CardDescription>For serious professionals</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {features.premium.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleUpgrade}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Upgrade Now'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Faster Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Skip the verification queue and connect with investors or employers instantly
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MessageCircle className="w-10 h-10 text-secondary mb-2" />
                <CardTitle>Direct Messaging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Message anyone on the platform without waiting for mutual matches
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-accent mb-2" />
                <CardTitle>Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get detailed insights into your profile views, match rates, and engagement
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
