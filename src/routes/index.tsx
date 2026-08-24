import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal, TextReveal, Magnetic } from "@/components/site/motion-primitives";
import { projects } from "@/data/projects";
import { processSteps, services, site, skills, testimonials } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boldink Designs | Graphic Design Studio in Kenya" },
      {
        name: "description",
        content:
          "Boldink Designs is a graphic design studio creating bold branding, posters, social media graphics, visual identities and creative designs in Kenya.",
      },
      { property: "og:title", content: "Boldink Designs | Graphic Design Studio in Kenya" },
      {
        property: "og:description",
        content:
          "Boldink Designs is a graphic design studio creating bold branding, posters, social media graphics, visual identities and creative designs in Kenya.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[0.65rem] font-semibold tracking-[0.4em] text-subtle-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1] tracking-[-0.025em] text-foreground">
        <TextReveal text={title} />
      </h2>
      {copy && <p className="mt-4 text-base leading-[1.6] text-muted-foreground">{copy}</p>}
    </div>
  );
}

function Home() {
  const featured = projects.slice(0, 6);

  return (
    <>
      <Hero />

      <section className="border-y border-border bg-surface/30 py-20" id="services">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="WHAT I DO"
            title="Services built around one idea: make it unmissable."
            copy="From a first logo sketch to a printed roll-up on an event floor — every deliverable is treated as part of one system."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal
                key={service.title}
                delay={(i % 3) * 0.06}
                className="group bg-background p-8 transition-colors duration-500 hover:bg-card"
              >
                <span className="font-display text-xs text-subtle-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">
                  {service.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="SELECTED WORK" title="Recent projects." />
            <Magnetic>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                All projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/30 py-24" id="skills">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <SectionHeading
            eyebrow="TOOLKIT"
            title="Software fluency, used with intent."
            copy="Tools don't make the work — but knowing them cold means the idea never gets compromised by the execution."
          />
          <ul className="space-y-6">
            {skills.map((skill, i) => (
              <Reveal as="li" key={skill.name} delay={i * 0.05}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{skill.name}</span>
                  <span className="text-subtle-foreground">{skill.level}%</span>
                </div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${skill.level}%`,
                      background: "var(--gradient-primary)",
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24" id="process">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading eyebrow="HOW IT WORKS" title="An eight-step process with no guesswork." />
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={(i % 4) * 0.07}>
                <div className="hairline h-px w-full" />
                <span className="mt-5 block font-display text-4xl font-bold text-primary-glow/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-surface/30 py-24" id="testimonials">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading eyebrow="CLIENT WORDS" title="What working together feels like." />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <Reveal
                key={testimonial.name}
                delay={(i % 3) * 0.07}
                className="glass rounded-2xl p-8"
              >
                <blockquote className="text-sm leading-[1.6] text-muted-foreground">
                  “{testimonial.quote}”
                </blockquote>
                <p className="mt-6 font-display text-sm font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-xs tracking-[0.16em] text-subtle-foreground">
                  {testimonial.role.toUpperCase()}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28">
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-foreground">
            <TextReveal text="Let's make something bold." />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
            Tell me about the project. I reply to every serious enquiry within one working day.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground "
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10"
            >
              <MessageCircle className="h-4 w-4 text-primary" />
              WhatsApp
            </a>
            <a
              href={`mailto:${site.email}?subject=Project%20enquiry`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {site.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
