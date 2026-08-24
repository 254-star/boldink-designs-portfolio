import { Link } from "@tanstack/react-router";
import { logoUrl, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt=""
      aria-hidden="true"
      className={cn("h-9 w-auto select-none", className)}
      draggable={false}
    />
  );
}

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label={`${site.name} — home`}
    >
      <LogoMark className="h-9 w-auto transition-transform duration-500 group-hover:scale-105" />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-semibold tracking-[0.22em] text-foreground">
            BOLDINK
          </span>
          <span className="mt-1 text-[0.55rem] font-medium tracking-[0.42em] text-subtle-foreground">
            DESIGNS
          </span>
        </span>
      )}
    </Link>
  );
}
