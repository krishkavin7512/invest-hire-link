-- Create profiles table with user info
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  user_type TEXT CHECK (user_type IN ('investor', 'startup', 'jobseeker', 'employer')),
  premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  equity_min DECIMAL,
  equity_max DECIMAL,
  locations TEXT[],
  job_types TEXT[],
  sectors TEXT[],
  stages TEXT[],
  remote_preference TEXT CHECK (remote_preference IN ('remote', 'hybrid', 'onsite', 'any')),
  notify_email BOOLEAN DEFAULT TRUE,
  investment_min INTEGER,
  investment_max INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on user_preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- user_preferences policies
CREATE POLICY "Users can view own preferences"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON public.user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON public.user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create questions table
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'unanswered' CHECK (status IN ('unanswered', 'answered')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on questions
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- questions policies
CREATE POLICY "Questions are viewable by everyone"
  ON public.questions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create questions"
  ON public.questions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own questions"
  ON public.questions FOR UPDATE
  USING (auth.uid() = user_id);

-- Create answers table
CREATE TABLE IF NOT EXISTS public.answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  body TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on answers
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;

-- answers policies
CREATE POLICY "Answers are viewable by everyone"
  ON public.answers FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create answers"
  ON public.answers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own answers"
  ON public.answers FOR UPDATE
  USING (auth.uid() = user_id);

-- Create forum_posts table (mirrors questions)
CREATE TABLE IF NOT EXISTS public.forum_posts (
  id UUID PRIMARY KEY REFERENCES public.questions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_type TEXT DEFAULT 'question',
  title TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on forum_posts
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

-- forum_posts policies
CREATE POLICY "Forum posts are viewable by everyone"
  ON public.forum_posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create forum posts"
  ON public.forum_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create job_apps table
CREATE TABLE IF NOT EXISTS public.job_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  jd_url TEXT,
  status TEXT DEFAULT 'applied' CHECK (status IN ('applied', 'interviewing', 'offer', 'rejected')),
  date_applied DATE DEFAULT CURRENT_DATE,
  interviews JSONB DEFAULT '[]',
  contacts JSONB DEFAULT '[]',
  notes TEXT,
  resume_version TEXT,
  chance_score INTEGER CHECK (chance_score >= 0 AND chance_score <= 100),
  reminders JSONB DEFAULT '[]',
  attachments TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on job_apps
ALTER TABLE public.job_apps ENABLE ROW LEVEL SECURITY;

-- job_apps policies
CREATE POLICY "Users can view own job applications"
  ON public.job_apps FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own job applications"
  ON public.job_apps FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own job applications"
  ON public.job_apps FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own job applications"
  ON public.job_apps FOR DELETE
  USING (auth.uid() = user_id);

-- Create analytics_pitch_events table
CREATE TABLE IF NOT EXISTS public.analytics_pitch_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  deck_id UUID,
  slide_number INTEGER,
  dwell_ms INTEGER,
  question_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on analytics_pitch_events
ALTER TABLE public.analytics_pitch_events ENABLE ROW LEVEL SECURITY;

-- analytics_pitch_events policies
CREATE POLICY "Users can view own analytics events"
  ON public.analytics_pitch_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own analytics events"
  ON public.analytics_pitch_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update question status when answered
CREATE OR REPLACE FUNCTION public.update_question_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.questions
  SET status = 'answered', updated_at = NOW()
  WHERE id = NEW.question_id;
  RETURN NEW;
END;
$$;

-- Create trigger to auto-update question status
DROP TRIGGER IF EXISTS on_answer_created ON public.answers;
CREATE TRIGGER on_answer_created
  AFTER INSERT ON public.answers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_question_status();

-- Create function to auto-create forum post from question
CREATE OR REPLACE FUNCTION public.create_forum_post_from_question()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.forum_posts (id, user_id, title, excerpt, tags, created_at)
  VALUES (
    NEW.id,
    NEW.user_id,
    NEW.title,
    LEFT(NEW.body, 200),
    NEW.tags,
    NEW.created_at
  );
  RETURN NEW;
END;
$$;

-- Create trigger to auto-create forum post
DROP TRIGGER IF EXISTS on_question_created ON public.questions;
CREATE TRIGGER on_question_created
  AFTER INSERT ON public.questions
  FOR EACH ROW
  EXECUTE FUNCTION public.create_forum_post_from_question();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_questions_user_id ON public.questions(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_status ON public.questions(status);
CREATE INDEX IF NOT EXISTS idx_questions_tags ON public.questions USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_answers_question_id ON public.answers(question_id);
CREATE INDEX IF NOT EXISTS idx_answers_user_id ON public.answers(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_tags ON public.forum_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_job_apps_user_id ON public.job_apps(user_id);
CREATE INDEX IF NOT EXISTS idx_job_apps_status ON public.job_apps(status);