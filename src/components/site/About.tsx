import { Brain, GraduationCap, Compass, Rocket } from "lucide-react";
import { profile, highlights } from "@/data/portfolio";

const icons = [GraduationCap, Brain, Compass, Rocket];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-24">
      <div className="reveal">
        <p className="font-display text-sm font-semibold text-primary">01 — About</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">About Me</h2>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-foreground">
            Learn. Build. Experiment. That loop is how I keep improving.
          </p>
        </div>

        <div className="reveal grid gap-4 sm:grid-cols-2">
          {highlights.map((item, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <article
                key={item.label}
                className="glass-panel lift-on-hover rounded-2xl p-5"
              >
                <span className="gradient-surface inline-flex size-9 items-center justify-center rounded-xl">
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
                  {item.label}
                </h3>
                <p className="mt-1 text-sm font-medium">{item.value}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
