import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  index = 0,
  priority = false,
}: {
  project: Project;
  index?: number;
  priority?: boolean;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className="block focus-visible:outline-none"
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className={cn("overflow-hidden", "aspect-[4/3]")}>
            <img
              src={project.cover}
              alt={`${project.title} — ${project.category} project cover`}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(to top, color-mix(in oklab, var(--background) 88%, transparent) 0%, transparent 55%)",
            }}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm">
              View case study
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="mt-1 text-xs tracking-[0.16em] text-subtle-foreground">
              {project.category.toUpperCase()} · {project.year}
            </p>
          </div>
          <span className="mt-1 shrink-0 text-xs text-subtle-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
