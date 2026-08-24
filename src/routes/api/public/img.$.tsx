import { createFileRoute } from "@tanstack/react-router";

/**
 * Public read-only proxy for the private `website-images` storage bucket.
 * Keeps the bucket locked down while giving images stable, cacheable URLs.
 */
export const Route = createFileRoute("/api/public/img/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const key = decodeURIComponent(String((params as { _splat?: string })._splat ?? ""));

        if (!key || key.includes("..")) {
          return new Response("Not found", { status: 404 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage
          .from("website-images")
          .download(key);

        if (error || !data) {
          return new Response("Not found", { status: 404 });
        }

        return new Response(data, {
          headers: {
            "content-type": data.type || "image/jpeg",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
