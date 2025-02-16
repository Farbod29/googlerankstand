'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useLanguageStore } from './store/languageStore';

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
};

export default function Home() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [extraText, setExtraText] = useState('');
  const [showNfc, setShowNfc] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [urlError, setUrlError] = useState('');
  const { language } = useLanguageStore();
  const t = translations[language];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const validateUrl = (value: string) => {
    if (!value) return false;
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);

    if (value === '') {
      setUrlError('');
    } else if (!validateUrl(value)) {
      setUrlError(t.urlError);
    } else {
      setUrlError('');
    }
  };

  const handleDownload = async () => {
    if (!validateUrl(url)) {
      setUrlError(t.urlError);
      return;
    }

    try {
      const previewBox = document.querySelector(
        '.download-preview'
      ) as HTMLDivElement;
      if (!previewBox) return;

      const canvas = await html2canvas(previewBox, {
        backgroundColor: isDarkMode ? '#111827' : '#FFFFFF',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = 'google-review-qr.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <main
      className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <LanguageSwitcher />
      {/* Dark Mode Toggle - Fixed in top right corner */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-lg backdrop-blur-sm text-gray-700 dark:text-gray-300"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 mt-16 md:mt-8">
          <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
          <p className="text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Panel - Settings */}
          <section
            className="space-y-6 p-6 rounded-lg shadow-lg bg-opacity-50 backdrop-blur-sm"
            aria-label="QR Code Generator Settings"
          >
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/assets/Google_Icons-09-512.webp"
                alt="Google Business Profile Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <h2 className="text-2xl font-bold">Review Stand Generator</h2>
            </div>

            <form className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="block font-medium" htmlFor="title-input">
                  {t.titleInput}
                </label>
                <input
                  id="title-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-blue-500 bg-opacity-50 backdrop-blur-sm"
                  placeholder={t.titlePlaceholder}
                  aria-label="Enter the title for your review stand"
                />
              </div>

              {/* URL Input */}
              <div className="space-y-2">
                <label className="block font-medium">{t.urlInput}</label>
                <input
                  type="url"
                  value={url}
                  onChange={handleUrlChange}
                  className={`w-full px-4 py-2 rounded border focus:ring-2 focus:ring-blue-500 bg-opacity-50 backdrop-blur-sm ${
                    urlError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t.urlPlaceholder}
                  aria-label="Enter the URL for your Google review"
                />
                {urlError && (
                  <p className="text-red-500 text-sm mt-1">{urlError}</p>
                )}
              </div>

              {/* Extra Text Input */}
              <div className="space-y-2">
                <label className="block font-medium">{t.extraTextInput}</label>
                <input
                  type="text"
                  value={extraText}
                  onChange={(e) => setExtraText(e.target.value)}
                  className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-blue-500 bg-opacity-50 backdrop-blur-sm"
                  placeholder={t.extraTextPlaceholder}
                  aria-label="Enter any additional text for your review stand"
                />
              </div>

              {/* NFC Toggle */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="nfc-toggle"
                  checked={showNfc}
                  onChange={(e) => setShowNfc(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  aria-label="Show NFC logo on the review stand"
                />
                <label htmlFor="nfc-toggle" className="font-medium">
                  {t.showNfc}
                </label>
              </div>
            </form>
          </section>

          {/* Right Panel - Preview */}
          <section
            className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-opacity-50 backdrop-blur-sm"
            aria-label="Preview"
          >
            <div
              className={`download-preview relative p-8 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-900 border-white/20'
                  : 'bg-white border-gray-200'
              } max-w-sm mx-auto border-2 shadow-sm`}
            >
              {/* Title */}
              <div className="text-center mb-6">
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {title || t.defaultTitle}
                </h3>
              </div>

              {/* QR Code Container */}
              <div className="relative w-[240px] h-[240px] mx-auto">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#4285F4,#DB4437_33%,#F4B400_66%,#0F9D58_100%)] rounded-lg p-2">
                  <div
                    className={`w-full h-full ${
                      isDarkMode ? 'bg-gray-900' : 'bg-white'
                    } rounded-lg`}
                  />
                </div>
                <div className="relative h-full flex justify-center items-center">
                  <div
                    className={`${
                      isDarkMode ? 'bg-gray-900' : 'bg-white'
                    } p-2 rounded-lg`}
                  >
                    <QRCodeSVG
                      value={validateUrl(url) ? url : 'https://example.com'}
                      size={160}
                      level="H"
                      includeMargin={true}
                      fgColor={isDarkMode ? '#FFFFFF' : '#000000'}
                      bgColor={isDarkMode ? '#111827' : '#FFFFFF'}
                    />
                  </div>
                </div>
              </div>

              {/* Five Stars */}
              <div className="mt-6 flex justify-center">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-6 h-6 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Extra Text */}
              {extraText && (
                <div className="mt-3 text-center">
                  <p
                    className={`text-sm font-medium ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {extraText}
                  </p>
                </div>
              )}

              {/* Icons and Text */}
              <div className="mt-4 flex justify-center items-center gap-4">
                <div className="text-center flex items-center gap-2">
                  {showNfc && (
                    <Image
                      src="/assets/nfc-icon-6.png"
                      alt="NFC Icon"
                      width={16}
                      height={16}
                      className={`object-contain ${
                        isDarkMode ? 'filter invert' : ''
                      }`}
                    />
                  )}
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {t.tapPhone}
                  </span>
                </div>
                <div className="text-center">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    /
                  </span>
                </div>
                <div className="text-center">
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {t.scanQr}
                  </span>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={!validateUrl(url)}
              className={`mt-6 px-6 py-2 text-white rounded-lg transition-colors ${
                validateUrl(url)
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {t.downloadButton}
            </button>
          </section>
        </div>

        <footer className="mt-12 text-center">
          <h2 className="text-xl font-bold mb-4">
            Why Use Our Google Review QR Code Generator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <article className="p-4">
              <h3 className="font-bold mb-2">{t.forRestaurants}</h3>
              <p>{t.forRestaurantsDesc}</p>
            </article>
            <article className="p-4">
              <h3 className="font-bold mb-2">{t.forShops}</h3>
              <p>{t.forShopsDesc}</p>
            </article>
            <article className="p-4">
              <h3 className="font-bold mb-2">{t.forServices}</h3>
              <p>{t.forServicesDesc}</p>
            </article>
          </div>

          {/* Commercial Section */}
          <div className="max-w-6xl mx-auto mt-16 bg-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Text Content */}
              <div className="space-y-6 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-transparent dark:bg-gradient-to-r dark:from-blue-500 dark:to-indigo-500 dark:bg-clip-text flex items-center gap-2">
                  {t.commercialTitle.replace('✨', '')}
                  <span className="text-amber-400 dark:text-yellow-500 animate-pulse">
                    ✨
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {t.commercialDesc}
                </p>
                <a
                  href={`mailto:${t.contactEmail}`}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  {t.contactEmail}
                </a>
              </div>

              {/* Images Gallery */}
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {/* <button
                    onClick={() => setSelectedImage('/physicalstand.jpg')}
                    className="w-full cursor-pointer focus:outline-none"
                  >
                    <Image
                      src="/physicalstand.jpg"
                      alt="Physical Stand"
                      width={300}
                      height={400}
                      className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                    />
                  </button> */}
                  <button
                    onClick={() => setSelectedImage('/google map.jpg')}
                    className="w-full cursor-pointer focus:outline-none"
                  >
                    <Image
                      src="/google map.jpg"
                      alt="Google Map Integration"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                </div>
                <div className="mt-8">
                  <button
                    onClick={() => setSelectedImage('/googlestand.jpg')}
                    className="w-full cursor-pointer focus:outline-none"
                  >
                    <Image
                      src="/googlestand.jpg"
                      alt="Google Stand"
                      width={300}
                      height={400}
                      className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl max-h-[90vh] w-full">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-10 right-0 text-white text-xl p-2 hover:text-gray-300"
                >
                  ✕
                </button>
                <Image
                  src={selectedImage}
                  alt="Enlarged view"
                  width={1200}
                  height={800}
                  className="rounded-lg object-contain w-full h-full"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
        </footer>
      </div>

      {/* Updated Sticky Footer */}
      <footer className="w-full bg-[#1a1f24] text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-8">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2 text-white">
                📞 Contact Us for More Information
              </h2>

              <p className="text-gray-300 text-lg">
                Looking for high-quality Google review stands, QR code
                solutions, and business display products at unbeatable prices?
                We&apos;ve got you covered!
              </p>

              <div className="space-y-3 text-lg">
                <div className="flex items-center justify-center gap-2">
                  <span>📩</span>
                  <a
                    href="mailto:aprin.farbod@digimenue.de"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    aprin.farbod@digimenue.de
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span>🌐</span>
                  <a
                    href="https://www.digimenue.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    www.digimenue.de
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span>📍</span>
                  <span className="text-gray-300">Germany</span>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <p className="font-semibold text-white">
                  Dr.-Ing. Farbod Aprin
                </p>
                <p className="text-gray-400">CEO, DigiMenue</p>
              </div>

              <div className="pt-4 text-sm text-gray-400 flex items-center justify-center gap-2">
                © 2025 DigiMenue. All Rights Reserved.
                <span className="text-lg">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
