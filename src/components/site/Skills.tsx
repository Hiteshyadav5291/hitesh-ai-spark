import { useState } from "react";
import { skillGroups } from "@/data/portfolio";

/**
 * Skills are shown as an interactive constellation of floating chips.
 * Hovering or focusing a chip reveals a short note about that skill.
 */
export function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillGroups[0]!.category);
  const [hovered, setHovered] = useState<{ name: string; note: string } | null>(null);

  const group = skillGroups.find((g) => g.category === activeCategory)!;

  return (
    <section id="skills" className="relative scroll-mt-28 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal">
          <p className="font-display text-sm font-semibold text-primary">02 — Skills</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Technologies I work with</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            A mix of what I use daily and what I'm actively studying. Hover or tap a skill for
            context.
          </p>
        </div>

        <div className="reveal mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
          {skillGroups.map((g) => (
            <button
              key={g.category}
              role="tab"
              aria-selected={activeCategory === g.category}
              onClick={() => {
                setActiveCategory(g.category);
                setHovered(null);
              }}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === g.category
                  ? "gradient-surface shadow-md"
                  : "glass-panel text-muted-foreground hover:text-foreground"
              }`}
            >
              {g.category}
            </button>
          ))}
        </div>

        <div className="reveal glass-panel mt-6 rounded-3xl p-6 sm:p-8">
          <p className="text-sm text-muted-foreground">{group.blurb}</p>

          <ul className="mt-6 flex flex-wrap gap-3">
            {group.skills.map((skill, i) => (
              <li key={skill.name}>
                <button
                  type="button"
                  onMouseEnter={() => setHovered(skill)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(skill)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setHovered(skill)}
                  className="lift-on-hover rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  {skill.name}
                </button>
              </li>
            ))}
          </ul>

          <div
            aria-live="polite"
            className="mt-6 min-h-12 rounded-2xl border border-border bg-muted/60 px-4 py-3 text-sm text-muted-foreground"
          >
            {hovered ? (
              <span>
                <strong className="text-foreground">{hovered.name}</strong> — {hovered.note}
              </span>
            ) : (
              <span>Select a skill to see how I use it.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
