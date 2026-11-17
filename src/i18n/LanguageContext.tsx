import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import en from './locales/en.json';
import am from './locales/am.json';
import ti from './locales/ti.json';
import om from './locales/om.json';

export type AppLanguage = 'english' | 'oromo' | 'amharic' | 'tigrinya';

export const LANGUAGE_OPTIONS: { code: AppLanguage; label: string; short: string }[] = [
  { code: 'english', label: 'English', short: 'EN' },
  { code: 'oromo', label: 'Afaan Oromoo', short: 'OM' },
  { code: 'amharic', label: 'አማርኛ', short: 'አማ' },
  { code: 'tigrinya', label: 'ትግርኛ', short: 'ትግ' }
];

const TRANSLATIONS: Record<AppLanguage, Record<string, string>> = {
  english: en,
  oromo: om,
  amharic: am,
  tigrinya: ti
};

interface LanguageContextValue {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'english',
  setLanguage: () => {},
  t: (key, fallback) => fallback || key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    if (typeof window !== 'undefined') {
      try {
        try {
          localStorage.removeItem('aic_preferred_language');
        } catch {
          // ignore
        }
        const saved = localStorage.getItem('oic_preferred_language') as AppLanguage | null;
        if (saved && TRANSLATIONS[saved]) return saved;
      } catch {
        // Ignore storage restrictions
      }
    }
    return 'english';
  });

  const setLanguage = useCallback((lang: AppLanguage) => {
    if (!TRANSLATIONS[lang]) return;
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('oic_preferred_language', lang);
      } catch {
        // Ignore storage restrictions
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const htmlLang =
        language === 'amharic' ? 'am' : language === 'tigrinya' ? 'ti' : language === 'oromo' ? 'om' : 'en';
      document.documentElement.lang = htmlLang;
    }
  }, [language]);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      return TRANSLATIONS[language]?.[key] || TRANSLATIONS.english[key] || fallback || key;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t
    }),
    [language, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
