import { motion, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, MessageCircle } from "lucide-react";
import { Magnetic, TextReveal } from "./motion-primitives";
import { site, stats, portraitHeroUrl } from "@/data/site";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-32 pb-16">
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="min-w-0">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 text-[0.65rem] font-semibold tracking-[0.32em] text-subtle-foreground"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              AVAILABLE FOR FREELANCE — {site.location.toUpperCase()}
            </motion.p>

            <h1 className="mt-6 max-w-[15ch] font-display text-[clamp(2.5rem,7.5vw,6rem)] font-bold leading-[0.95] tracking-[-0.035em] text-foreground">
              <TextReveal text="Designing bold" />
              <span className="block text-primary">
                <TextReveal text="experiences" delay={0.15} />
              </span>
              <TextReveal text="that last." delay={0.28} />
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 max-w-xl text-base leading-[1.6] text-muted-foreground"
            >
              I'm {site.owner} — a {site.role.toLowerCase()} with 500+ delivered projects,
              building identities, campaign artwork and design systems for brands that refuse
              to blend in.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
                >
                  View my work
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10"
              >
                <MessageCircle className="h-4 w-4 text-primary" />
                WhatsApp me
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Let's talk
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="relative min-w-0"
          >
            <img
              src={portraitHeroUrl}
              alt={`${site.owner}, ${site.role} at ${site.name}`}
              className="aspect-[4/5] w-full rounded-xl border border-border object-cover object-top"
              loading="eager"
              decoding="async"
            />
            <div className="absolute bottom-4 left-4 rounded-lg bg-background/85 px-4 py-3 backdrop-blur">
              <p className="font-display text-sm font-semibold text-foreground">{site.owner}</p>
              <p className="mt-0.5 text-[0.65rem] tracking-[0.18em] text-primary">
                {site.name}
              </p>
            </div>
          </motion.div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-0">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-bold text-foreground sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-xs tracking-[0.16em] text-subtle-foreground">
                  {stat.label.toUpperCase()}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 flex items-center gap-3 text-xs tracking-[0.26em] text-subtle-foreground">
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
          SCROLL
        </div>
      </div>
    </section>
  );
}
