import { useState, type ChangeEvent, type FormEvent } from "react";
import { useSettings } from "../../context/SettingsContext";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";
import { WrenchLoader } from "../../components/Loaders";
import SettingsPreview from "../../components/admin/SettingsPreview";
import type { SettingsInput } from "../../types/models";

export default function Customization() {
  const { t } = useLanguage();
  const { settings, loading, update } = useSettings();
  const [form, setForm] = useState<SettingsInput>(settings);

  // Re-seed the form once the real settings arrive from the backend
  // (the context starts out with fallback values while it's loading).
  const [seededFor, setSeededFor] = useState(settings._id);
  if (settings._id !== seededFor) {
    setSeededFor(settings._id);
    setForm(settings);
  }

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSaved(false);
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await update(form);
      setSaved(true);
    } catch (err) {
      setError(getErrorMessage(err, t("common.couldNotSaveSettings")));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>{t("admin.customizationTitle")}</h1>
          <p>{t("admin.customizationDescription")}</p>
        </div>
      </div>

      {loading ? (
        <p>{t("common.loading")}</p>
      ) : (
        <div className="customization-layout">
          <form onSubmit={handleSubmit}>
            {saved && <div className="form-feedback form-feedback-success">{t("common.settingsSaved")}</div>}
            {error && <div className="form-feedback form-feedback-error">{error}</div>}

            <div className="field-row">
              <div className="field">
                <label htmlFor="set-shopName">{t("admin.shopNameLabel")}</label>
                <input id="set-shopName" name="shopName" value={form.shopName || ""} onChange={handleChange} required />
              </div>
              <div className="field">
                <label htmlFor="set-shortName">{t("admin.shortNameLabel")}</label>
                <input id="set-shortName" name="shortName" value={form.shortName || ""} onChange={handleChange} required />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="set-tagline">{t("admin.taglineLabel")}</label>
                <input id="set-tagline" name="tagline" value={form.tagline || ""} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="set-logoUrl">{t("admin.logoUrlLabel")}</label>
                <input
                  id="set-logoUrl"
                  name="logoUrl"
                  value={form.logoUrl || ""}
                  onChange={handleChange}
                  placeholder="https://..."
                />
                <small>{t("admin.logoUrlHint")}</small>
              </div>
            </div>

            <div className="field">
              <label htmlFor="set-address">{t("admin.addressLabel")}</label>
              <textarea id="set-address" name="address" rows={2} value={form.address || ""} onChange={handleChange} />
            </div>

            <div className="field">
              <label htmlFor="set-mapUrl">{t("admin.mapUrlLabel")}</label>
              <input
                id="set-mapUrl"
                name="mapUrl"
                value={form.mapUrl || ""}
                onChange={handleChange}
                placeholder="https://maps.app.goo.gl/..."
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="set-whatsappNumber">{t("admin.whatsappNumberLabel")}</label>
                <input
                  id="set-whatsappNumber"
                  name="whatsappNumber"
                  value={form.whatsappNumber || ""}
                  onChange={handleChange}
                  placeholder="919031440979"
                />
                <small>{t("admin.whatsappNumberHint")}</small>
              </div>
              <div className="field">
                <label htmlFor="set-phone">{t("admin.phoneNumberLabel")}</label>
                <input id="set-phone" name="phone" value={form.phone || ""} onChange={handleChange} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="set-hours">{t("admin.hoursLabel")}</label>
              <input id="set-hours" name="hours" value={form.hours || ""} onChange={handleChange} />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="set-ownerName">{t("admin.ownerNameLabel")}</label>
                <input id="set-ownerName" name="ownerName" value={form.ownerName || ""} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="set-ownerPhone">{t("admin.ownerPhoneLabel")}</label>
                <input id="set-ownerPhone" name="ownerPhone" value={form.ownerPhone || ""} onChange={handleChange} />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="set-instagramUrl">{t("admin.instagramUrlLabel")}</label>
                <input
                  id="set-instagramUrl"
                  name="instagramUrl"
                  value={form.instagramUrl || ""}
                  onChange={handleChange}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="field">
                <label htmlFor="set-facebookUrl">{t("admin.facebookUrlLabel")}</label>
                <input
                  id="set-facebookUrl"
                  name="facebookUrl"
                  value={form.facebookUrl || ""}
                  onChange={handleChange}
                  placeholder="https://facebook.com/..."
                />
              </div>
            </div>

            <button type="submit" className="btn btn-accent" disabled={busy}>
              {busy && <WrenchLoader />}
              {busy ? t("common.saving") : t("common.saveSettings")}
            </button>
          </form>

          <SettingsPreview form={form} />
        </div>
      )}
    </div>
  );
}
