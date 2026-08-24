import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  projectType: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell me a little more").max(3000),
  // Honeypot — must stay empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

async function hashIp(ip: string) {
  const data = new TextEncoder().encode(`boldink:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) {
      // Bot filled the honeypot: pretend success, store nothing.
      return { ok: true as const };
    }

    const request = getRequest();
    const ip =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const ipHash = await hashIp(ip);
    const userAgent = request.headers.get("user-agent")?.slice(0, 300) ?? null;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Simple rate limit: max 3 submissions per IP per hour.
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabaseAdmin
      .from("contact_submissions")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);

    if (countError) {
      console.error("contact rate-limit check failed", countError.message);
      throw new Error("Could not send your message. Please try again.");
    }

    if ((count ?? 0) >= 3) {
      throw new Error("Too many messages sent recently. Please try again later.");
    }

    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      budget: data.budget || null,
      project_type: data.projectType || null,
      message: data.message,
      ip_hash: ipHash,
      user_agent: userAgent,
    });

    if (error) {
      console.error("contact insert failed", error.message);
      throw new Error("Could not send your message. Please try again.");
    }

    return { ok: true as const };
  });
