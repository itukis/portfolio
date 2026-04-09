import { createContext, useContext, useState } from "react";
import translations from "../i18n/index.js";

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("ja");
  const toggle = () => setLang(l => (l === "ja" ? "en" : "ja"));
  const t = translations[lang];
  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
