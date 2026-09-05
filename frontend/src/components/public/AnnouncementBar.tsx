import { useLanguage } from "../../i18n/useLanguage";

export default function AnnouncementBar() {
  const { t } = useLanguage();

  return (
    <div className="announcement-bar">
      <div className="container announcement-bar-inner">{t("nav.announcement")}</div>
    </div>
  );
}
