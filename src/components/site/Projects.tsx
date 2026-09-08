import { useRef, useState } from "react";
import { Github, ExternalLink, X, Star } from "lucide-react";
import type { ProjectRow } from "@/lib/content.functions";

import imgVision from "@/assets/project-vision.jpg";
import imgText from "@/assets/project-text.jpg";
import imgData from "@/assets/project-data.jpg";
import imgWeb from "@/assets/project-web.jpg";

const gallery = [imgVision, imgText, imgData, imgWeb];

/** Stable illustration per project so cards keep the same look between visits. */
function imageFor(id: string) {
  let sum = 0;
  for (let i = 0; i < id.length; i += 1) sum += id.charCodeAt(i);
  return gallery[sum % gallery.length]!;
}

/** Card with a subtle 3D tilt that follows the pointer. */
function ProjectCard({ project, onOpen }: { project: ProjectRow; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-6px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="glass-panel group overflow-hidden rounded-3xl transition-[transform,box-shadow] duration-300 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={imageFor(project.id)}
          alt={`Preview illustration for ${project.title}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="glass-panel absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-medium">
          {project.category}
        </span>
        {project.featured && (
          <span className="gradient-surface absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold">
            <Star className="size-3" aria-hidden="true" /> Featured
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <li
              key={t}
              className="rounded-lg border border-border bg-muted/70 px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpen}
            className="gradient-surface rounded-xl px-4 py-2 text-xs font-semibold"
          >
            View details
          </button>
          <a
            href={project.github_url || "#"}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
          >
            <Github className="size-3.5" aria-hidden="true" /> GitHub
          </a>
          <a
            href={project.demo_url || "#"}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
          >
            <ExternalLink className="size-3.5" aria-hidden="true" /> Demo
          </a>
        </div>
      </div>
    </article>
  );
}

export function Projects({ projects }: { projects: ProjectRow[] }) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<ProjectRow | null>(null);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-24">
      <div className="reveal">
        <p className="font-display text-sm font-semibold text-primary">03 — Projects</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Selected work</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          These are clearly marked sample entries so the site feels complete — replace them with
          your real projects as you build them.
        </p>
      </div>

      <div className="reveal mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
              filter === c ? "gradient-surface" : "glass-panel text-muted-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="reveal mt-8 grid gap-6 sm:grid-cols-2">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={() => setOpen(p)} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-8 text-sm text-muted-foreground">No projects in this category yet.</p>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-60 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="glass-panel max-h-[85vh] w-full max-w-lg overflow-auto rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={imageFor(open.id)}
                alt={`Preview illustration for ${open.title}`}
                className="aspect-[16/9] w-full rounded-t-3xl object-cover"
              />
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close project details"
                className="glass-panel absolute top-3 right-3 rounded-full p-2"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-xs font-medium text-primary">{open.category}</p>
              <h3 className="mt-1 text-xl font-bold">{open.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{open.details}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {open.technologies.map((t) => (
                  <li
                    key={t}
                    className="rounded-lg border border-border bg-muted/70 px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-2">
                <a
                  href={open.github_url || "#"}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-medium"
                >
                  <Github className="size-3.5" aria-hidden="true" /> GitHub
                </a>
                <a
                  href={open.demo_url || "#"}
                  className="gradient-surface inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold"
                >
                  <ExternalLink className="size-3.5" aria-hidden="true" /> Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
