/**
 * Centralized portfolio content.
 * Every section of the site reads from this file, so updating the portfolio
 * means editing data here — not hunting through components.
 */

export const profile = {
  name: "Hitesh Yadav",
  roles: ["AI/ML Student", "Software Engineer", "Tech Enthusiast"],
  tagline:
    "B.Tech AI/ML student at JECRC University passionate about building software, exploring Artificial Intelligence, and learning the technologies shaping the future.",
  university: "JECRC University",
  degree: "B.Tech — Artificial Intelligence & Machine Learning",
  location: "Jaipur, Rajasthan, India",
  email: "hiteshyadav5291@gmail.com",
  resumeUrl: "#", // Replace with a link to your resume PDF
  about: [
    "I'm Hitesh Yadav, a B.Tech student in Artificial Intelligence & Machine Learning at JECRC University, Jaipur.",
    "I enjoy building software, experimenting with machine learning ideas, and turning what I learn into working projects — from small scripts to full applications.",
    "My focus right now is strengthening my fundamentals in programming and AI/ML while exploring how technology can solve real problems.",
  ],
} as const;

export const socials = [
  {
    label: "Email",
    href: "mailto:hiteshyadav5291@gmail.com",
    handle: "hiteshyadav5291@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hitesh-yadav-6b2849433",
    handle: "in/hitesh-yadav",
  },
  {
    label: "GitHub",
    href: "#", // Placeholder — add your GitHub profile URL
    handle: "Add your GitHub link",
  },
  {
    label: "Instagram",
    href: "#", // Placeholder — add your Instagram URL
    handle: "Add your Instagram link",
  },
] as const;

export const highlights = [
  { label: "Education", value: "B.Tech — AI & Machine Learning" },
  { label: "University", value: "JECRC University" },
  { label: "Focus", value: "AI/ML • Software Development • Emerging Tech" },
  { label: "Mindset", value: "Learn • Build • Experiment" },
] as const;

export type SkillCategory = {
  category: string;
  blurb: string;
  skills: { name: string; note: string }[];
};

export const skillGroups: SkillCategory[] = [
  {
    category: "Programming",
    blurb: "Languages I write and practice with.",
    skills: [
      { name: "Python", note: "Primary language for AI/ML work and scripting." },
      { name: "JavaScript", note: "Interactive web interfaces and browser APIs." },
      { name: "HTML", note: "Semantic, accessible page structure." },
      { name: "CSS", note: "Modern layouts, responsive design, animation." },
      { name: "C / C++", note: "Core programming and data structures practice." },
      { name: "Java", note: "Object-oriented programming fundamentals." },
    ],
  },
  {
    category: "AI / ML",
    blurb: "Areas I'm studying and experimenting with.",
    skills: [
      { name: "Machine Learning", note: "Supervised and unsupervised learning basics." },
      { name: "Deep Learning", note: "Neural network architectures and training." },
      { name: "Artificial Intelligence", note: "Coursework and self-driven exploration." },
      { name: "Data Analysis", note: "Cleaning, exploring and visualising datasets." },
      { name: "Neural Networks", note: "Building and tuning simple models." },
      { name: "Computer Vision", note: "Image classification experiments." },
      { name: "NLP", note: "Working with text data and language models." },
    ],
  },
  {
    category: "Development",
    blurb: "How I build and ship projects.",
    skills: [
      { name: "Git", note: "Version control for everyday work." },
      { name: "GitHub", note: "Hosting projects and collaborating." },
      { name: "REST APIs", note: "Designing and consuming HTTP endpoints." },
      { name: "Flask", note: "Lightweight Python web services." },
      { name: "FastAPI", note: "Typed, async Python APIs." },
      { name: "SQL", note: "Relational queries and schema basics." },
      { name: "Firebase", note: "Auth and realtime data for small apps." },
    ],
  },
  {
    category: "Tools & Tech",
    blurb: "My everyday working environment.",
    skills: [
      { name: "VS Code", note: "Main editor and debugging setup." },
      { name: "Jupyter", note: "Notebooks for experiments and analysis." },
      { name: "Docker", note: "Containerising apps for consistency." },
      { name: "Linux", note: "Command line and development workflow." },
      { name: "Cloud", note: "Learning deployment and hosting basics." },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
  sample: boolean;
};

/** Sample entries — clearly marked placeholders to replace with real projects. */
export const projects: Project[] = [
  {
    id: "vision-classifier",
    title: "Image Classification Playground",
    category: "Machine Learning",
    description:
      "Sample Project — a small convolutional model trained to classify images, with an interface for uploading a picture and viewing predictions.",
    details:
      "Sample Project — replace with your project. Planned as a learning build: dataset preparation, a simple CNN trained in a notebook, and a lightweight Python API serving predictions to a web page.",
    technologies: ["Python", "Deep Learning", "Computer Vision", "Flask"],
    github: "#",
    demo: "#",
    featured: true,
    sample: true,
  },
  {
    id: "text-insights",
    title: "Text Insights Tool",
    category: "NLP",
    description:
      "Sample Project — a text analysis utility that summarises documents and highlights sentiment and key phrases.",
    details:
      "Sample Project — replace with your project. Explores tokenisation, embeddings and sentiment scoring, with results rendered in a clean dashboard view.",
    technologies: ["Python", "NLP", "FastAPI", "Data Analysis"],
    github: "#",
    demo: "#",
    featured: true,
    sample: true,
  },
  {
    id: "data-dashboard",
    title: "Data Exploration Dashboard",
    category: "Data Analysis",
    description:
      "Sample Project — an interactive dashboard for exploring a dataset with filters, charts and summary statistics.",
    details:
      "Sample Project — replace with your project. Focused on turning raw CSV data into readable visual stories with responsive charts.",
    technologies: ["Python", "SQL", "JavaScript", "Data Analysis"],
    github: "#",
    demo: "#",
    featured: false,
    sample: true,
  },
  {
    id: "portfolio-3d",
    title: "3D Portfolio Experience",
    category: "Web",
    description:
      "Sample Project — an interactive personal site with a real-time 3D neural-network scene and scroll-driven motion.",
    details:
      "Sample Project — replace with your project. Built with modern web tooling and a WebGL scene that degrades gracefully when 3D isn't available.",
    technologies: ["JavaScript", "Three.js", "CSS", "HTML"],
    github: "#",
    demo: "#",
    featured: false,
    sample: true,
  },
];

export type TimelineEntry = {
  period: string;
  title: string;
  place: string;
  description: string;
  current?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    period: "Present",
    title: "B.Tech — Artificial Intelligence & Machine Learning",
    place: "JECRC University, Jaipur",
    description:
      "Currently pursuing my degree with coursework across programming, mathematics for machine learning, and AI systems.",
    current: true,
  },
  {
    period: "Ongoing",
    title: "Technology Learning Journey",
    place: "Self-directed",
    description:
      "Continuous learning and experimentation — building projects, following courses, and practising with new frameworks and tools.",
  },
  {
    period: "Next",
    title: "Open to internships & collaborations",
    place: "Remote / Jaipur",
    description:
      "Looking for opportunities to apply AI/ML and software engineering skills on real products and teams.",
  },
];

export const education = {
  degree: "B.Tech in Artificial Intelligence & Machine Learning",
  institution: "JECRC University",
  location: "Jaipur, Rajasthan, India",
  status: "Currently Pursuing",
  focus: ["Machine Learning", "Data Structures", "Software Engineering", "Mathematics for AI"],
};
