import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { profile } from "@/data/portfolio";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section indicator driven by an IntersectionObserver.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-5">
      <nav
        aria-label="Main navigation"
        className={`glass-panel mx-auto flex max-w-5xl items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled ? "px-4 py-2" : "px-5 py-3.5"
        }`}
      >
        <a href="#home" className="font-display text-base font-bold tracking-tight">
          <span className="gradient-text">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  active === link.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <span className="gradient-surface absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resumeUrl}
            className="gradient-surface hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
          >
            <FileText className="size-4" aria-hidden="true" />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-xl border border-border p-2 text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`glass-panel mx-auto mt-2 max-w-5xl overflow-hidden rounded-2xl transition-all duration-400 md:hidden ${
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 border-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-2">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resumeUrl}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-primary"
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
