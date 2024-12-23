import React, { createContext, useContext, useState } from 'react';
import { nl } from '../translations/nl';
import { en } from '../translations/en';
import type { Translations } from '../translations/types';

interface TranslationContextType {
  currentLanguage: 'nl' | 'en';
  setLanguage: (lang: 'nl' | 'en') => void;
  translations: Translations;
}

const TranslationContext = createContext<TranslationContextType>({
  currentLanguage: 'nl',
  setLanguage: () => {},
  translations: nl,
});

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<'nl' | 'en'>('nl');

  const value = {
    currentLanguage,
    setLanguage: setCurrentLanguage,
    translations: currentLanguage === 'nl' ? nl : en,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return {
    ...context.translations,
    currentLanguage: context.currentLanguage,
    setLanguage: context.setLanguage,
  };
}