import { createI18n } from 'vue-i18n'
import en from './en.json'
import nl from './nl.json'

const savedLocale = localStorage.getItem('lang') || 'nl'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  warnHtmlMessage: false,
  messages: {
    en,
    nl,
  },
  numberFormats: {
    nl: {
      currency: { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 },
    },
    en: {
      currency: { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 },
    },
  },
})
