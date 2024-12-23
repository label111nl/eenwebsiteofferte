import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { nl } from '../translations/nl';
import { en } from '../translations/en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      nl: { translation: nl }
    },
    lng: 'nl',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;