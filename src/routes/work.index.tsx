import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProjectCard } from "@/components/site/ProjectCard";
import { TextReveal } from "@/components/site/motion-primitives";
import { categories, projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — BOLDINK DESIGNS Portfolio" },
      {
        name: "description",
        content:
          "Selected branding, event, social, 3D, infographic and print design projects by Nelson Kariuki of BOLDINK DESIGNS.",
      },
      { property: "og:title", content: "Work — BOLDINK DESIGNS Portfolio" },
      {
        property: "og:description",
        content: "Case studies across branding, events, social media, 3D, infographics and print.",
      },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  const [active, setActive] = useState<string>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="pt-36 pb-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="text-[0.65rem] font-semibold tracking-[0.4em] text-subtle-foreground">
          PORTFOLIO
        </p>
        <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-foreground">
          <TextReveal text="Selected work." />
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted-foreground">
          {projects.length} projects across branding, events, social, 3D, infographics and print.
        </p>

        <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              onClick={() => setActive(category)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
                active === category
                  ? "border-primary/50 bg-primary/15 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <h2 className="sr-only">Selected projects</h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} priority={i < 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
