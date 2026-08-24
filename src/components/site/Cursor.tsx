import { useEffect, useState } from "react";

/**
 * Custom pointer: a small dot plus a lagging ring that grows over
 * interactive elements. Mouse-only, disabled for reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "bi-cursor-dot";
    ring.className = "bi-cursor-ring";
    document.body.append(dot, ring);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover']",
      );
      ring.dataset["active"] = interactive ? "true" : "false";
    };

    const loop = () => {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      dot.remove();
      ring.remove();
    };
  }, []);

  if (!enabled) return null;
  return (
    <style>{`
      @media (pointer: fine) {
        body { cursor: none; }
        a, button, [role="button"] { cursor: none; }
      }
      .bi-cursor-dot, .bi-cursor-ring {
        position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      }
      .bi-cursor-dot {
        width: 6px; height: 6px; margin: -3px 0 0 -3px; border-radius: 999px;
        background: var(--primary-glow);
      }
      .bi-cursor-ring {
        width: 34px; height: 34px; margin: -17px 0 0 -17px; border-radius: 999px;
        border: 1px solid color-mix(in oklab, var(--primary-glow) 55%, transparent);
        transition: width .3s ease, height .3s ease, margin .3s ease, background .3s ease, border-color .3s ease;
      }
      .bi-cursor-ring[data-active="true"] {
        width: 58px; height: 58px; margin: -29px 0 0 -29px;
        background: color-mix(in oklab, var(--primary) 14%, transparent);
        border-color: color-mix(in oklab, var(--primary-glow) 85%, transparent);
      }
    `}</style>
  );
}
