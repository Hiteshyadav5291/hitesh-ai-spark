import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolio";

// The 3D scene is loaded only in the browser, after hydration.
const NeuralCore = lazy(() =>
  import("@/components/three/NeuralCore").then((m) => ({ default: m.NeuralCore })),
);

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="home" className="aurora relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="glass-panel inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            {profile.location}
          </p>

          <h1 className="mt-5 text-4xl leading-[1.05] font-bold sm:text-6xl lg:text-7xl">
            <span className="block text-muted-foreground">Hi, I'm</span>
            <span className="gradient-text block">{profile.name}</span>
          </h1>

          <p className="mt-4 font-display text-base font-medium sm:text-lg">
            {profile.roles.join(" • ")}
          </p>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="gradient-surface inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-md transition-transform duration-300 hover:scale-[1.03]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="glass-panel inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:scale-[1.03]"
            >
              Let's Connect
            </a>
          </div>
        </div>

        <div className="relative h-[320px] sm:h-[420px] lg:h-[520px]">
          <div className="absolute inset-0">
            {mounted ? (
              <Suspense fallback={null}>
                <NeuralCore />
              </Suspense>
            ) : null}
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="mx-auto mt-12 flex w-fit items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowDown className="size-4 float-soft" aria-hidden="true" />
        Scroll to explore
      </a>
    </section>
  );
}
