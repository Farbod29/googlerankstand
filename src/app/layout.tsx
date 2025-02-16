import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Google Review QR Code Generator | Create Review Stands for Business',
  description:
    'Generate custom QR codes for Google reviews. Perfect for restaurants, shops, and businesses. Create professional review stands with NFC support. Increase your Google ratings easily.',
  keywords: [
    // General Keywords
    'Google review stand',
    'Google rating stand',
    'Google stance for business',
    'Google review QR code',
    'Google business stand',
    'Google review display',
    'Google rating display',
    'Google feedback stand',
    'Google star rating stand',
    'Google rank booster',
    '5-star rating Google stand',

    // Restaurant Specific
    'Restaurant QR code generator',
    'QR code menu for restaurants',
    'Restaurant feedback stand',
    'QR code for restaurant reviews',
    'Restaurant Google rank booster',

    // Shop & Business
    'Google rating stand for shops',
    'Google review sign for retail',
    'Store review QR code',
    'Business Google review stand',
    'Google Maps business stand',

    // German Keywords
    'Google Bewertungsstand',
    'QR-Code Generator für Bewertungen',
    'Google Bewertungen QR-Code',
    'Bewertungsstand für Restaurants',
    'Google Bewertungsanzeige',
    'Geschäftsbewertungen QR-Code',
    'Google Maps Bewertungsstand',
    'Bewertungen sammeln QR-Code',
  ].join(', '),
  openGraph: {
    title: 'Google Review QR Code Generator',
    description:
      'Create professional Google review stands with QR codes for your business. Increase customer feedback and ratings.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'de_DE',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      'en-US': '/en',
      'de-DE': '/de',
    },
  },
  verification: {
    google: 'google-site-verification-code', // You'll need to replace this with your actual verification code
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org markup for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Google Review QR Code Generator',
              description:
                'Create professional Google review stands with QR codes for your business',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'All',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              keywords:
                'Google review QR code, review stand, business ratings, restaurant reviews, shop reviews',
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
