import { useEffect, useState } from "react";

/** Short branded loading screen shown while fonts and scripts settle. */
export function Loader() {
  const [progress, setProgress] = useState(12);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setProgress((p) => Math.min(p + 18, 100));
    }, 130);
    const done = window.setTimeout(() => setHidden(true), 950);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(done);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p className="gradient-text font-display text-4xl font-bold">HY</p>
      <p className="mt-2 text-xs text-muted-foreground">Initializing experience…</p>
      <div className="mt-4 h-1 w-40 overflow-hidden rounded-full bg-muted">
        <div
          className="gradient-surface h-full transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
