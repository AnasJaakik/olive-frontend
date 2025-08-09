// src/i18n/I18nContext.jsx
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { dict } from "./dictionary";

const I18nContext = createContext({ lang: "en", setLang: () => {}, t: (k) => k });

function get(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang === "de" ? "de" : "en");
  }, [lang]);

  const value = useMemo(() => {
    const bundle = dict[lang] || dict.en;
    const t = (key) => {
      const v = get(bundle, key);
      return v === undefined ? key : v;
    };
    return { lang, setLang, t, bundle };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
