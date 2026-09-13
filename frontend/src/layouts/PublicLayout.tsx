import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AnnouncementBar from "../components/public/AnnouncementBar";
import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";
import ScrollProgress from "../components/public/ScrollProgress";
import FestivalBackground from "../components/festival/FestivalBackground";
import FestivalBanner from "../components/festival/FestivalBanner";
import { useFestivalTheme } from "../components/festival/useFestivalTheme";
import "../styles/public.css";

export default function PublicLayout() {
  const location = useLocation();
  const { theme: festivalTheme, style: festivalStyle } = useFestivalTheme();

  return (
    <div className="public-shell" data-festival={festivalTheme?.id} style={festivalStyle}>
      {festivalTheme && <FestivalBackground theme={festivalTheme} variant="ambient" />}
      <ScrollProgress />
      <AnnouncementBar />
      {festivalTheme && <FestivalBanner theme={festivalTheme} />}
      <Navbar />
      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
