import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
function FloatingPetals({ count = 14 }) {
  const petals = reactExports.useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 10,
      size: 10 + Math.random() * 14,
      hue: Math.random() > 0.5 ? "var(--saffron)" : "var(--gold)",
      rotate: Math.random() * 360,
      key: i
    })),
    [count]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", "aria-hidden": true, children: petals.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "absolute block rounded-full opacity-70",
      style: {
        left: `${p.left}%`,
        top: "-20px",
        width: p.size,
        height: p.size * 0.6,
        background: `radial-gradient(circle at 30% 30%, ${p.hue}, transparent 70%)`,
        transform: `rotate(${p.rotate}deg)`,
        animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
        filter: "blur(0.4px)"
      }
    },
    p.key
  )) });
}
export {
  FloatingPetals as F
};
