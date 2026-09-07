import { useLanguage } from "../../i18n/useLanguage";
import SwastikIcon from "../icons/SwastikIcon";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import InstagramIcon from "../icons/InstagramIcon";
import FacebookIcon from "../icons/FacebookIcon";
import type { SettingsInput } from "../../types/models";

interface SettingsPreviewProps {
  form: SettingsInput;
}

// Live mock-up of how the edited settings will render across the site —
// updates on every keystroke from the Customization form's draft state.
export default function SettingsPreview({ form }: SettingsPreviewProps) {
  const { t } = useLanguage();

  return (
    <div className="settings-preview">
      <p className="settings-preview-label">{t("admin.previewLabel")}</p>
      <div className="settings-preview-card">
        <div className="settings-preview-header">
          <div className="navbar-logo navbar-logo-dark">
            {form.logoUrl ? (
              <img src={form.logoUrl} alt="" className="navbar-logo-mark" />
            ) : (
              <SwastikIcon className="navbar-logo-mark" />
            )}
            {form.shortName || "—"}
            <span className="navbar-logo-sub">{form.tagline || ""}</span>
          </div>
        </div>

        <div className="settings-preview-body">
          <h3>{form.shopName || "—"}</h3>

          <div className="settings-preview-row">
            <span className="settings-preview-icon" aria-hidden="true">
              📍
            </span>
            <span>{form.address || "—"}</span>
          </div>
          <div className="settings-preview-row">
            <span className="settings-preview-icon" aria-hidden="true">
              🕒
            </span>
            <span>{form.hours || "—"}</span>
          </div>
          <div className="settings-preview-row">
            <span className="settings-preview-icon" aria-hidden="true">
              📞
            </span>
            <span>{form.phone || "—"}</span>
          </div>
          {(form.ownerName || form.ownerPhone) && (
            <div className="settings-preview-row">
              <span className="settings-preview-icon" aria-hidden="true">
                👤
              </span>
              <span>
                {form.ownerName || "—"}
                {form.ownerPhone ? ` · ${form.ownerPhone}` : ""}
              </span>
            </div>
          )}

          <a className="btn btn-whatsapp btn-sm settings-preview-whatsapp" onClick={(e) => e.preventDefault()} href="#">
            <WhatsAppIcon />
            {t("common.askOnWhatsapp")}
          </a>

          {(form.instagramUrl || form.facebookUrl) && (
            <div className="settings-preview-social">
              {form.instagramUrl && <InstagramIcon className="settings-preview-social-icon" />}
              {form.facebookUrl && <FacebookIcon className="settings-preview-social-icon" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
