const supabaseOrigin = (process.env["SUPABASE_URL"] ?? "").replace(/\/$/, "");

const csp = [
  "default-src 'self'",
  // Inline/eval are required by the SSR hydration payload and dev tooling.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  `connect-src 'self' ${supabaseOrigin} https://*.supabase.co wss://*.supabase.co https://api.web3forms.com`.trim(),
  "media-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Allow the Lovable editor preview to embed the site; block everyone else.
  "frame-ancestors 'self' https://lovable.app https://*.lovable.app https://*.lovable.dev",
  "upgrade-insecure-requests",
].join("; ");

export const securityHeaders: Record<string, string> = {
  "content-security-policy": csp,
  "x-content-type-options": "nosniff",
  "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "x-frame-options": "SAMEORIGIN",
};
