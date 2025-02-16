import { create } from 'zustand';
import { StateCreator } from 'zustand';

type Language = 'en' | 'de';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>(((set) => ({
  language: 'en',
  setLanguage: (language: Language) => set({ language }),
})) as StateCreator<LanguageStore>);

export const translations = {
  en: {
    title: 'Google Review QR Code Generator',
    subtitle:
      'Create professional QR codes for your Google reviews. Perfect for restaurants, shops, and businesses.',
    titleInput: 'Title Text',
    titlePlaceholder: 'Enter title text',
    urlInput: 'QR Code URL',
    urlPlaceholder: 'https://example.com',
    urlError: 'Please enter a valid URL (e.g., https://example.com)',
    extraTextInput: 'Extra Text (Optional)',
    extraTextPlaceholder: 'Enter additional text',
    showNfc: 'Show NFC Logo',
    darkMode: 'Dark Mode',
    downloadButton: 'Download QR Code',
    defaultTitle: 'Rate us!',
    tapPhone: 'Tap phone',
    scanQr: 'Scan QR Code',
    forRestaurants: 'For Restaurants',
    forRestaurantsDesc:
      'Perfect for table stands and menu displays. Encourage diners to leave reviews easily.',
    forShops: 'For Retail Shops',
    forShopsDesc:
      'Display at checkout counters and reception areas. Boost your local business visibility.',
    forServices: 'For Service Businesses',
    forServicesDesc:
      'Professional stands with NFC support. Make it easy for clients to share their experience.',
    commercialTitle:
      'Get Your High-Quality Google Review Stands Starting from Just 7€! ✨',
    commercialDesc:
      'Upgrade your business with our shining, durable, hard plastic stands, perfect for restaurants, shops, and service businesses. We offer custom QR code generation and fast delivery at an unbeatable price!',
    contactEmail: 'aprin.farbod@digimenue.de',
  },
  de: {
    title: 'Google Bewertung QR-Code Generator',
    subtitle:
      'Erstellen Sie professionelle QR-Codes für Ihre Google-Bewertungen. Perfekt für Restaurants, Geschäfte und Unternehmen.',
    titleInput: 'Titel Text',
    titlePlaceholder: 'Titel eingeben',
    urlInput: 'QR-Code URL',
    urlPlaceholder: 'https://example.com',
    urlError: 'Bitte geben Sie eine gültige URL ein (z.B. https://example.com)',
    extraTextInput: 'Zusätzlicher Text (Optional)',
    extraTextPlaceholder: 'Zusätzlichen Text eingeben',
    showNfc: 'NFC-Logo anzeigen',
    darkMode: 'Dunkelmodus',
    downloadButton: 'QR-Code herunterladen',
    defaultTitle: 'Bewerten Sie uns!',
    tapPhone: 'Telefon antippen',
    scanQr: 'QR-Code scannen',
    forRestaurants: 'Für Restaurants',
    forRestaurantsDesc:
      'Perfekt für Tischaufsteller und Menüdisplays. Ermutigen Sie Gäste einfach Bewertungen abzugeben.',
    forShops: 'Für Einzelhandel',
    forShopsDesc:
      'Zeigen Sie den Code an Kassen und Empfangsbereichen. Steigern Sie Ihre lokale Geschäftspräsenz.',
    forServices: 'Für Dienstleister',
    forServicesDesc:
      'Professionelle Aufsteller mit NFC-Unterstützung. Erleichtern Sie Ihren Kunden das Teilen ihrer Erfahrungen.',
    commercialTitle:
      'Sichern Sie sich Ihre hochwertigen Google-Bewertungsständer ab nur 7€! ✨',
    commercialDesc:
      'Werten Sie Ihr Unternehmen mit unseren glänzenden, langlebigen Hartplastikständern auf, perfekt für Restaurants, Geschäfte und Dienstleistungsunternehmen. Wir bieten individuelle QR-Code-Generierung und schnelle Lieferung zu einem unschlagbaren Preis!',
    contactEmail: 'aprin.farbod@digimenue.de',
  },
} as const;
