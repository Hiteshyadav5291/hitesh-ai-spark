import { GraduationCap, MapPin } from "lucide-react";
import { timeline, education } from "@/data/portfolio";

export function Journey() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-24">
      <div className="reveal">
        <p className="font-display text-sm font-semibold text-primary">04 — Journey</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Experience & Education</h2>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <ol className="relative space-y-6 border-l border-border pl-6">
          {timeline.map((entry) => (
            <li key={entry.title} className="reveal relative">
              <span
                className="gradient-surface absolute top-2 -left-[31px] size-3 rounded-full ring-4 ring-background"
                aria-hidden="true"
              />
              <div className="glass-panel lift-on-hover rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                    {entry.period}
                  </span>
                  {entry.current && (
                    <span className="gradient-surface rounded-lg px-2.5 py-1 text-[11px] font-semibold">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-base font-semibold">{entry.title}</h3>
                <p className="text-sm text-primary">{entry.place}</p>
                <p className="mt-2 text-sm text-muted-foreground">{entry.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <aside className="reveal">
          <div className="glass-panel lift-on-hover rounded-3xl p-6">
            <span className="gradient-surface inline-flex size-11 items-center justify-center rounded-2xl">
              <GraduationCap className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{education.degree}</h3>
            <p className="mt-1 text-sm font-medium text-primary">{education.institution}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden="true" />
              {education.location}
            </p>
            <p className="mt-4 inline-block rounded-xl border border-border bg-muted/70 px-3 py-1.5 text-xs font-medium">
              {education.status}
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
              {education.focus.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
