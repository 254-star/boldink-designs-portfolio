import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export const projectSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(140),
  description: z.string().trim().max(2000).default(""),
  category: z.string().trim().min(1, "Category is required").max(80),
  imageUrl: z.string().trim().max(600).default(""),
  projectUrl: z.string().trim().max(600).optional().or(z.literal("")),
  sortOrder: z.number().int().min(0).max(9999).default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export type ProjectRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  project_url: string | null;
  sort_order: number;
  created_at: string;
};

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

/** Public: anyone can read the published project list. */
export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("projects")
    .select("id, title, description, category, image_url, project_url, sort_order, created_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("listProjects failed", error.message);
    return [] as ProjectRow[];
  }
  return (data ?? []) as ProjectRow[];
});

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden: admin access required");
}

/** Admin: is the signed-in user an administrator? */
export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data), userId: context.userId };
  });

export const createProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => projectSchema.parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("projects").insert({
      title: data.title,
      description: data.description,
      category: data.category,
      image_url: data.imageUrl,
      project_url: data.projectUrl || null,
      sort_order: data.sortOrder,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const updateProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    projectSchema.extend({ id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("projects")
      .update({
        title: data.title,
        description: data.description,
        category: data.category,
        image_url: data.imageUrl,
        project_url: data.projectUrl || null,
        sort_order: data.sortOrder,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("projects").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/** Admin: upload an image (base64) into the private bucket, return its public URL. */
export const uploadProjectImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        fileName: z.string().trim().min(1).max(160),
        contentType: z.string().trim().regex(/^image\/(jpeg|png|webp|gif|avif)$/, "Images only"),
        base64: z.string().min(1).max(12_000_000),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);

    const binary = Uint8Array.from(atob(data.base64), (c) => c.charCodeAt(0));
    if (binary.byteLength > 8 * 1024 * 1024) throw new Error("Image must be under 8MB");

    const safe = data.fileName.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-80);
    const key = `uploads/${crypto.randomUUID()}-${safe}`;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage
      .from("website-images")
      .upload(key, binary, { contentType: data.contentType, upsert: false });

    if (error) throw new Error(error.message);
    return { url: `/api/public/img/${key}` };
  });
