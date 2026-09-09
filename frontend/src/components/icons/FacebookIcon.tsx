interface FacebookIconProps {
  className?: string;
}

export default function FacebookIcon({ className }: FacebookIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.25-1.5 1.5-1.5H16.6V4.32c-.26-.036-1.15-.12-2.19-.12-2.17 0-3.66 1.325-3.66 3.76V10.5H8v3h2.75V21h2.75z"
      />
    </svg>
  );
}
