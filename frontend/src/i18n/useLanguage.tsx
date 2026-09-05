import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type TranslationDict } from "./translations";

export type Lang = "en" | "hi";

// Resolves a dot-path (e.g. "nav.home" or "home.stats.categories") against
// TranslationDict to whatever is actually stored there — most keys are
// strings, but some (e.g. home.features, home.sheetLabels) are arrays of
// objects/strings, so `t()` is typed honestly instead of lying with `: string`.
// Falls back to `string` for unresolvable paths (matches the runtime
// behavior of returning the raw key when a lookup misses).
type PathValue<T, Path extends string> = Path extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? PathValue<T[Head], Tail>
    : string
  : Path extends keyof T
    ? T[Path]
    : string;

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <P extends string>(key: P, params?: Record<string, string | number>) => PathValue<TranslationDict, P>;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";

  const storedLang = window.localStorage.getItem("plywood-lang");
  return storedLang === "hi" ? "hi" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("plywood-lang", lang);
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (<P extends string>(key: P, params: Record<string, string | number> = {}) => {
        const sections = key.split(".");
        let current: unknown = translations[lang] || translations.en;

        for (const section of sections) {
          current = (current as Record<string, unknown> | null | undefined)?.[section];
          if (current == null) return key;
        }

        if (typeof current === "string") {
          return Object.entries(params).reduce(
            (acc, [k, v]) => acc.replace(new RegExp(`\\{${k}\\}`, "g"), String(v)),
            current,
          );
        }

        return current;
      }) as LanguageContextValue["t"],
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
