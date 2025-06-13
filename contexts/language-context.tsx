"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { type Language, translations } from "@/lib/i18n/translations"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, section?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  const t = (key: string, section?: string): string => {
    if (section) {
      return translations[language][section as keyof typeof translations.fr]?.[key as any] || key
    }
    return translations[language][key as keyof typeof translations.fr] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
