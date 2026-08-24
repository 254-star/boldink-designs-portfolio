import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Studio Login — BOLDINK DESIGNS" },
      { name: "description", content: "Private studio login for BOLDINK DESIGNS administrators." },
      { property: "og:title", content: "Studio Login — BOLDINK DESIGNS" },
      { property: "og:description", content: "Private studio login for BOLDINK DESIGNS administrators." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

const fieldClass =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-3.5 text-sm text-foreground placeholder:text-subtle-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin", replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setNotice("Account created. Sign in below — an administrator must grant you admin access.");
        setMode("signin");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5 pt-36 pb-24">
      <div className="glass w-full max-w-md rounded-2xl p-8 sm:p-10">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/15">
            <Lock className="h-5 w-5 text-primary" />
          </span>
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.35em] text-subtle-foreground">
              STUDIO
            </p>
            <h1 className="font-display text-2xl font-bold text-foreground">Admin access</h1>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold tracking-[0.22em] text-subtle-foreground">
              EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
              placeholder="you@boldink.co"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold tracking-[0.22em] text-subtle-foreground">
              PASSWORD
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
              placeholder="At least 8 characters"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground">
              {error}
            </p>
          )}
          {notice && (
            <p className="rounded-xl border border-success/40 bg-success/10 px-4 py-3 text-sm text-foreground">
              {notice}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.01] disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
          }}
          className="mt-6 w-full text-center text-xs tracking-[0.18em] text-subtle-foreground transition-colors hover:text-foreground"
        >
          {mode === "signin" ? "NEED AN ACCOUNT? SIGN UP" : "ALREADY REGISTERED? SIGN IN"}
        </button>
      </div>
    </div>
  );
}
