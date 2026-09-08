
CREATE OR REPLACE FUNCTION public.is_site_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(lower(auth.jwt() ->> 'email') = 'hiteshyadav@gmail.com', false);
$$;

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  description text NOT NULL DEFAULT '',
  details text NOT NULL DEFAULT '',
  technologies text[] NOT NULL DEFAULT '{}',
  github_url text NOT NULL DEFAULT '',
  demo_url text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are public" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Owner manages projects" ON public.projects FOR ALL TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());

CREATE TABLE public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  category_note text NOT NULL DEFAULT '',
  name text NOT NULL,
  note text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.skills TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.skills TO authenticated;
GRANT ALL ON public.skills TO service_role;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Skills are public" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Owner manages skills" ON public.skills FOR ALL TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());

CREATE TABLE public.timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period text NOT NULL DEFAULT '',
  title text NOT NULL,
  place text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  is_current boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.timeline TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.timeline TO authenticated;
GRANT ALL ON public.timeline TO service_role;
ALTER TABLE public.timeline ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Timeline is public" ON public.timeline FOR SELECT USING (true);
CREATE POLICY "Owner manages timeline" ON public.timeline FOR ALL TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER timeline_updated_at BEFORE UPDATE ON public.timeline FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.projects (title, category, description, details, technologies, github_url, demo_url, featured, sort_order) VALUES
('Image Classification Playground','Machine Learning','Sample Project — a small convolutional model trained to classify images, with an interface for uploading a picture and viewing predictions.','Sample Project — replace with your project. Planned as a learning build: dataset preparation, a simple CNN trained in a notebook, and a lightweight Python API serving predictions to a web page.',ARRAY['Python','Deep Learning','Computer Vision','Flask'],'#','#',true,1),
('Text Insights Tool','NLP','Sample Project — a text analysis utility that summarises documents and highlights sentiment and key phrases.','Sample Project — replace with your project. Explores tokenisation, embeddings and sentiment scoring, with results rendered in a clean dashboard view.',ARRAY['Python','NLP','FastAPI','Data Analysis'],'#','#',true,2),
('Data Exploration Dashboard','Data Analysis','Sample Project — an interactive dashboard for exploring a dataset with filters, charts and summary statistics.','Sample Project — replace with your project. Focused on turning raw CSV data into readable visual stories with responsive charts.',ARRAY['Python','SQL','JavaScript','Data Analysis'],'#','#',false,3),
('3D Portfolio Experience','Web','Sample Project — an interactive personal site with a real-time 3D neural-network scene and scroll-driven motion.','Sample Project — replace with your project. Built with modern web tooling and a WebGL scene that degrades gracefully when 3D is not available.',ARRAY['JavaScript','Three.js','CSS','HTML'],'#','#',false,4);

INSERT INTO public.skills (category, category_note, name, note, sort_order) VALUES
('Programming','Languages I write and practice with.','Python','Primary language for AI/ML work and scripting.',1),
('Programming','Languages I write and practice with.','JavaScript','Interactive web interfaces and browser APIs.',2),
('Programming','Languages I write and practice with.','HTML','Semantic, accessible page structure.',3),
('Programming','Languages I write and practice with.','CSS','Modern layouts, responsive design, animation.',4),
('Programming','Languages I write and practice with.','C / C++','Core programming and data structures practice.',5),
('Programming','Languages I write and practice with.','Java','Object-oriented programming fundamentals.',6),
('AI / ML','Areas I am studying and experimenting with.','Machine Learning','Supervised and unsupervised learning basics.',1),
('AI / ML','Areas I am studying and experimenting with.','Deep Learning','Neural network architectures and training.',2),
('AI / ML','Areas I am studying and experimenting with.','Artificial Intelligence','Coursework and self-driven exploration.',3),
('AI / ML','Areas I am studying and experimenting with.','Data Analysis','Cleaning, exploring and visualising datasets.',4),
('AI / ML','Areas I am studying and experimenting with.','Neural Networks','Building and tuning simple models.',5),
('AI / ML','Areas I am studying and experimenting with.','Computer Vision','Image classification experiments.',6),
('AI / ML','Areas I am studying and experimenting with.','NLP','Working with text data and language models.',7),
('Development','How I build and ship projects.','Git','Version control for everyday work.',1),
('Development','How I build and ship projects.','GitHub','Hosting projects and collaborating.',2),
('Development','How I build and ship projects.','REST APIs','Designing and consuming HTTP endpoints.',3),
('Development','How I build and ship projects.','Flask','Lightweight Python web services.',4),
('Development','How I build and ship projects.','FastAPI','Typed, async Python APIs.',5),
('Development','How I build and ship projects.','SQL','Relational queries and schema basics.',6),
('Development','How I build and ship projects.','Firebase','Auth and realtime data for small apps.',7),
('Tools & Tech','My everyday working environment.','VS Code','Main editor and debugging setup.',1),
('Tools & Tech','My everyday working environment.','Jupyter','Notebooks for experiments and analysis.',2),
('Tools & Tech','My everyday working environment.','Docker','Containerising apps for consistency.',3),
('Tools & Tech','My everyday working environment.','Linux','Command line and development workflow.',4),
('Tools & Tech','My everyday working environment.','Cloud','Learning deployment and hosting basics.',5);

INSERT INTO public.timeline (period, title, place, description, is_current, sort_order) VALUES
('Present','B.Tech — Artificial Intelligence & Machine Learning','JECRC University, Jaipur','Currently pursuing my degree with coursework across programming, mathematics for machine learning, and AI systems.',true,1),
('Ongoing','Technology Learning Journey','Self-directed','Continuous learning and experimentation — building projects, following courses, and practising with new frameworks and tools.',false,2),
('Next','Open to internships & collaborations','Remote / Jaipur','Looking for opportunities to apply AI/ML and software engineering skills on real products and teams.',false,3);
