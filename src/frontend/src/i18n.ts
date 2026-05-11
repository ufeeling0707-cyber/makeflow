import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "./constants/languages";
import en from "./locales/en.json";

const supportedLanguageCodes = new Set(
  SUPPORTED_LANGUAGES.map((language) => language.code),
);

function normalizeLanguageCode(lang: string): string {
  if (supportedLanguageCodes.has(lang)) return lang;

  const baseLanguage = lang.split("-")[0];
  if (baseLanguage === "zh") return "zh-Hans";
  if (supportedLanguageCodes.has(baseLanguage)) return baseLanguage;

  return "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export async function loadLanguage(lang: string): Promise<void> {
  const normalizedLang = normalizeLanguageCode(lang);
  if (normalizedLang === "en") return;
  if (i18n.hasResourceBundle(normalizedLang, "translation")) return;
  const messages = await import(`./locales/${normalizedLang}.json`);
  i18n.addResourceBundle(normalizedLang, "translation", messages.default);
}

export default i18n;
