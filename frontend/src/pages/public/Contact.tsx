import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { submitContact } from "../../api/contact";
import Seo from "../../components/Seo";
import Parallax from "../../components/public/Parallax";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";
import { useUserAuth } from "../../context/UserAuthContext";
import { useSettings } from "../../context/SettingsContext";
import { WrenchLoader } from "../../components/Loaders";

const emptyForm = { name: "", email: "", phone: "", message: "", itemName: "", itemId: "" };

type ContactStatus = "idle" | "busy" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const { settings } = useSettings();
  const { user } = useUserAuth();
  const location = useLocation();
  const incomingItem = location.state as { itemName?: string; itemId?: string } | null;
  const [showItemField, setShowItemField] = useState(Boolean(incomingItem?.itemName));

  useEffect(() => {
    if (user) {
      setForm((f) => ({ ...f, name: f.name || user.name, email: f.email || user.email, phone: f.phone || user.phone }));
    }
  }, [user]);

  useEffect(() => {
    if (incomingItem?.itemName) {
      setForm((f) => ({ ...f, itemName: incomingItem.itemName || "", itemId: incomingItem.itemId || "" }));
      setShowItemField(true);
    }
  }, [incomingItem]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("busy");
    setError("");
    try {
      await submitContact(form);
      setStatus("success");
      setForm(emptyForm);
      setShowItemField(false);
    } catch (err) {
      setStatus("error");
      setError(getErrorMessage(err, t("common.couldNotSendMessage")));
    }
  };

  return (
    <div>
      <Seo
        title={t("seo.contactTitle", { shopName: settings.shopName })}
        description={t("seo.contactDescription", { shopName: settings.shopName })}
        path="/contact"
      />

      <div className="page-header">
        <Parallax range={40} className="grain-overlay" />
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
        >
          <h1>{t("contact.pageTitle")}</h1>
          <p>{t("contact.pageDescription")}</p>
        </motion.div>
      </div>

      <div className="container section">
        <div className="contact-layout">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <h2>{settings.shopName}</h2>
            <p>{t("contact.companyCopy")}</p>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <span>{t("contact.yardAddressLabel")}</span>
                <a href={settings.mapUrl} target="_blank" rel="noopener noreferrer">
                  {settings.address}
                </a>
              </div>
              <div className="contact-info-item">
                <span>{t("contact.hoursLabel")}</span>
                {settings.hours}
              </div>
              <div className="contact-info-item">
                <span>{t("contact.phoneLabel")}</span>
                {settings.phone}
              </div>
              {(settings.ownerName || settings.ownerPhone) && (
                <div className="contact-info-item">
                  <span>{t("contact.ownerLabel")}</span>
                  {settings.ownerName}
                  {settings.ownerName && settings.ownerPhone ? " · " : ""}
                  {settings.ownerPhone}
                </div>
              )}
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.1 }}
          >
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  className="form-feedback form-feedback-success"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <motion.svg
                    className="form-feedback-check"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <motion.circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M7.5 12.5l3 3 6-6.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.35, delay: 0.35, ease: "easeOut" }}
                    />
                  </motion.svg>
                  {t("contact.successMessage")}
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  className="form-feedback form-feedback-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="field-row">
              <div className="field">
                <label htmlFor="contact-name">{t("common.name")}</label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="contact-phone">{t("common.phone")}</label>
                <input
                  id="contact-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="contact-email">{t("common.email")}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {showItemField && (
              <div className="field">
                <label htmlFor="contact-item">{t("common.itemName")}</label>
                <input
                  id="contact-item"
                  name="itemName"
                  value={form.itemName}
                  readOnly
                  aria-readonly="true"
                />
              </div>
            )}

            <div className="field">
              <label htmlFor="contact-message">{t("common.message")}</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                placeholder={t("contact.placeholder")}
              />
            </div>

            <motion.button
              type="submit"
              className="btn btn-accent"
              disabled={status === "busy"}
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2 }}
              style={{ width: "100%" }}
            >
              {status === "busy" && <WrenchLoader />}
              {status === "busy" ? t("common.sending") : t("common.sendMessage")}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
