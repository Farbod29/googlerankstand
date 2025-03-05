'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationProps {
  isDarkMode: boolean;
}

export default function Navigation({ isDarkMode }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home (Google Rank)', path: '/' },
    { name: 'Page 2', path: '/page2' },
    { name: 'Page 3', path: '/page3' },
    { name: 'Page 4', path: '/page4' },
  ];

  return (
    <>
      {/* Top Header with Sandwich Menu */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-md`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <Image
              src="/assets/Google_Icons-09-512.webp"
              alt="Google Business Profile Logo"
              width={30}
              height={30}
              className="object-contain"
            />
            <h1 className="text-lg font-bold">Google Review QR</h1>
          </div>

          <div className="w-6">{/* Placeholder to balance the header */}</div>
        </div>
      </header>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-40 ${
            isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
          } pt-16 backdrop-blur-sm`}
        >
          <div className="container mx-auto px-4 py-8">
            <ul className="space-y-6 text-xl">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium hover:text-blue-600 transition-colors block py-2`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
