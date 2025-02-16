import { useEffect } from 'react';
import { useLanguageStore } from '../store/languageStore';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  useEffect(() => {
    // Detect user's IP and set language
    async function detectUserLanguage() {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // Set German for German-speaking countries
        if (['DE', 'AT', 'CH'].includes(data.country_code)) {
          setLanguage('de');
        }
      } catch (error) {
        console.error('Error detecting language:', error);
      }
    }

    detectUserLanguage();
  }, [setLanguage]);

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-md transition-colors ${
            language === 'en'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('de')}
          className={`px-3 py-1 rounded-md transition-colors ${
            language === 'de'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          DE
        </button>
      </div>
    </div>
  );
}
