// app/layout.tsx — корневой layout
import type { Metadata, Viewport } from 'next';
import { SITE } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import YandexMetrika from '@/components/YandexMetrika';
import '@/styles/globals.css';

// ── Метаданные по умолчанию (переопределяются на каждой странице)
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — кованые ритуальные изделия, ${SITE.city}`,
    template: `%s | ${SITE.name}`,
  },
  description: `Производство кованых и сварных оградок, столиков, крестов для кладбища в ${SITE.city}. Собственное производство с 2010 года. Гарантия 3–5 лет. ${SITE.phone}`,
  keywords: ['оградки на могилу', 'нижний тагил', 'кованые оградки', 'ритуальные изделия', 'установка оградок'],
  authors:  [{ name: SITE.name, url: SITE.url }],
  creator:  SITE.name,
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    type:        'website',
    locale:      'ru_RU',
    url:         SITE.url,
    siteName:    SITE.name,
    title:       `${SITE.name} — кованые ритуальные изделия`,
    description: `Производство оградок, столиков, крестов. ${SITE.city}, с 2010 года.`,
    images: [{ url: '/img/og-default.jpg', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card:  'summary_large_image',
    title: `${SITE.name} — кованые ритуальные изделия`,
  },
  alternates: {
    canonical: SITE.url,
  },
  icons: {
    icon:        [{ url: '/favicon.ico' }, { url: '/img/favicon-32x32.png', sizes: '32x32' }],
    apple:       [{ url: '/img/apple-touch-icon.png', sizes: '180x180' }],
    other:       [{ url: '/img/icon-192.png', sizes: '192x192', rel: 'icon' }],
  },
  manifest: '/manifest.json',
  verification: {
    // yandex: 'XXXXXX',  // добавить после регистрации в Вебмастере
  },
};

export const viewport: Viewport = {
  width:            'device-width',
  initialScale:     1,
  themeColor:       '#111111',
};

// ── Schema.org LocalBusiness (глобально на всех страницах)
const LOCAL_BUSINESS_SCHEMA = {
  '@context':     'https://schema.org',
  '@type':        'LocalBusiness',
  name:           SITE.name,
  url:            SITE.url,
  telephone:      SITE.phone,
  image:          `${SITE.url}/img/logo.jpg`,
  priceRange:     '₽₽',
  description:    `Производство кованых и сварных ритуальных изделий в ${SITE.city} с 2010 года.`,
  address: {
    '@type':           'PostalAddress',
    streetAddress:     SITE.address,
    addressLocality:   SITE.city,
    addressRegion:     SITE.region,
    postalCode:        SITE.zip,
    addressCountry:    'RU',
  },
  geo: {
    '@type':     'GeoCoordinates',
    latitude:    57.9199,
    longitude:   59.9586,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '16:00' },
  ],
  sameAs: [],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        {/* Яндекс.Метрика — через отдельный компонент */}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
        <YandexMetrika />
      </body>
    </html>
  );
}
