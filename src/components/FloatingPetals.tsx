import { useMemo } from "react";

/**
 * Decorative falling marigold petals — pure CSS, GPU-friendly, no JS animation loop.
 */
export function FloatingPetals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 10,
        size: 10 + Math.random() * 14,
        hue: Math.random() > 0.5 ? "var(--saffron)" : "var(--gold)",
        rotate: Math.random() * 360,
        key: i,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.key}
          className="absolute block rounded-full opacity-70"
          style={{
            left: `${p.left}%`,
            top: "-20px",
            width: p.size,
            height: p.size * 0.6,
            background: `radial-gradient(circle at 30% 30%, ${p.hue}, transparent 70%)`,
            transform: `rotate(${p.rotate}deg)`,
            animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
            filter: "blur(0.4px)",
          }}
        />
      ))}
    </div>
  );
}
