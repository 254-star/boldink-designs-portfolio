import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, LogOut, Mail, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  checkIsAdmin,
  createProject,
  deleteProject,
  listProjects,
  updateProject,
  uploadProjectImage,
  type ProjectRow,
} from "@/lib/projects.functions";
import {
  deleteContactMessage,
  listContactMessages,
  markMessageRead,
} from "@/lib/contact-messages.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — BOLDINK DESIGNS" },
      { name: "description", content: "Manage BOLDINK DESIGNS projects and contact messages." },
      { property: "og:title", content: "Admin Dashboard — BOLDINK DESIGNS" },
      { property: "og:description", content: "Manage BOLDINK DESIGNS projects and contact messages." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

const fieldClass =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-subtle-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40";
const labelClass = "mb-2 block text-xs font-semibold tracking-[0.22em] text-subtle-foreground";

type Draft = {
  id?: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  projectUrl: string;
  sortOrder: number;
};

const emptyDraft: Draft = {
  title: "",
  description: "",
  category: "Brand Identity",
  imageUrl: "",
  projectUrl: "",
  sortOrder: 0,
};

function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"projects" | "messages">("projects");

  const isAdminFn = useServerFn(checkIsAdmin);
  const adminQuery = useQuery({ queryKey: ["is-admin"], queryFn: () => isAdminFn({}) });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.4em] text-subtle-foreground">
              STUDIO CONTROL
            </p>
            <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-[-0.03em] text-foreground">
              Admin dashboard
            </h1>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold tracking-[0.18em] text-foreground transition-colors hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" /> SIGN OUT
          </button>
        </div>

        {adminQuery.isLoading && (
          <p className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Checking access…
          </p>
        )}

        {adminQuery.data && !adminQuery.data.isAdmin && (
          <div className="mt-10 rounded-2xl border border-destructive/40 bg-destructive/10 p-8">
            <h2 className="font-display text-xl font-semibold text-foreground">
              This account is not an administrator
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Your sign-in worked, but no admin role is attached to it yet. Ask me to grant admin
              access to <span className="text-foreground">{adminQuery.data.userId}</span> and this
              dashboard will unlock.
            </p>
          </div>
        )}

        {adminQuery.data?.isAdmin && (
          <>
            <div className="mt-8 flex gap-2">
              {(["projects", "messages"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-[0.18em] transition-colors ${
                    tab === key
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {key === "projects" ? "PROJECTS" : "MESSAGES"}
                </button>
              ))}
            </div>

            <div className="mt-10">
              {tab === "projects" ? <ProjectsPanel /> : <MessagesPanel />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ProjectsPanel() {
  const queryClient = useQueryClient();
  const list = useServerFn(listProjects);
  const create = useServerFn(createProject);
  const update = useServerFn(updateProject);
  const remove = useServerFn(deleteProject);
  const upload = useServerFn(uploadProjectImage);

  const [draft, setDraft] = useState<Draft | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const projects = useQuery({ queryKey: ["projects"], queryFn: () => list({}) });

  const save = useMutation({
    mutationFn: async (value: Draft) => {
      const payload = {
        title: value.title,
        description: value.description,
        category: value.category,
        imageUrl: value.imageUrl,
        projectUrl: value.projectUrl,
        sortOrder: Number(value.sortOrder) || 0,
      };
      return value.id
        ? update({ data: { ...payload, id: value.id } })
        : create({ data: payload });
    },
    onSuccess: () => {
      setDraft(null);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => setError(err instanceof Error ? err.message : "Save failed"),
  });

  const del = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  async function onPickFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const buffer = new Uint8Array(await file.arrayBuffer());
      let binary = "";
      for (const byte of buffer) binary += String.fromCharCode(byte);
      const result = await upload({
        data: {
          fileName: file.name,
          contentType: file.type,
          base64: btoa(binary),
        },
      });
      setDraft((d) => (d ? { ...d, imageUrl: result.url } : d));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Projects ({projects.data?.length ?? 0})
        </h2>
        <button
          onClick={() => setDraft({ ...emptyDraft })}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold tracking-[0.18em] text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> NEW PROJECT
        </button>
      </div>

      {draft && (
        <div className="glass mb-10 rounded-2xl p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {draft.id ? "Edit project" : "New project"}
            </h3>
            <button onClick={() => setDraft(null)} aria-label="Close editor">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>TITLE *</label>
              <input
                className={fieldClass}
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>CATEGORY *</label>
              <input
                className={fieldClass}
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>PROJECT URL</label>
              <input
                className={fieldClass}
                value={draft.projectUrl}
                onChange={(e) => setDraft({ ...draft, projectUrl: e.target.value })}
                placeholder="https://…"
              />
            </div>
            <div>
              <label className={labelClass}>SORT ORDER</label>
              <input
                type="number"
                className={fieldClass}
                value={draft.sortOrder}
                onChange={(e) => setDraft({ ...draft, sortOrder: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="mt-5">
            <label className={labelClass}>DESCRIPTION</label>
            <textarea
              rows={4}
              className={fieldClass}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            />
          </div>

          <div className="mt-5">
            <label className={labelClass}>IMAGE</label>
            <div className="flex flex-wrap items-center gap-4">
              {draft.imageUrl && (
                <img
                  src={draft.imageUrl}
                  alt="Selected project cover"
                  className="h-20 w-28 rounded-lg object-cover"
                />
              )}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold tracking-[0.18em] text-foreground hover:bg-secondary">
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                UPLOAD IMAGE
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void onPickFile(file);
                  }}
                />
              </label>
              <input
                className={`${fieldClass} flex-1 min-w-[200px]`}
                value={draft.imageUrl}
                onChange={(e) => setDraft({ ...draft, imageUrl: e.target.value })}
                placeholder="or paste an image URL"
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-5 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground">
              {error}
            </p>
          )}

          <button
            onClick={() => save.mutate(draft)}
            disabled={save.isPending}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {draft.id ? "Save changes" : "Create project"}
          </button>
        </div>
      )}

      {projects.isLoading && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading projects…
        </p>
      )}

      {projects.data?.length === 0 && !projects.isLoading && (
        <p className="rounded-2xl border border-border p-8 text-sm text-muted-foreground">
          No projects yet. Add your first one above.
        </p>
      )}

      <div className="grid gap-4">
        {projects.data?.map((project: ProjectRow) => (
          <div
            key={project.id}
            className="flex flex-wrap items-center gap-5 rounded-2xl border border-border p-4"
          >
            {project.image_url ? (
              <img
                src={project.image_url}
                alt={project.title}
                loading="lazy"
                className="h-16 w-24 rounded-lg object-cover"
              />
            ) : (
              <div className="h-16 w-24 rounded-lg bg-secondary" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-foreground">{project.title}</p>
              <p className="text-xs tracking-[0.18em] text-subtle-foreground">
                {project.category.toUpperCase()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setDraft({
                    id: project.id,
                    title: project.title,
                    description: project.description,
                    category: project.category,
                    imageUrl: project.image_url,
                    projectUrl: project.project_url ?? "",
                    sortOrder: project.sort_order,
                  })
                }
                className="rounded-full border border-border p-2.5 text-muted-foreground hover:text-foreground"
                aria-label={`Edit ${project.title}`}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${project.title}"?`)) del.mutate(project.id);
                }}
                className="rounded-full border border-destructive/40 p-2.5 text-destructive hover:bg-destructive/10"
                aria-label={`Delete ${project.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesPanel() {
  const queryClient = useQueryClient();
  const list = useServerFn(listContactMessages);
  const markRead = useServerFn(markMessageRead);
  const remove = useServerFn(deleteContactMessage);

  const messages = useQuery({ queryKey: ["contact-messages"], queryFn: () => list({}) });

  const toggle = useMutation({
    mutationFn: (vars: { id: string; isRead: boolean }) => markRead({ data: vars }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact-messages"] }),
  });
  const del = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact-messages"] }),
  });

  if (messages.isLoading) {
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading inbox…
      </p>
    );
  }

  if (!messages.data?.length) {
    return (
      <p className="rounded-2xl border border-border p-8 text-sm text-muted-foreground">
        No messages yet. Enquiries from the contact form will appear here.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {messages.data.map((m) => (
        <article
          key={m.id}
          className={`rounded-2xl border p-6 ${m.is_read ? "border-border" : "border-primary/40 bg-primary/5"}`}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-semibold text-foreground">{m.name}</p>
              <p className="text-sm text-muted-foreground">
                <a href={`mailto:${m.email}`} className="hover:text-primary">
                  {m.email}
                </a>
                {m.phone ? ` · ${m.phone}` : ""}
              </p>
              {m.subject && (
                <p className="mt-1 text-xs tracking-[0.18em] text-subtle-foreground">
                  {m.subject.toUpperCase()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-subtle-foreground">
                {new Date(m.created_at).toLocaleDateString()}
              </span>
              <button
                onClick={() => toggle.mutate({ id: m.id, isRead: !m.is_read })}
                className="rounded-full border border-border p-2.5 text-muted-foreground hover:text-foreground"
                aria-label={m.is_read ? "Mark as unread" : "Mark as read"}
              >
                <Mail className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm("Delete this message?")) del.mutate(m.id);
                }}
                className="rounded-full border border-destructive/40 p-2.5 text-destructive hover:bg-destructive/10"
                aria-label="Delete message"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
            {m.message}
          </p>
        </article>
      ))}
    </div>
  );
}
