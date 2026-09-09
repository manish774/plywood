import { FaFacebook } from "react-icons/fa";

interface FacebookIconProps {
  className?: string;
}

export default function FacebookIcon({ className }: FacebookIconProps) {
  return <FaFacebook className={className} style={{ color: "#1877F2" }} />;
}
