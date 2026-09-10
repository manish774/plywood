import { useState, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";
import { useSettings } from "../../context/SettingsContext";
import Seo from "../../components/Seo";
import SwastikIcon from "../../components/icons/SwastikIcon";
import { WrenchLoader } from "../../components/Loaders";
import "../../styles/admin.css";

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/admin";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, t("common.invalidLogin")));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login-wrap">
      <Seo title={`${t("admin.loginSubtitle")} | ${settings.shopName}`} description="" path="/admin/login" noindex />

      <motion.div
        className="admin-login-card"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="admin-login-brand">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt="" className="navbar-logo-mark" />
          ) : (
            <SwastikIcon className="navbar-logo-mark" />
          )}
          {settings.shortName}
        </div>
        <p>{t("admin.loginSubtitle")}</p>

        {error && (
          <motion.div
            className="form-feedback form-feedback-error"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <motion.button
            type="submit"
            className="btn btn-accent"
            disabled={busy}
            whileTap={{ scale: 0.97 }}
          >
            {busy && <WrenchLoader />}
            {busy ? t("common.signingIn") : t("common.signIn")}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
