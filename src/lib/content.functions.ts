import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

export type ProjectRow = {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  technologies: string[];
  github_url: string;
  demo_url: string;
  featured: boolean;
  sort_order: number;
};

export type SkillRow = {
  id: string;
  category: string;
  category_note: string;
  name: string;
  note: string;
  sort_order: number;
};

export type TimelineRow = {
  id: string;
  period: string;
  title: string;
  place: string;
  description: string;
  is_current: boolean;
  sort_order: number;
};

export type PortfolioContent = {
  projects: ProjectRow[];
  skills: SkillRow[];
  timeline: TimelineRow[];
};

/** Public, read-only content used to render the portfolio (safe during SSR). */
export const getPortfolioContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<PortfolioContent> => {
    const url = process.env["SUPABASE_URL"]!;
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;

    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const [projects, skills, timeline] = await Promise.all([
      supabase.from("projects").select("*").order("sort_order"),
      supabase.from("skills").select("*").order("sort_order"),
      supabase.from("timeline").select("*").order("sort_order"),
    ]);

    return {
      projects: (projects.data ?? []) as ProjectRow[],
      skills: (skills.data ?? []) as SkillRow[],
      timeline: (timeline.data ?? []) as TimelineRow[],
    };
  },
);
