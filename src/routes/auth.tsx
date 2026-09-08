import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";

const title = "Owner sign in | Hitesh Yadav";
const description = "Private sign-in page for managing the portfolio content.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin", replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (data.session) {
          navigate({ to: "/admin", replace: true });
        } else {
          toast.success("Account created — check your email to confirm it, then sign in.");
          setMode("signin");
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid-backdrop flex min-h-screen items-center justify-center px-5 py-16">
      <div className="glass-panel w-full max-w-md rounded-3xl p-8">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to portfolio
        </Link>
        <h1 className="mt-6 text-2xl font-bold">
          {mode === "signin" ? "Owner sign in" : "Create owner account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to edit your projects, skills and journey.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="gradient-surface w-full rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 text-sm text-primary hover:underline"
        >
          {mode === "signin"
            ? "First time? Create your owner account"
            : "Already have an account? Sign in"}
        </button>
      </div>
      <Toaster />
    </main>
  );
}
