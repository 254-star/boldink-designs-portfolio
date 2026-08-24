import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal, Reveal, TextReveal } from "@/components/site/motion-primitives";
import { getNextProject, getProject, type Project } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: getNextProject(params.slug) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — BOLDINK DESIGNS" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — BOLDINK DESIGNS` },
        { name: "description", content: project.overview.slice(0, 155) },
        { property: "og:title", content: `${project.title} — BOLDINK DESIGNS` },
        { property: "og:description", content: project.overview.slice(0, 155) },
        { property: "og:type", content: "article" },
        { property: "og:image", content: project.cover },
        { name: "twitter:image", content: project.cover },
      ],
      links: [{ rel: "canonical", href: `/work/${params.slug}` }],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project, next } = Route.useLoaderData() as { project: Project; next: Project };

  return (
    <article className="pt-36 pb-28">
      <header className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="text-[0.65rem] font-semibold tracking-[0.4em] text-subtle-foreground">
          {project.category.toUpperCase()} · {project.year}
        </p>
        <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[0.96] tracking-[-0.03em] text-foreground">
          <TextReveal text={project.title} />
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {project.overview}
        </p>

        <dl className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0">
            <dt className="text-xs tracking-[0.24em] text-subtle-foreground">TOOLS</dt>
            <dd className="mt-3 text-sm text-foreground">{project.tools.join(", ")}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-xs tracking-[0.24em] text-subtle-foreground">TYPOGRAPHY</dt>
            <dd className="mt-3 text-sm text-foreground">{project.typography}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-xs tracking-[0.24em] text-subtle-foreground">PALETTE</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {project.palette.map((color) => (
                <span
                  key={color}
                  className="h-7 w-7 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-xs tracking-[0.24em] text-subtle-foreground">SOURCE</dt>
            <dd className="mt-3">
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary-glow hover:underline"
              >
                View on Behance <ArrowUpRight className="h-4 w-4" />
              </a>
            </dd>
          </div>
        </dl>
      </header>

      <section className="mx-auto mt-16 max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-foreground">Goals</h2>
            <ul className="mt-5 space-y-3">
              {project.goals.map((goal) => (
                <li key={goal} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-glow" />
                  {goal}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-semibold text-foreground">Process</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{project.process}</p>
            <h2 className="mt-10 font-display text-2xl font-semibold text-foreground">Results</h2>
            <ul className="mt-5 space-y-3">
              {project.results.map((result) => (
                <li
                  key={result}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                  {result}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1400px] space-y-6 px-5 sm:px-8">
        {project.images.map((image, i) => (
          <ImageReveal key={image} className="rounded-2xl border border-border bg-card">
            <img
              src={image}
              alt={`${project.title} — design detail ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full object-cover"
            />
          </ImageReveal>
        ))}
      </section>

      <nav className="mx-auto mt-24 max-w-[1400px] border-t border-border px-5 pt-10 sm:px-8">
        <p className="text-xs tracking-[0.3em] text-subtle-foreground">NEXT PROJECT</p>
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group mt-4 flex flex-wrap items-center justify-between gap-4"
        >
          <span className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold leading-tight text-foreground transition-colors group-hover:text-primary-glow">
            {next.title}
          </span>
          <ArrowUpRight className="h-8 w-8 shrink-0 text-primary-glow transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </nav>
    </article>
  );
}
