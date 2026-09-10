import { useState, type ChangeEvent, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUserAuth } from "../../context/UserAuthContext";
import Parallax from "../../components/public/Parallax";
import Seo from "../../components/Seo";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";
import { useSettings } from "../../context/SettingsContext";
import { WrenchLoader } from "../../components/Loaders";

const emptyRegisterForm = { name: "", email: "", phone: "" };

type AccountMode = "register" | "login";
type AccountStep = "form" | "verify";
type AccountStatus = "idle" | "busy" | "error";

export default function Account() {
  const { isAuthenticated, register, login, verifyOtp, resendOtp } = useUserAuth();
  const { t } = useLanguage();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<AccountMode>("register");
  const [step, setStep] = useState<AccountStep>("form");
  const [registerForm, setRegisterForm] = useState(emptyRegisterForm);
  const [loginEmail, setLoginEmail] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<AccountStatus>("idle");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  if (isAuthenticated) {
    const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/my-queries";
    return <Navigate to={redirectTo} replace />;
  }

  const switchMode = (nextMode: AccountMode) => {
    setMode(nextMode);
    setStep("form");
    setError("");
    setNotice("");
  };

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("busy");
    setError("");
    try {
      await register(registerForm.name, registerForm.email, registerForm.phone);
      setVerifyEmail(registerForm.email);
      setStep("verify");
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(getErrorMessage(err, t("account.couldNotRegister")));
    }
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("busy");
    setError("");
    try {
      await login(loginEmail);
      setVerifyEmail(loginEmail);
      setStep("verify");
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(getErrorMessage(err, t("account.couldNotLogin")));
    }
  };

  const handleVerifySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("busy");
    setError("");
    try {
      await verifyOtp(verifyEmail, otp);
      const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/my-queries";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setStatus("error");
      setError(getErrorMessage(err, t("account.couldNotVerify")));
    }
  };

  const handleResend = async () => {
    setError("");
    setNotice("");
    try {
      await resendOtp(verifyEmail);
      setNotice(t("account.otpResent"));
    } catch (err) {
      setError(getErrorMessage(err, t("account.couldNotVerify")));
    }
  };

  return (
    <div>
      <Seo title={`${t("account.pageTitle")} | ${settings.shopName}`} description="" path="/account" noindex />

      <div className="page-header">
        <Parallax range={40} className="grain-overlay" />
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
        >
          <h1>{t("account.pageTitle")}</h1>
          <p>{t("account.pageDescription")}</p>
        </motion.div>
      </div>

      <div className="container section">
        <motion.div
          className="contact-form account-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
        >
          {step === "form" && (
            <div className="account-tabs">
              <button
                type="button"
                className={"account-tab" + (mode === "register" ? " account-tab-active" : "")}
                onClick={() => switchMode("register")}
              >
                {t("account.registerTab")}
              </button>
              <button
                type="button"
                className={"account-tab" + (mode === "login" ? " account-tab-active" : "")}
                onClick={() => switchMode("login")}
              >
                {t("account.loginTab")}
              </button>
            </div>
          )}

          <AnimatePresence>
            {error && (
              <motion.div
                className="form-feedback form-feedback-error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {error}
              </motion.div>
            )}
            {notice && !error && (
              <motion.div
                className="form-feedback form-feedback-success"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {notice}
              </motion.div>
            )}
          </AnimatePresence>

          {step === "form" && mode === "register" && (
            <form onSubmit={handleRegisterSubmit}>
              <div className="field">
                <label htmlFor="register-name">{t("common.name")}</label>
                <input
                  id="register-name"
                  value={registerForm.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setRegisterForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="register-email">{t("common.email")}</label>
                <input
                  id="register-email"
                  type="email"
                  value={registerForm.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setRegisterForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="register-phone">{t("common.phone")}</label>
                <input
                  id="register-phone"
                  value={registerForm.phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setRegisterForm((f) => ({ ...f, phone: e.target.value }))}
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="btn btn-accent"
                disabled={status === "busy"}
                whileTap={{ scale: 0.96 }}
                style={{ width: "100%" }}
              >
                {status === "busy" && <WrenchLoader />}
                {status === "busy" ? t("account.sendingOtp") : t("account.registerButton")}
              </motion.button>
            </form>
          )}

          {step === "form" && mode === "login" && (
            <form onSubmit={handleLoginSubmit}>
              <div className="field">
                <label htmlFor="login-email">{t("common.email")}</label>
                <input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <motion.button
                type="submit"
                className="btn btn-accent"
                disabled={status === "busy"}
                whileTap={{ scale: 0.96 }}
                style={{ width: "100%" }}
              >
                {status === "busy" && <WrenchLoader />}
                {status === "busy" ? t("account.sendingOtp") : t("account.loginButton")}
              </motion.button>
            </form>
          )}

          {step === "verify" && (
            <form onSubmit={handleVerifySubmit}>
              <p className="account-verify-copy">
                {t("account.otpSentTo", { email: verifyEmail })}
              </p>
              <div className="field">
                <label htmlFor="verify-otp">{t("account.otpLabel")}</label>
                <input
                  id="verify-otp"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <motion.button
                type="submit"
                className="btn btn-accent"
                disabled={status === "busy"}
                whileTap={{ scale: 0.96 }}
                style={{ width: "100%" }}
              >
                {status === "busy" && <WrenchLoader />}
                {status === "busy" ? t("account.verifying") : t("account.verifyButton")}
              </motion.button>
              <button type="button" className="account-resend" onClick={handleResend}>
                {t("account.resendOtp")}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
