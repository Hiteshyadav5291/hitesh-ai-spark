import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Save, LogOut } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";

type Row = Record<string, any>;

const tabs = [
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "timeline", label: "Journey" },
] as const;

type TableKey = (typeof tabs)[number]["key"];

const blankRow: Record<TableKey, Row> = {
  projects: {
    title: "New project",
    category: "General",
    description: "",
    details: "",
    technologies: [],
    github_url: "",
    demo_url: "",
    featured: false,
    sort_order: 99,
  },
  skills: { category: "Programming", category_note: "", name: "New skill", note: "", sort_order: 99 },
  timeline: {
    period: "",
    title: "New entry",
    place: "",
    description: "",
    is_current: false,
    sort_order: 99,
  },
};

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Content manager | Hitesh Yadav" },
      { name: "description", content: "Private area for editing portfolio content." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Content manager | Hitesh Yadav" },
      { property: "og:description", content: "Private area for editing portfolio content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admin,
});

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  const shared =
    "mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm focus-visible:outline-none";
  return (
    <label className="block text-xs font-medium text-muted-foreground">
      {label}
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={shared} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={shared} />
      )}
    </label>
  );
}

function RowEditor({
  table,
  row,
  onChange,
  onSave,
  onDelete,
  saving,
}: {
  table: TableKey;
  row: Row;
  onChange: (patch: Row) => void;
  onSave: () => void;
  onDelete: () => void;
  saving: boolean;
}) {
  const set = (key: string) => (v: any) => onChange({ [key]: v });

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {table === "projects" && (
          <>
            <Field label="Title" value={row["title"] ?? ""} onChange={set("title")} />
            <Field label="Category" value={row["category"] ?? ""} onChange={set("category")} />
            <div className="sm:col-span-2">
              <Field
                label="Short description"
                value={row["description"] ?? ""}
                onChange={set("description")}
                textarea
              />
            </div>
            <div className="sm:col-span-2">
              <Field label="Full details" value={row["details"] ?? ""} onChange={set("details")} textarea />
            </div>
            <div className="sm:col-span-2">
              <Field
                label="Technologies (comma separated)"
                value={(row["technologies"] ?? []).join(", ")}
                onChange={(v) =>
                  onChange({
                    technologies: v
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
            <Field label="GitHub link" value={row["github_url"] ?? ""} onChange={set("github_url")} />
            <Field label="Demo link" value={row["demo_url"] ?? ""} onChange={set("demo_url")} />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!row["featured"]}
                onChange={(e) => onChange({ featured: e.target.checked })}
              />
              Featured
            </label>
          </>
        )}

        {table === "skills" && (
          <>
            <Field label="Category" value={row["category"] ?? ""} onChange={set("category")} />
            <Field label="Skill name" value={row["name"] ?? ""} onChange={set("name")} />
            <Field
              label="Category note"
              value={row["category_note"] ?? ""}
              onChange={set("category_note")}
            />
            <Field label="Skill note" value={row["note"] ?? ""} onChange={set("note")} />
          </>
        )}

        {table === "timeline" && (
          <>
            <Field label="Period" value={row["period"] ?? ""} onChange={set("period")} />
            <Field label="Title" value={row["title"] ?? ""} onChange={set("title")} />
            <Field label="Place" value={row["place"] ?? ""} onChange={set("place")} />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!row["is_current"]}
                onChange={(e) => onChange({ is_current: e.target.checked })}
              />
              Mark as current
            </label>
            <div className="sm:col-span-2">
              <Field
                label="Description"
                value={row["description"] ?? ""}
                onChange={set("description")}
                textarea
              />
            </div>
          </>
        )}

        <Field
          label="Display order"
          value={String(row["sort_order"] ?? 0)}
          onChange={(v) => onChange({ sort_order: Number(v) || 0 })}
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="gradient-surface inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold disabled:opacity-60"
        >
          <Save className="size-3.5" aria-hidden="true" /> Save
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-medium text-destructive hover:bg-muted"
        >
          <Trash2 className="size-3.5" aria-hidden="true" /> Delete
        </button>
      </div>
    </div>
  );
}

function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [table, setTable] = useState<TableKey>("projects");
  const [drafts, setDrafts] = useState<Record<string, Row>>({});
  const [saving, setSaving] = useState(false);

  const { data: rows = [], refetch, isLoading } = useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select("*").order("sort_order");
      if (error) throw error;
      return data as Row[];
    },
  });

  const valueOf = (row: Row) => ({ ...row, ...(drafts[row["id"]] ?? {}) });

  const patch = (id: string, p: Row) =>
    setDrafts((d) => ({ ...d, [id]: { ...(d[id] ?? {}), ...p } }));

  const refresh = async () => {
    setDrafts({});
    await refetch();
    await queryClient.invalidateQueries({ queryKey: ["portfolio-content"] });
  };

  const save = async (row: Row) => {
    setSaving(true);
    const { id, created_at, updated_at, ...payload } = valueOf(row);
    const { error } = await supabase.from(table).update(payload).eq("id", id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    await refresh();
  };

  const remove = async (row: Row) => {
    if (!window.confirm("Delete this entry?")) return;
    const { error } = await supabase.from(table).delete().eq("id", row["id"]);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    await refresh();
  };

  const add = async () => {
    const { error } = await supabase.from(table).insert(blankRow[table]);
    if (error) return toast.error(error.message);
    toast.success("Entry added — edit it below");
    await refresh();
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <main className="grid-backdrop min-h-screen px-5 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Content manager</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything you change here appears on your portfolio right away.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/"
              className="rounded-xl border border-border px-4 py-2 text-xs font-medium hover:bg-muted"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-medium hover:bg-muted"
            >
              <LogOut className="size-3.5" aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setTable(t.key);
                setDrafts({});
              }}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                table === t.key ? "gradient-surface" : "glass-panel text-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
          <button
            type="button"
            onClick={add}
            className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            <Plus className="size-4" aria-hidden="true" /> Add entry
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {!isLoading && rows.length === 0 && (
            <p className="text-sm text-muted-foreground">Nothing here yet — add your first entry.</p>
          )}
          {rows.map((row) => (
            <RowEditor
              key={row["id"]}
              table={table}
              row={valueOf(row)}
              onChange={(p) => patch(row["id"], p)}
              onSave={() => save(row)}
              onDelete={() => remove(row)}
              saving={saving}
            />
          ))}
        </div>
      </div>
      <Toaster />
    </main>
  );
}
