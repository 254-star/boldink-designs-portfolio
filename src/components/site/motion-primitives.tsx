import { motion, useReducedMotion, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Fade + rise on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section";
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  const anim = reduced
    ? {}
    : { initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 } };

  return (
    <Comp
      className={className}
      {...anim}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: easeOut }}
    >
      {children}
    </Comp>
  );
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.055, ease: easeOut },
  }),
};

/** Word-by-word headline reveal. Renders plain text when motion is reduced. */
export function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span className={cn("inline-flex flex-wrap leading-[inherit]", className)}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden pr-[0.26em] pb-[0.12em] -mb-[0.12em] leading-[inherit]">
          <motion.span
            className="inline-block"
            custom={i + delay * 10}
            variants={wordVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Clip-path image reveal with a slow scale settle. */
export function ImageReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const anim = reduced
    ? {}
    : {
        initial: { clipPath: "inset(12% 12% 12% 12% round 18px)", opacity: 0 },
        whileInView: { clipPath: "inset(0% 0% 0% 0% round 18px)", opacity: 1 },
      };
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      {...anim}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

/** Cursor-magnetic wrapper for buttons and links. */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
        const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
      }}
      style={{ transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)" }}
    >
      {children}
    </motion.span>
  );
}

export { easeOut };
