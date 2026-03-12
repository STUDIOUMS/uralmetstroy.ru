// app/kontakty/page.tsx — Контакты
import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Контакты УралМетСтрой — Нижний Тагил | Оградки на кладбище',
  description: `${SITE.name} в ${SITE.city}: ${SITE.phone}, ${SITE.address}. ${SITE.hours.weekdays}, ${SITE.hours.saturday}. Оградки, установка, ремонт, покраска.`,
  alternates: { canonical: '/kontakty' },
  openGraph: {
    title:       'Контакты УралМетСтрой — Нижний Тагил',
    description: `${SITE.name} в ${SITE.city}: ${SITE.phone}, ${SITE.address}. Пн–Пт 9:00–18:00, Сб 10:00–16:00.`,
    url:         '/kontakty',
    images:      [{ url: '/img/og-default.jpg', width: 1200, height: 630, alt: 'Контакты УралМетСтрой' }],
  },
};

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address,
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    postalCode: SITE.zip,
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 57.918083,
    longitude: 59.971859,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '16:00' },
  ],
  description: `Производство и установка кованых оградок в ${SITE.city}. Ремонт, покраска, демонтаж, благоустройство могил.`,
};

const BREADCRUMB_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Контакты' },
];

export default function KontaktyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />

      <Breadcrumb items={BREADCRUMB_ITEMS} />

      {/* PAGE HERO */}
      <section className="page-hero" style={{ backgroundImage: "url('/img/slide2.jpg')" }}>
        <div className="container">
          <h1>Контакты</h1>
          <p className="hero-desc">
            {SITE.name} — производство и установка оградок в {SITE.city}
          </p>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="section">
        <div className="container">
          <div className="contacts-layout">
            {/* Contact Cards */}
            <div className="contacts-cards">
              <div className="contact-card contact-card--phone">
                <div className="contact-card-label">Телефон</div>
                <a href={SITE.phoneTel} className="contact-phone-big">{SITE.phone}</a>
                <p className="contact-card-note">Звоните в рабочее время — ответим сразу</p>
                <div className="contact-card-actions">
                  <a href={SITE.phoneTel} className="btn btn-primary">Позвонить</a>
                  <a href={`https://wa.me/${SITE.phoneRaw}`} className="btn btn-wa" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-label">Адрес</div>
                <div className="contact-card-value">
                  <strong>{SITE.city}</strong>, {SITE.address}
                </div>
                <div className="contact-card-note">{SITE.region}, {SITE.zip}</div>
              </div>

              <div className="contact-card">
                <div className="contact-card-label">Часы работы</div>
                <div className="hours-list">
                  <div className="hours-row">
                    <span className="hours-day">Пн–Пт</span>
                    <span className="hours-time">9:00–18:00</span>
                  </div>
                  <div className="hours-row">
                    <span className="hours-day">Суббота</span>
                    <span className="hours-time">10:00–16:00</span>
                  </div>
                  <div className="hours-row">
                    <span className="hours-day">Воскресенье</span>
                    <span className="hours-time hours-closed">по договорённости</span>
                  </div>
                </div>
              </div>

              {/* Cemeteries */}
              <div className="contact-card">
                <div className="contact-card-label">Обслуживаемые кладбища</div>
                <ul className="cemetery-list">
                  {SITE.cemeteries.map(c => (
                    <li key={c} className="cemetery-item">
                      <span className="cemetery-dot" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="contact-card-note">Работаем по всей {SITE.region}</p>
              </div>
            </div>

            {/* Map */}
            <div className="map-block">
              <div className="map-frame">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=59.971859%2C57.918083&z=16&pt=59.971859,57.918083,pm2rdm"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  title="УралМетСтрой на карте Нижнего Тагила"
                  allowFullScreen
                />
              </div>
              <p className="map-address">
                <strong>{SITE.city}</strong>, {SITE.address}
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contacts-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
        .contacts-cards { display: flex; flex-direction: column; gap: 16px; }
        .contact-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px 24px; }
        .contact-card--phone { border-color: var(--primary); }
        .contact-card-label { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--text-muted); margin-bottom: 8px; }
        .contact-phone-big { display: block; font-size: 1.6rem; font-weight: 800; color: var(--primary); text-decoration: none; margin-bottom: 6px; }
        .contact-phone-big:hover { color: var(--accent); }
        .contact-card-value { font-size: 1.05rem; font-weight: 600; margin-bottom: 4px; }
        .contact-card-note { font-size: 0.83rem; color: var(--text-light); margin-top: 6px; }
        .contact-card-actions { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
        .hours-list { display: flex; flex-direction: column; gap: 6px; }
        .hours-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; }
        .hours-day { color: var(--text-light); }
        .hours-time { font-weight: 600; }
        .hours-closed { font-weight: 400; color: var(--text-muted); }
        .cemetery-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 8px; }
        .cemetery-item { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; }
        .cemetery-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); flex-shrink: 0; }
        .map-block { display: flex; flex-direction: column; gap: 10px; }
        .map-frame { border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border); }
        .map-frame iframe { display: block; }
        .map-address { font-size: 0.875rem; color: var(--text-light); text-align: center; }
        @media (max-width: 800px) { .contacts-layout { grid-template-columns: 1fr; } }
      `}</style>

      {/* ORDER FORM */}
      <section className="section bg-light" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Оставить заявку</h2>
            <p>Перезвоним в течение 15 минут и ответим на все вопросы</p>
          </div>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <OrderForm title="" />
          </div>
        </div>
      </section>

      <RelatedLinks links={[
        { href: '/catalog',          label: 'Каталог оградок' },
        { href: '/cena-ogradki',     label: 'Цены' },
        { href: '/dostavka-i-oplata', label: 'Доставка и оплата' },
        { href: '/garantii',         label: 'Гарантии' },
        { href: '/o-kompanii',       label: 'О компании' },
      ]}/>
    </>
  );
}
