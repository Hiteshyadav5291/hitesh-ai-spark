# AI Ascent Portfolio

Build a Premium 3D AI/ML Software Engineer Portfolio Website
Developer Profile
Create a modern, premium, interactive personal portfolio website for:

Name: Hitesh Yadav
University: JECRC University
Degree: B.Tech in Artificial Intelligence & Machine Learning
Role: AI/ML Student, Software Engineer & Technology Enthusiast
Location: Jaipur, Rajasthan, India

About Hitesh
Hitesh Yadav is a B.Tech AI/ML student at JECRC University and a passionate technology enthusiast. He enjoys learning new technologies, building software projects, experimenting with Artificial Intelligence and Machine Learning, and continuously improving his technical skills.

The website should present Hitesh as a modern software engineer / AI-ML developer, with a strong focus on technology, creativity, problem solving, and futuristic design.

1. Overall Website Goal
Build a high-end, bright-themed, 3D personal portfolio website specifically designed for a software engineer and AI/ML developer.

The website should feel:

Premium
Modern
Futuristic
Professional
Interactive
Smooth
Bright
Minimal but visually rich
Technically impressive
Avoid making it look like a generic student portfolio.

The design should resemble the quality of a modern technology startup or premium developer portfolio.

Use 3D elements, subtle glassmorphism, gradients, animated backgrounds, floating objects, micro-interactions and smooth transitions.

The website should immediately communicate:

"I am a technology enthusiast who builds, learns and experiments with modern software and AI/ML technologies."

2. Required Technology Stack
Frontend
Use:

HTML5
CSS3
JavaScript ES6+
Three.js for 3D graphics
GSAP for advanced animations where useful
Scroll-based animation
Intersection Observer API where appropriate
Google Fonts or another high-quality web font
You may use lightweight libraries when they genuinely improve the experience, but avoid unnecessary dependencies.

Backend / Admin Panel
Create an admin dashboard using Python.

Preferred stack:

Python
Flask or FastAPI
SQLite for development
REST API architecture
Secure authentication
Environment variables for secrets
The admin panel should allow Hitesh to manage portfolio content without manually editing HTML.

3. Important Deployment Requirement
The final project must be structured so it can be deployed easily on Vercel.

Create the appropriate:

vercel.json
frontend structure
Python serverless/API structure if required
requirements file
environment variable configuration
deployment instructions
If the chosen Python backend architecture cannot run directly on Vercel in the proposed configuration, clearly explain the limitation and provide the most practical Vercel-compatible architecture.

Do NOT pretend that an architecture is Vercel-compatible if it is not.

Keep the frontend deployable directly to Vercel.

4. Website Structure
Create the following sections.

Navigation
Create a sticky/floating navigation bar.

Navigation items:

Home
About
Skills
Projects
Experience
Contact
Include:

Hitesh Yadav logo/name
Smooth scrolling
Active section indicator
Mobile hamburger menu
Animated menu transitions
Resume button
Optional theme/control button
The navbar should become slightly more compact while scrolling.

5. Hero Section
Create an impressive full-screen hero section.

Display:

Hi, I'm Hitesh Yadav

Then:

AI/ML Student • Software Engineer • Tech Enthusiast

Supporting text:

B.Tech AI/ML student at JECRC University passionate about building software, exploring Artificial Intelligence, and learning the technologies shaping the future.

Add two CTA buttons:

View My Work

Let's Connect

Also include a 3D interactive element.

3D Hero Concept
Use Three.js to create an elegant futuristic 3D scene.

Possible concept:

Floating 3D geometric objects
Glowing neural-network-like structure
Floating code symbols
Particles
AI-inspired sphere
Rotating abstract technology object
Connected nodes representing neural networks
The 3D object should react subtly to:

Mouse movement
Cursor position
Scroll
Device orientation when available
Do NOT make the 3D scene overwhelming.

It should complement the content.

6. Hero Animation
When the page loads:

Background fades in.
3D scene initializes smoothly.
Main heading animates upward.
Subtitle fades in.
Description appears.
CTA buttons animate in.
Floating 3D object begins its idle animation.
Use smooth easing.

Avoid excessive bouncing animations.

7. About Section
Create an elegant About section.

Heading:

About Me

Content should explain:

Hitesh is studying B.Tech AI/ML at JECRC University.
Passionate about software development.
Interested in Artificial Intelligence and Machine Learning.
Enjoys learning new technologies.
Likes building projects and experimenting with ideas.
Interested in solving real-world problems using technology.
Add an interactive visual beside the text.

Possible visual:

A 3D developer workspace / abstract AI brain / floating laptop / code cube.

Add small information cards:

Education
B.Tech — Artificial Intelligence & Machine Learning

University
JECRC University

Focus
AI/ML • Software Development • Emerging Technologies

Mindset
Learn • Build • Experiment

8. Skills Section
Create a visually impressive skills section.

Divide skills into categories.

Programming
Python
JavaScript
HTML
CSS
C/C++
Java
AI / ML
Machine Learning
Deep Learning
Artificial Intelligence
Data Analysis
Neural Networks
Computer Vision
Natural Language Processing
Development
Git
GitHub
REST APIs
Flask
FastAPI
SQL
Firebase
Tools & Technologies
VS Code
Jupyter
Docker
Linux
Cloud Technologies
Do not assume every listed technology is an expert-level skill.

Create a data structure so Hitesh can edit/add/remove skills from the admin panel.

Skill Visualization
Instead of ordinary progress bars, create interactive visualizations.

For example:

3D rotating skill sphere
Interactive technology nodes
Floating skill cards
Animated orbit around an AI core
Interactive technology constellation
Hovering over a skill should display additional information.

9. Projects Section
Create a premium project showcase.

Each project card should contain:

Project image/thumbnail
Project title
Short description
Technologies used
GitHub button
Live Demo button
Project category
Optional featured badge
Use an attractive card layout.

Cards should have:

3D hover effect
Tilt effect
Glow
Smooth image zoom
Animated borders
Glassmorphism
Clicking a project should open a detailed project modal/page.

The project data must come from a centralized JavaScript data structure or API so the admin panel can manage it.

Example project structure:

{
  title: "AI Project",
  description: "An AI-powered application...",
  technologies: ["Python", "Machine Learning"],
  image: "/assets/projects/project1.jpg",
  github: "#",
  demo: "#",
  featured: true
}

Do not invent fake achievements or fake project claims.

Use realistic placeholder project content where actual information has not been provided, and clearly mark it so it can be replaced from the admin panel.

10. Experience / Journey Section
Create a beautiful interactive timeline.

Possible entries:

B.Tech — AI/ML
JECRC University
Current

Technology Learning Journey
Continuous learning and experimentation

Create the timeline so additional internships, certifications, hackathons, jobs, achievements, etc. can easily be added through the admin panel.

Use animated timeline elements.

As the user scrolls:

Timeline line grows
Entries fade/slide in
Icons animate
Cards subtly move
11. Education Section
Include:

B.Tech in Artificial Intelligence & Machine Learning

JECRC University

Status:

Currently Pursuing

Add a visually appealing education card with a subtle 3D effect.

12. Contact Section
Create a strong final CTA.

Heading:

Let's Build Something Amazing

Text:

Have an idea, project, collaboration or opportunity? I'd love to connect.

Include:

Email
GitHub
LinkedIn
Instagram if provided
Resume download
Use placeholder values where contact details have not been provided.

Do not invent real contact information.

Create an elegant contact form with:

Name
Email
Subject
Message
Send Message button
Validate the form using JavaScript.

The backend should optionally handle contact form submissions.

13. Footer
Create a modern footer containing:

Hitesh Yadav

AI/ML Student • Software Engineer • Tech Enthusiast

Include social links and:

© 2026 Hitesh Yadav. All rights reserved.

Add a small animated "Back to top" control.

14. 3D Design System
Use Three.js carefully.

The 3D design should include:

Soft lighting
Smooth materials
Ambient particles
Subtle glow
Depth
Shadows where useful
Responsive camera
Mouse interaction
Possible scene:

A futuristic AI neural network core.

Create nodes connected by thin glowing lines.

The central object can slowly rotate.

The nodes should have subtle floating movement.

Mouse movement should influence the camera/object position.

Use requestAnimationFrame efficiently.

15. Performance Requirements
Performance is extremely important.

The website must remain smooth.

Target:

60 FPS where possible
Fast initial load
Optimized assets
Lazy loading
Responsive images
Minimize JavaScript execution
Avoid unnecessary DOM manipulation
Dispose Three.js objects correctly
Reduce 3D complexity on mobile
Mobile optimization
On mobile:

Reduce particle count
Reduce 3D geometry complexity
Reduce animation intensity
Disable expensive effects if necessary
Maintain the visual concept without sacrificing performance
Respect:

@media (prefers-reduced-motion: reduce)

When reduced motion is enabled, significantly reduce or disable animations.

16. Bright Theme
Use a bright futuristic color palette.

Suggested palette:

Background: #F8FAFC
Primary: #2563EB
Secondary: #7C3AED
Accent: #06B6D4
Text: #0F172A
Muted Text: #64748B
Card: rgba(255,255,255,0.75)
Border: rgba(15,23,42,0.08)

Use gradients such as:

linear-gradient(135deg, #2563EB, #7C3AED)

The site should feel bright rather than dark/cyberpunk.

Use colorful gradients sparingly.

17. Typography
Use a clean modern font.

Recommended:

Inter
Manrope
Space Grotesk
Use strong typography hierarchy.

Hero heading should be large and bold.

Example:

Hi, I'm
Hitesh Yadav

Highlight "Hitesh Yadav" with a gradient.

18. Micro Interactions
Add subtle interactions to:

Buttons
Navigation links
Cards
Skill items
Project cards
Social icons
Form fields
Examples:

Button magnetic hover
Gradient movement
Card lift
Border glow
Icon rotation
Text reveal
Image zoom
3D tilt
Do not over-animate the page.

Every animation should have a purpose.

19. Cursor Interaction
On desktop, create an optional custom cursor.

The cursor can have:

Small central dot
Soft outer circle
Hover expansion
When hovering over:

Buttons
Links
Project cards
the cursor should respond smoothly.

Disable custom cursor on touch devices.

20. Scroll Experience
Implement smooth scrolling.

Use scroll-triggered animations for sections.

Examples:

Fade up
Slide in
Scale
Blur-to-focus
3D movement
Animations should trigger only when elements enter the viewport.

Avoid loading every animation at page load.

21. Admin Panel
Create a separate /admin interface.

The admin dashboard should have a professional SaaS-style UI.

Admin navigation:

Dashboard
Profile
Skills
Projects
Experience
Education
Social Links
Messages
Settings
Dashboard should show:

Total projects
Total skills
Experience entries
Contact messages
Featured projects
22. Admin Authentication
Implement secure authentication.

Features:

Login page
Username/email
Password
Session/JWT authentication
Logout
Protected admin routes
Password stored securely using hashing
Never store plain-text passwords.

Use environment variables for:

ADMIN_USERNAME
ADMIN_PASSWORD_HASH
SECRET_KEY

23. Admin CRUD
The admin should be able to:

Projects
Add project
Edit project
Delete project
Mark featured
Upload/change image
Add GitHub URL
Add live demo URL
Add technologies
Skills
Add skill
Edit skill
Delete skill
Categorize skill
Add proficiency level if desired
Experience
Add experience
Edit
Delete
Change dates
Add description
Education
Add/edit/delete education
Profile
Edit:

Name
Bio
University
Degree
Location
Profile image
Resume
Email
Social links
24. Backend API
Create clean REST endpoints.

Example:

GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id

GET    /api/skills
POST   /api/skills
PUT    /api/skills/:id
DELETE /api/skills/:id

GET    /api/experience
POST   /api/experience
PUT    /api/experience/:id
DELETE /api/experience/:id

GET    /api/profile
PUT    /api/profile

POST   /api/contact
GET    /api/messages
DELETE /api/messages/:id

Protect admin-only endpoints with authentication.

25. Database
Use SQLite for local development.

Create database models/tables for:

Admin
Profile
Skills
Projects
Experience
Education
Messages
SocialLinks
Structure the application so the database can later be migrated to PostgreSQL or another production database.

26. Project Architecture
Use a clean structure similar to:

hitesh-portfolio/
│
├── frontend/
│   ├── index.html
│   ├── admin.html
│   ├── css/
│   │   ├── style.css
│   │   └── admin.css
│   ├── js/
│   │   ├── main.js
│   │   ├── three-scene.js
│   │   ├── projects.js
│   │   └── admin.js
│   ├── assets/
│   │   ├── images/
│   │   ├── projects/
│   │   └── resume/
│   └── ...
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── database.py
│   ├── auth.py
│   ├── routes/
│   │   ├── projects.py
│   │   ├── skills.py
│   │   ├── profile.py
│   │   └── contact.py
│   └── ...
│
├── requirements.txt
├── vercel.json
├── .env.example
├── .gitignore
└── README.md

You may modify the structure if there is a better architecture for Vercel deployment.

27. Code Quality
Write production-quality code.

Requirements:

Semantic HTML
Modular JavaScript
Reusable functions
CSS variables
Clean naming conventions
Comments explaining important code
No unnecessary inline JavaScript
No duplicated CSS
Accessible buttons
Keyboard navigation
Proper ARIA labels where appropriate
Form validation
Error handling
Loading states
Empty states
Do not create one giant JavaScript file if the code can be logically separated.

28. SEO
Add:

Page title
Meta description
Open Graph metadata
Twitter/X card metadata
Semantic HTML
Proper heading hierarchy
Descriptive alt text
Favicon
robots.txt
sitemap.xml
Suggested title:

Hitesh Yadav | AI/ML Student & Software Engineer

Suggested description:

Portfolio of Hitesh Yadav, a B.Tech AI/ML student at JECRC University, software engineer and technology enthusiast passionate about Artificial Intelligence, Machine Learning and modern software development.

29. Accessibility
Ensure:

Good color contrast
Keyboard navigation
Focus states
Accessible forms
Screen-reader-friendly labels
Reduced motion support
Touch-friendly buttons
No interaction that depends only on hover
The site must remain usable without the 3D effects.

30. Responsive Design
Optimize for:

320px mobile
375px mobile
425px mobile
Tablet
Laptop
Desktop
Large desktop
Create responsive breakpoints.

The 3D scene should resize automatically.

Do not allow horizontal scrolling.

31. Loading Experience
Create a minimal loading screen.

Example:

HY
Initializing experience...

Show a small progress indicator.

Once:

Fonts loaded
Core JavaScript initialized
Three.js scene initialized
transition smoothly into the website.

Do not make the loading screen unnecessarily long.

32. Error Handling
If the Three.js scene fails to load:

Do NOT break the website.

Instead:

Hide the 3D canvas
Show a lightweight animated gradient/background
Continue loading the rest of the portfolio
The portfolio content must work even if WebGL is unavailable.

33. Content Management
Do not hard-code important portfolio information throughout the frontend.

Create centralized data/API-driven content for:

Profile
Skills
Projects
Experience
Education
Social links
This makes the website easy to update through the admin panel.

34. Security
For the admin panel:

Hash passwords
Validate inputs
Sanitize user-generated content
Protect API endpoints
Use secure cookies/tokens where appropriate
Never expose secrets in frontend JavaScript
Use environment variables
Add CORS configuration only where needed
Validate uploaded files
Restrict upload file types and sizes
35. Demo Data
Populate the application with a few clearly marked sample projects and skills so the website looks complete when first launched.

However:

Do not fabricate real achievements, employment, clients, internships, certifications, GitHub statistics, or professional experience for Hitesh.

Use labels such as:

Sample Project
Replace with your project

where real information is unavailable.

36. Final Deliverables
Provide the complete working source code.

I need:

index.html
Complete CSS
Complete JavaScript
Three.js implementation
GSAP implementation if used
Admin dashboard
Python backend
Database setup
Authentication
REST API
requirements.txt
vercel.json
.env.example
.gitignore
README.md
Sample database/setup script
Any required assets or instructions for adding assets
37. README Requirements
The README must explain:

Installation
git clone <repository>
cd hitesh-portfolio

Frontend setup
Explain exactly how to run it locally.

Python setup
Explain:

python -m venv venv

and activation commands for Windows/macOS/Linux.

Then:

pip install -r requirements.txt

Explain how to start the backend.

Database
Explain how the database is initialized.

Environment Variables
Provide:

SECRET_KEY=
ADMIN_USERNAME=
ADMIN_PASSWORD_HASH=
DATABASE_URL=

Admin Panel
Explain:

/admin

and how to log in.

Deployment
Give exact Vercel deployment instructions.

Explain any limitations involving Python serverless functions, SQLite persistence, file uploads, or production databases.

38. Final Quality Check
Before presenting the final code, verify:

Navigation works
All buttons work
Mobile menu works
3D scene loads
WebGL fallback works
Animations work
Reduced-motion mode works
Contact form validates
Project filtering works if implemented
Admin login works
CRUD operations work
Database initializes correctly
API routes work
No console errors
No broken links
No horizontal overflow
Responsive layout works
Images have alt text
SEO metadata exists
Vercel configuration is included
39. Visual Direction
The final visual direction should be:

Bright + Futuristic + Minimal + 3D + Professional

Imagine a combination of:

Modern AI startup website
Premium developer portfolio
Apple-like whitespace
Interactive Three.js experience
Soft glassmorphism
Blue/purple/cyan gradients
Clean typography
Smooth motion
Avoid:

Generic bootstrap templates
Excessive dark backgrounds
Excessive neon
Excessive glassmorphism
Too many animations
Huge amounts of text
Cluttered layouts
Fake statistics
Fake experience
Stock-looking generic developer illustrations
40. Most Important Instruction
Do not only provide a design concept.

Build the actual complete working website.

Generate all necessary source files with complete code.

The final project should be structured so that I can:

Copy the project files.
Install dependencies.
Run it locally.
Open the portfolio.
Open /admin.
Add/edit projects and skills.
Commit it to GitHub.
Deploy it to Vercel.
Make the code understandable for a student developer and include comments around the Three.js scene, animation system, API integration, authentication, and database logic.

The final result should feel like a premium 2026 AI/ML software engineer portfolio, not a basic college project website.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hitesh-ai-spark.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c6ebe1ac-52d0-430b-860e-ede03d66a77b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
