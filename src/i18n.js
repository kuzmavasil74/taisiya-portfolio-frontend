import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enTranslations from './locales/en/translation.json'
import ukTranslations from './/locales/uk/translation.json'
import csTranslations from './locales/cz/translation.json'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    uk: {
      translation: ukTranslations,
    },
    cs: {
      translation: csTranslations,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
