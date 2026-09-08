import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { profile, socials } from "@/data/portfolio";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (values.subject.trim().length < 3) next.subject = "Add a short subject.";
    if (values.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Frontend-only: open the visitor's mail client with the message prefilled.
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${body}`;
    setSent(true);
    toast.success("Opening your email app with the message ready to send.");
  };

  const field =
    "mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

  return (
    <section id="contact" className="aurora relative scroll-mt-28 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal text-center">
          <p className="font-display text-sm font-semibold text-primary">05 — Contact</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Let's Build Something Amazing</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Have an idea, project, collaboration or opportunity? I'd love to connect.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal space-y-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass-panel lift-on-hover flex items-center justify-between rounded-2xl px-5 py-4"
              >
                <span className="text-sm font-medium">{s.label}</span>
                <span className="max-w-[55%] truncate text-xs text-muted-foreground">
                  {s.handle}
                </span>
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              className="gradient-surface flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-semibold"
            >
              <Mail className="size-4" aria-hidden="true" /> Download Resume
            </a>
          </div>

          <form onSubmit={onSubmit} noValidate className="reveal glass-panel rounded-3xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  className={field}
                  value={values.name}
                  aria-invalid={Boolean(errors.name)}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={field}
                  value={values.email}
                  aria-invalid={Boolean(errors.email)}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <input
                id="subject"
                className={field}
                value={values.subject}
                aria-invalid={Boolean(errors.subject)}
                onChange={(e) => setValues({ ...values, subject: e.target.value })}
                placeholder="What's this about?"
              />
              {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className={field}
                value={values.message}
                aria-invalid={Boolean(errors.message)}
                onChange={(e) => setValues({ ...values, message: e.target.value })}
                placeholder="Tell me a little about it…"
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="gradient-surface mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:scale-[1.01]"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="size-4" aria-hidden="true" /> Message ready
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden="true" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
