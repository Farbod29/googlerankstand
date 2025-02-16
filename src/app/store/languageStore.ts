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
    defaultTitle: 'Review us on Google',
    tapPhone: 'Tap phone',
    scanQr: 'Scan QR Code',
    whyUse: 'Why Use Our Google Review QR Code Generator?',
    forRestaurants: {
      title: 'For Restaurants',
      description:
        'Perfect for table stands and menu displays. Encourage diners to leave reviews easily.',
    },
    forShops: {
      title: 'For Retail Shops',
      description:
        'Display at checkout counters and reception areas. Boost your local business visibility.',
    },
    forServices: {
      title: 'For Service Businesses',
      description:
        'Professional stands with NFC support. Make it easy for clients to share their experience.',
    },
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
    defaultTitle: 'Bewerte uns auf Google',
    tapPhone: 'Telefon antippen',
    scanQr: 'QR-Code scannen',
    whyUse: 'Warum unseren Google Bewertung QR-Code Generator nutzen?',
    forRestaurants: {
      title: 'Für Restaurants',
      description:
        'Perfekt für Tischaufsteller und Menüdisplays. Ermutigen Sie Gäste einfach Bewertungen abzugeben.',
    },
    forShops: {
      title: 'Für Einzelhandel',
      description:
        'Zeigen Sie den Code an Kassen und Empfangsbereichen. Steigern Sie Ihre lokale Geschäftspräsenz.',
    },
    forServices: {
      title: 'Für Dienstleister',
      description:
        'Professionelle Aufsteller mit NFC-Unterstützung. Erleichtern Sie Ihren Kunden das Teilen ihrer Erfahrungen.',
    },
  },
};
