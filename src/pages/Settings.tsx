import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Sidebar } from '@/components/Sidebar';

type Preferences = {
  salary_min?: number;
  salary_max?: number;
  equity_min?: number;
  equity_max?: number;
  locations?: string[];
  job_types?: string[];
  sectors?: string[];
  stages?: string[];
  remote_preference?: string;
  notify_email?: boolean;
  investment_min?: number;
  investment_max?: number;
};

export default function Settings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({});
  const [locationInput, setLocationInput] = useState('');
  const [sectorInput, setSectorInput] = useState('');

  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setPreferences(data);
      }
    } catch (error: any) {
      toast.error('Failed to load preferences');
    }
  };

  const savePreferences = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...preferences,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success('Preferences saved successfully!');
    } catch (error: any) {
      toast.error('Failed to save preferences');
    } finally {
      setLoading(false);
    }
  };

  const addLocation = () => {
    if (locationInput.trim()) {
      setPreferences({
        ...preferences,
        locations: [...(preferences.locations || []), locationInput.trim()],
      });
      setLocationInput('');
    }
  };

  const removeLocation = (loc: string) => {
    setPreferences({
      ...preferences,
      locations: preferences.locations?.filter((l) => l !== loc),
    });
  };

  const addSector = () => {
    if (sectorInput.trim()) {
      setPreferences({
        ...preferences,
        sectors: [...(preferences.sectors || []), sectorInput.trim()],
      });
      setSectorInput('');
    }
  };

  const removeSector = (sector: string) => {
    setPreferences({
      ...preferences,
      sectors: preferences.sectors?.filter((s) => s !== sector),
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-16 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Settings & Preferences</h1>
          <p className="text-muted-foreground mb-8">
            Customize your experience and matching preferences
          </p>

          <Tabs defaultValue="preferences">
            <TabsList>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Salary Range</CardTitle>
                  <CardDescription>
                    Set your expected salary range (annual in USD)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Minimum: ${preferences.salary_min?.toLocaleString() || 0}</Label>
                    <Slider
                      value={[preferences.salary_min || 0]}
                      onValueChange={([value]) =>
                        setPreferences({ ...preferences, salary_min: value })
                      }
                      max={500000}
                      step={5000}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Maximum: ${preferences.salary_max?.toLocaleString() || 200000}</Label>
                    <Slider
                      value={[preferences.salary_max || 200000]}
                      onValueChange={([value]) =>
                        setPreferences({ ...preferences, salary_max: value })
                      }
                      max={500000}
                      step={5000}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Locations</CardTitle>
                  <CardDescription>Preferred work locations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add location..."
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addLocation()}
                    />
                    <Button onClick={addLocation}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.locations?.map((loc) => (
                      <Badge key={loc} variant="secondary">
                        {loc}
                        <button
                          className="ml-2 hover:text-destructive"
                          onClick={() => removeLocation(loc)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sectors</CardTitle>
                  <CardDescription>Industries you're interested in</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add sector..."
                      value={sectorInput}
                      onChange={(e) => setSectorInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addSector()}
                    />
                    <Button onClick={addSector}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.sectors?.map((sector) => (
                      <Badge key={sector} variant="secondary">
                        {sector}
                        <button
                          className="ml-2 hover:text-destructive"
                          onClick={() => removeSector(sector)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Work Preference</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['remote', 'hybrid', 'onsite', 'any'].map((pref) => (
                      <label key={pref} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="remote_preference"
                          value={pref}
                          checked={preferences.remote_preference === pref}
                          onChange={(e) =>
                            setPreferences({
                              ...preferences,
                              remote_preference: e.target.value,
                            })
                          }
                          className="cursor-pointer"
                        />
                        <span className="capitalize">{pref}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button onClick={savePreferences} disabled={loading} className="w-full">
                {loading ? 'Saving...' : 'Save Preferences'}
              </Button>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <Input value={user?.email || ''} disabled />
                  </div>
                  <Button variant="outline">Change Password</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about matches and messages
                      </p>
                    </div>
                    <Switch
                      checked={preferences.notify_email !== false}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, notify_email: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
