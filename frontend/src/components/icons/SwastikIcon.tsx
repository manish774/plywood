interface SwastikIconProps {
  className?: string;
}

// The auspicious Swastik symbol used in the "Swastik Plywood And Decor" wordmark.
// Public-domain Hindu swastik graphic (Wikimedia Commons, "HinduSwastika.svg").
export default function SwastikIcon({ className }: SwastikIconProps) {
  return (
    <img
      className={className}
      src="https://upload.wikimedia.org/wikipedia/commons/6/63/HinduSwastika.svg"
      alt="Swastik symbol"
    />
  );
}
