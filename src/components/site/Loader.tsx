import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

const SESSION_KEY = "boldink:intro-seen";

/** Brand splash shown once per session while the first paint settles. */
export function Loader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    setVisible(true);
    document.body.style.overflow = "hidden";

    const tick = window.setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + Math.random() * 18));
    }, 120);

    const done = window.setTimeout(() => {
      setProgress(100);
      setVisible(false);
      sessionStorage.setItem(SESSION_KEY, "1");
      document.body.style.overflow = "";
    }, 1500);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <div
            className="pointer-events-none absolute h-[460px] w-[460px] rounded-full opacity-50"
            style={{ background: "var(--gradient-glow)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <LogoMark className="h-24 w-auto" />
          </motion.div>
          <p className="mt-8 font-display text-[0.6rem] tracking-[0.6em] text-subtle-foreground">
            BOLDINK DESIGNS
          </p>
          <div className="mt-6 h-px w-40 overflow-hidden bg-border">
            <div
              className="h-full bg-primary-glow transition-[width] duration-200 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
