import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useCallback } from 'react';

export function useTranslation() {
  const { t, i18n } = useI18nTranslation();

  const setLanguage = useCallback((lang: 'nl' | 'en') => {
    i18n.changeLanguage(lang);
  }, [i18n]);

  return {
    t,
    currentLanguage: i18n.language as 'nl' | 'en',
    setLanguage,
  };
}