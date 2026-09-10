import { FaMapMarkerAlt } from "react-icons/fa";

interface MapPinIconProps {
  className?: string;
}

export default function MapPinIcon({ className }: MapPinIconProps) {
  return <FaMapMarkerAlt className={className} />;
}
