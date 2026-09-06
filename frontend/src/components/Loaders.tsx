import GearIcon from "./icons/GearIcon";
import WrenchIcon from "./icons/WrenchIcon";

interface GearLoaderProps {
  label?: string;
}

// Full-page / section loading state: two meshing gears turning in
// opposite directions, used wherever LoadingBlock shows up.
export function GearLoader({ label }: GearLoaderProps) {
  return (
    <div className="gear-loader" role="status" aria-label={label}>
      <GearIcon className="gear-loader-icon gear-loader-icon-lg" />
      <GearIcon className="gear-loader-icon gear-loader-icon-sm" />
    </div>
  );
}

// Inline busy indicator for buttons (save/send/login/etc.) — a wrench
// turning back and forth like it's tightening a screw.
export function WrenchLoader() {
  return (
    <span className="wrench-loader" role="status" aria-hidden="true">
      <WrenchIcon className="wrench-loader-icon" />
    </span>
  );
}
