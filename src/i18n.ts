import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Home_en from "./locales/en/home.json";
import Home_vi from "./locales/vi/home.json";

import Tour_en from "./locales/en/tour.json";
import Tour_vi from "./locales/vi/tour.json";

export const resources = {
    en: {
      home: Home_en,
      tour: Tour_en
    },
    vi: {
      home: Home_vi,
      tour: Tour_vi
    }
};

  i18n
  .use(initReactI18next)
  .init({
    resources,
    ns: ["home", "tour"],
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;