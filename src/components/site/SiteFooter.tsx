import { ArrowUp } from "lucide-react";
import { profile, socials } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center">
        <div>
          <p className="font-display text-lg font-bold">
            <span className="gradient-text">{profile.name}</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{profile.roles.join(" • ")}</p>
        </div>

        <ul className="flex flex-wrap justify-center gap-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="rounded-xl border border-border px-3.5 py-2 text-xs transition-colors hover:bg-muted"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 {profile.name}. All rights reserved.
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="glass-panel inline-flex size-9 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-1"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
