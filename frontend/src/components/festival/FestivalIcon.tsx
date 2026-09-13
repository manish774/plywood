import { createElement, type CSSProperties, type ReactElement } from "react";
import type { FestivalIcon as FestivalIconData, FestivalShape } from "../../themes/types";

function renderShape(shape: FestivalShape, key: string | number): ReactElement {
  if (shape.tag === "g" && shape.children) {
    return createElement(
      "g",
      { key, ...shape.attrs },
      shape.children.map((child, i) => renderShape(child, i)),
    );
  }
  return createElement(shape.tag, { key, ...shape.attrs });
}

interface FestivalIconProps {
  icon: FestivalIconData;
  className?: string;
  style?: CSSProperties;
}

// Generic renderer for one FestivalIcon's plain-data shape list — shared by
// every festival theme so icon art stays pure data (see themes/types.ts)
// instead of bespoke JSX per theme.
export default function FestivalIcon({ icon, className, style }: FestivalIconProps) {
  return (
    <svg viewBox={icon.viewBox} className={className} style={style} aria-hidden="true" focusable="false">
      {icon.shapes.map((shape, i) => renderShape(shape, i))}
    </svg>
  );
}
