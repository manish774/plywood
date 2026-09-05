// Pure-CSS infinite ticker (see .marquee rules in public.css). CSS animation
// (not JS) so it can be paused via :hover/:focus-within and disabled via
// prefers-reduced-motion without any extra wiring.
export default function Marquee({ items, label = "Sheet goods we stock" }: { items: string[]; label?: string }) {
  const loop = [...items, ...items];

  return (
    <div className="marquee" role="group" aria-label={label}>
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span className="marquee-item" key={`${item}-${i}`} aria-hidden={i >= items.length}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
