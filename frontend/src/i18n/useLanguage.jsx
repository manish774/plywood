import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === "undefined") return "en";

  const storedLang = window.localStorage.getItem("plywood-lang");
  return storedLang === "hi" ? "hi" : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("plywood-lang", lang);
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key, params = {}) => {
        const sections = key.split(".");
        let current = translations[lang] || translations.en;

        for (const section of sections) {
          current = current?.[section];
          if (current == null) return key;
        }

        if (typeof current === "string") {
          return Object.entries(params).reduce(
            (acc, [k, v]) => acc.replace(new RegExp(`\\{${k}\\}`, "g"), String(v)),
            current,
          );
        }

        return current;
      },
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
