import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContact } from "../../api/contact";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";

const emptyForm = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | busy | success | error
  const [error, setError] = useState("");
  const { t } = useLanguage();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("busy");
    setError("");
    try {
      await submitContact(form);
      setStatus("success");
      setForm(emptyForm);
    } catch (err) {
      setStatus("error");
      setError(getErrorMessage(err, t("common.couldNotSendMessage")));
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>{t("contact.pageTitle")}</h1>
          <p>{t("contact.pageDescription")}</p>
        </div>
      </div>

      <div className="container section">
        <div className="contact-layout">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <h2>{t("contact.companyName")}</h2>
            <p>{t("contact.companyCopy")}</p>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <span>{t("contact.yardAddressLabel")}</span>
                {t("contact.yardAddressValue")}
              </div>
              <div className="contact-info-item">
                <span>{t("contact.hoursLabel")}</span>
                {t("contact.hoursValue")}
              </div>
              <div className="contact-info-item">
                <span>{t("contact.phoneLabel")}</span>
                {t("contact.phoneValue")}
              </div>
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
              {status === "busy" ? t("common.sending") : t("common.sendMessage")}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
