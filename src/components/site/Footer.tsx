import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { ObfuscatedEmail, ObfuscatedPhone } from "./ObfuscatedContact";
import { navLinks, services, site, socials } from "@/data/site";


export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface/40">
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div className="min-w-0">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.tagline}
            </p>
            <a
              href={site.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              View the full Behance archive
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <nav aria-label="Footer navigation" className="min-w-0">
            <h2 className="text-xs font-semibold tracking-[0.28em] text-subtle-foreground">
              NAVIGATE
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className="text-xs font-semibold tracking-[0.28em] text-subtle-foreground">
              SERVICES
            </h2>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.title} className="text-sm text-muted-foreground">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h2 className="text-xs font-semibold tracking-[0.28em] text-subtle-foreground">
              CONTACT
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <ObfuscatedEmail className="break-all text-muted-foreground transition-colors hover:text-foreground" />
              </li>
              <li>
                <ObfuscatedPhone className="text-muted-foreground transition-colors hover:text-foreground" />
              </li>
              <li className="text-muted-foreground">{site.location}</li>
              <li>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  Send a message
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>

              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 text-xs text-subtle-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>
            Designed &amp; built by {site.owner} — {site.role}.
          </p>
        </div>
      </div>
    </footer>
  );
}
