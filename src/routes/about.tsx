import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal, Reveal, TextReveal } from "@/components/site/motion-primitives";
import { clients, portraitUrl, processSteps, site, stats, testimonials, values } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nelson Kariuki — BOLDINK DESIGNS" },
      {
        name: "description",
        content:
          "Nelson Kariuki is the graphic designer and creative director behind BOLDINK DESIGNS, working from Kiambu, Kenya and across Nairobi — brand identity, campaigns and print.",
      },
      { property: "og:title", content: "About Nelson Kariuki — BOLDINK DESIGNS" },
      {
        property: "og:description",
        content:
          "The designer behind BOLDINK DESIGNS in Nairobi and Kiambu, Kenya: philosophy, process and values.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="pt-36 pb-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="text-[0.65rem] font-semibold tracking-[0.4em] text-subtle-foreground">
          ABOUT
        </p>
        <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.4rem,6.5vw,5rem)] font-bold leading-[0.96] tracking-[-0.03em] text-foreground">
          <TextReveal text="Bold ideas, executed with discipline." />
        </h1>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <ImageReveal className="rounded-2xl border border-border bg-card">
            <img
              src={portraitUrl}
              alt={`${site.owner}, ${site.role} at BOLDINK DESIGNS`}
              className="aspect-[4/5] w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </ImageReveal>

          <div className="min-w-0 space-y-6 text-base leading-relaxed text-muted-foreground">
            <Reveal>
              <p>
                I'm {site.owner}, a {site.role.toLowerCase()} based in {site.location}. BOLDINK
                DESIGNS started from a simple frustration: too much good work goes unnoticed because
                it looks like everything else.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                My work spans brand identity, campaign artwork, social systems, infographics, 3D
                visualisation and large-format print. Whatever the format, the approach is the same
                — understand the business, find the sharpest idea, and execute it with obsessive
                attention to type, colour and composition.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>Bold doesn't mean loud. It means a decision was made, and it was the right one.</p>
            </Reveal>
            <Reveal delay={0.19}>
              <p>
                Away from the screen I'm usually sketching type on whatever paper is nearby, chasing
                light around Nairobi with a camera, or deep in a football argument that nobody wins.
                Design, for me, started as that same habit of noticing details other people walk
                past. I work best with people who care about the small things — the kerning, the
                crop, the one word that makes a headline land.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <dl className="grid grid-cols-2 gap-6 border-t border-border pt-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl font-bold text-foreground">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-xs tracking-[0.18em] text-subtle-foreground">
                        {stat.label.toUpperCase()}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="border-t border-border pt-8">
                <p className="text-xs font-semibold tracking-[0.28em] text-subtle-foreground">
                  TRUSTED BY
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  {clients.map((client) => (
                    <li
                      key={client}
                      className="text-sm font-semibold tracking-[0.06em] text-muted-foreground/80"
                    >
                      {client}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <section className="mt-24">
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] text-foreground">
            Values
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={(i % 4) * 0.07} className="glass rounded-2xl p-7">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <Reveal className="border-y border-border py-12 sm:py-16">
            <figure className="mx-auto max-w-3xl text-center">
              <blockquote className="font-display text-[clamp(1.3rem,2.6vw,2rem)] font-semibold leading-[1.35] tracking-[-0.01em] text-foreground">
                “{testimonials[0]?.quote}”
              </blockquote>
              <figcaption className="mt-6 text-xs tracking-[0.22em] text-subtle-foreground">
                {testimonials[0]?.name.toUpperCase()} — {testimonials[0]?.role.toUpperCase()}
              </figcaption>
            </figure>
          </Reveal>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] text-foreground">
            How I work
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={(i % 4) * 0.06}>
                <span className="font-display text-3xl font-bold text-primary-glow/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <div className="mt-24 flex justify-center" aria-hidden>
          <span className="h-20 w-px bg-gradient-to-b from-transparent via-border to-primary" />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]"
          >
            Work with me <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            See the work
          </Link>
        </div>
      </div>
    </div>
  );
}
