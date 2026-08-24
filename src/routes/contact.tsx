import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";
import { TextReveal } from "@/components/site/motion-primitives";
import {
  ObfuscatedEmail,
  ObfuscatedMailtoLink,
  ObfuscatedPhone,
} from "@/components/site/ObfuscatedContact";

import { site, socials } from "@/data/site";
import { Mail, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BOLDINK DESIGNS" },
      {
        name: "description",
        content:
          "Start a project with BOLDINK DESIGNS. Brand identity, campaign artwork, social, 3D and print design from Kiambu, Kenya.",
      },
      { property: "og:title", content: "Contact — BOLDINK DESIGNS" },
      {
        property: "og:description",
        content: "Tell me about your project — I reply within one working day.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="pt-36 pb-28">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-semibold tracking-[0.4em] text-subtle-foreground">
            CONTACT
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[0.96] tracking-[-0.03em] text-foreground">
            <TextReveal text="Let's build something bold." />
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Share the brief, the deadline and what success looks like. I'll come back with a clear
            plan, timeline and price.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent("Project enquiry for BOLDINK DESIGNS")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Mail className="h-4 w-4 text-primary" />
              Email directly
            </a>

            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Phone className="h-4 w-4 text-primary" />
              Call
            </a>
          </div>

          <dl className="mt-12 space-y-6 border-t border-border pt-10 text-sm">
            <div>
              <dt className="text-xs tracking-[0.24em] text-subtle-foreground">EMAIL</dt>
              <dd className="mt-2">
                <ObfuscatedEmail className="break-all text-foreground hover:text-primary-glow" />
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.24em] text-subtle-foreground">PHONE</dt>
              <dd className="mt-2">
                <ObfuscatedPhone className="text-foreground hover:text-primary-glow" />
              </dd>
            </div>

            <div>
              <dt className="text-xs tracking-[0.24em] text-subtle-foreground">BASED IN</dt>
              <dd className="mt-2 text-foreground">{site.location}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.24em] text-subtle-foreground">ELSEWHERE</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {social.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <div className="glass min-w-0 rounded-2xl p-6 sm:p-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
