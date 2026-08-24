import { useState, type FormEvent } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { contactMessageSchema } from "@/lib/contact-messages.functions";
import { projectTypes } from "@/data/site";

const fieldClass =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-3.5 text-sm text-foreground placeholder:text-subtle-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40";

const labelClass = "mb-2 block text-xs font-semibold tracking-[0.22em] text-subtle-foreground";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (done) {
    return (
      <div className="rounded-2xl border border-success/40 bg-success/10 p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/20">
          <Check className="h-6 w-6 text-success" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
          Message received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Thanks for reaching out — I'll get back to you within one working day.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;

        const form = new FormData(event.currentTarget);
        const values = Object.fromEntries(
          Array.from(form.entries()).map(([k, v]) => [k, String(v)]),
        ) as Record<string, string>;

        const parsed = contactMessageSchema.safeParse(values);
        if (!parsed.success) {
          const next: Record<string, string> = {};
          for (const issue of parsed.error.issues) {
            const key = String(issue.path[0]);
            if (!next[key]) next[key] = issue.message;
          }
          setErrors(next);
          return;
        }

        setErrors({});
        setSubmitError(null);
        setIsSubmitting(true);

        try {
          const accessKey = import.meta.env["VITE_WEB3FORMS_ACCESS_KEY"];
          if (!accessKey) {
            throw new Error("Contact form is not configured yet. Please email directly instead.");
          }

          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              access_key: accessKey,
              subject: values["subject"],
              from_name: values["name"],
              replyto: values["email"],
              ...values,
            }),
          });
          const result = (await response.json()) as { success?: boolean; message?: string };

          if (!response.ok || !result.success) {
            throw new Error(result.message || "Could not send your message. Please try again.");
          }

          setDone(true);
        } catch (error) {
          setSubmitError(
            error instanceof Error
              ? error.message
              : "Could not send your message. Please try again.",
          );
        } finally {
          setIsSubmitting(false);
        }
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="NAME *" name="name" error={errors["name"]}>
          <input
            name="name"
            required
            maxLength={100}
            className={fieldClass}
            placeholder="Your full name"
          />
        </Field>
        <Field label="EMAIL *" name="email" error={errors["email"]}>
          <input
            name="email"
            type="email"
            required
            maxLength={255}
            className={fieldClass}
            placeholder="you@company.com"
          />
        </Field>
        <Field label="PHONE" name="phone" error={errors["phone"]}>
          <input name="phone" maxLength={40} className={fieldClass} placeholder="Optional" />
        </Field>
        <Field label="SUBJECT" name="subject" error={errors["subject"]}>
          <select name="subject" className={fieldClass} defaultValue="">
            <option value="">Select a service</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="PROJECT DETAILS *" name="message" error={errors["message"]}>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={3000}
          className={fieldClass}
          placeholder="What are you building, and what does success look like?"
        />
      </Field>

      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {submitError && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground"
        >
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  name?: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label className="block">
        <span className={labelClass}>{label}</span>
        {children}
      </label>
      {error && (
        <p className="mt-2 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
