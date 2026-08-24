import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";

// Contact details are assembled in the browser from encoded parts so that
// plain-text addresses are never present in the served HTML for scrapers.
const EMAIL_B64 = "a2FyaXVraW5lbHNvbjgwQGdtYWlsLmNvbQ==";
const PHONE_B64 = "MDc5MSA3MzUgMzcy";
const PHONE_HREF_B64 = "dGVsOisyNTQ3OTE3MzUzNzI=";

function decode(value: string) {
  if (typeof window === "undefined") return "";
  try {
    return window.atob(value);
  } catch {
    return "";
  }
}

export function ObfuscatedEmail({ className }: { className?: string }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(decode(EMAIL_B64));
  }, []);

  if (!email) {
    return (
      <span className={className}>
        <Mail className="mr-2 inline h-3.5 w-3.5" aria-hidden />
        Email (loading)
      </span>
    );
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}

/** Renders arbitrary children inside a mailto link assembled in the browser. */
export function ObfuscatedMailtoLink({
  className,
  subject,
  children,
}: {
  className?: string;
  subject?: string;
  children: React.ReactNode;
}) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(decode(EMAIL_B64));
  }, []);

  const href = email
    ? `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`
    : undefined;

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (!href) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

export function ObfuscatedPhone({ className }: { className?: string }) {

  const [phone, setPhone] = useState("");
  const [href, setHref] = useState("");

  useEffect(() => {
    setPhone(decode(PHONE_B64));
    setHref(decode(PHONE_HREF_B64));
  }, []);

  if (!phone) {
    return (
      <span className={className}>
        <Phone className="mr-2 inline h-3.5 w-3.5" aria-hidden />
        Phone (loading)
      </span>
    );
  }

  return (
    <a href={href} className={className}>
      {phone}
    </a>
  );
}
