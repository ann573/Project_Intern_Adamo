import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './locales'

i18n.use(initReactI18next).init({
  resources,
  ns: [
    'home',
    'tour',
    'hero',
    'about',
    'header',
    'tours',
    'hotels',
    'hotel',
    'contact',
    'auth',
    'checkout',
    'result',
    'schema_auth'
  ],
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
