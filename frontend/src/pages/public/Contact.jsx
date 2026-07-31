import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContact } from "../../api/contact";
import { getErrorMessage } from "../../utils/errors";

const emptyForm = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | busy | success | error
  const [error, setError] = useState("");

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
      setError(getErrorMessage(err, "Could not send your message. Please try again."));
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Get in touch</h1>
          <p>
            Tell us what you're building and what sheet goods you need &mdash; we'll get
            back to you with pricing and availability.
          </p>
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
            <h2>Ridgeline Plywood Co.</h2>
            <p>
              Whether it's a single sheet or a full job list, send us the details and
              we'll follow up within one business day.
            </p>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <span>Yard address</span>
                221 Millwork Row, Fall City
              </div>
              <div className="contact-info-item">
                <span>Hours</span>
                Mon&ndash;Sat, 7am&ndash;5pm
              </div>
              <div className="contact-info-item">
                <span>Phone</span>
                (555) 019-2044
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
                  Thanks &mdash; your message is in. We'll be in touch soon.
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
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="contact-phone">Phone</label>
                <input
                  id="contact-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="contact-email">Email</label>
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
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                placeholder="What are you building, and what do you need?"
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
              {status === "busy" ? "Sending..." : "Send message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
