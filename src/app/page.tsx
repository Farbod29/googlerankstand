'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import html2canvas from 'html2canvas';

export default function Home() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [extraText, setExtraText] = useState('');
  const [showNfc, setShowNfc] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [urlError, setUrlError] = useState('');

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
      setUrlError('Please enter a valid URL (e.g., https://example.com)');
    } else {
      setUrlError('');
    }
  };

  const handleDownload = async () => {
    if (!validateUrl(url)) {
      setUrlError('Please enter a valid URL before downloading');
      return;
    }

    const previewBox = document.querySelector(
      '.download-preview'
    ) as HTMLDivElement;
    if (previewBox) {
      try {
        const canvas = await html2canvas(previewBox, {
          backgroundColor: '#FFFFFF',
          scale: 2, // Higher quality
          logging: false,
          useCORS: true, // This helps with loading images
          allowTaint: true,
        });

        const link = document.createElement('a');
        link.download = 'google-review-qr.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  return (
    <main
      className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Panel - Settings */}
          <div className="space-y-6 p-6 rounded-lg shadow-lg bg-opacity-50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/assets/Google_Icons-09-512.webp"
                alt="Google Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <h2 className="text-2xl font-bold">Review Generator</h2>
            </div>
            {/* Title Input */}
            <div className="space-y-2">
              <label className="block font-medium">Title Text</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-blue-500 bg-opacity-50 backdrop-blur-sm text-yellow-500 border-red-500"
                placeholder="Enter title text"
              />
            </div>
            {/* URL Input */}
            <div className="space-y-2">
              <label className="block font-medium">QR Code URL</label>
              <input
                type="url"
                value={url}
                onChange={handleUrlChange}
                className={`w-full px-4 py-2 rounded border focus:ring-2 focus:ring-blue-500 bg-opacity-50 backdrop-blur-sm ${
                  urlError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com"
              />
              {urlError && (
                <p className="text-red-500 text-sm mt-1">{urlError}</p>
              )}
            </div>

            {/* Extra Text Input */}
            <div className="space-y-2">
              <label className="block font-medium">Extra Text (Optional)</label>
              <input
                type="text"
                value={extraText}
                onChange={(e) => setExtraText(e.target.value)}
                className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-blue-500 bg-opacity-50 backdrop-blur-sm"
                placeholder="Enter additional text"
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
              />
              <label htmlFor="nfc-toggle" className="font-medium">
                Show NFC Logo
              </label>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="theme-toggle"
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="theme-toggle" className="font-medium">
                Dark Mode
              </label>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-opacity-50 backdrop-blur-sm">
            <div
              className={`download-preview relative p-8 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-900 border-white'
                  : 'bg-white border-gray-200'
              } max-w-sm mx-auto border shadow-sm`}
            >
              {/* Title */}
              <div className="text-center mb-6">
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {title || 'Bewerte uns!'}
                </h3>
              </div>

              {/* QR Code Container */}
              <div className="relative flex justify-center items-center">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#4285F4,#DB4437_33%,#F4B400_66%,#0F9D58_100%)] rounded-lg p-2">
                  <div
                    className={`w-full h-full ${
                      isDarkMode ? 'bg-gray-900' : 'bg-white'
                    } rounded-lg`}
                  ></div>
                </div>
                <div className="relative p-4 flex justify-center items-center">
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
                    Tap phone
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
                    Scan QR Code
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
              Download QR Code
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
