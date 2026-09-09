import { FaInstagram } from "react-icons/fa";

interface InstagramIconProps {
  className?: string;
}

export default function InstagramIcon({ className }: InstagramIconProps) {
  return <FaInstagram className={className} style={{ color: "#E4405F" }} />;
}
