import { useId } from "react";

interface InstagramIconProps {
  className?: string;
}

export default function InstagramIcon({ className }: InstagramIconProps) {
  const gradientId = `instagram-gradient-${useId()}`;

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f9ce34" />
          <stop offset="30%" stopColor="#ee2a7b" />
          <stop offset="65%" stopColor="#bd3aa8" />
          <stop offset="100%" stopColor="#6228d7" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill={`url(#${gradientId})`} />
      <rect x="7.3" y="7.3" width="9.4" height="9.4" rx="3" fill="none" stroke="#fff" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2.7" fill="none" stroke="#fff" strokeWidth="1.4" />
      <circle cx="15.4" cy="8.6" r="0.9" fill="#fff" />
    </svg>
  );
}
