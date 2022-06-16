import de from "@/locales/de.json";
import en from "@/locales/en.json";
import { createI18n } from "vue-i18n";

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
