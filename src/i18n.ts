import de from "@/locales/de.json";
import en from "@/locales/en.json";
import explanationsDE from "@/locales/explanations/explanationsDE.json";
import explanationsEN from "@/locales/explanations/explanationsEN.json";
import helpDE from "@/locales/help/helpDE.json";
import helpEN from "@/locales/help/helpEN.json";
import { createI18n } from "vue-i18n";

// merge explanations into locales (target is en)
Object.assign(en, explanationsEN, helpEN);
Object.assign(de, explanationsDE, helpDE);

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallBackLocale: "en",
  messages: {
    en,
    de,
  },
});
