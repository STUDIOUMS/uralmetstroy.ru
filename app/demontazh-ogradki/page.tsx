// app/demontazh-ogradki/page.tsx — Демонтаж оградок
import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Демонтаж оградок в Нижнем Тагиле — от 1 000 ₽ | УралМетСтрой',
  description: `Демонтаж старых оградок на кладбище в ${SITE.city}. Аккуратная разборка, вывоз металлолома. При заказе новой оградки — демонтаж бесплатно. Цена от 1 000 ₽. Звоните: ${SITE.phone}`,
  alternates: { canonical: '/demontazh-ogradki' },
  openGraph: {
    title:       'Демонтаж оградок в Нижнем Тагиле — от 1 000 ₽ | УралМетСтрой',
    description: `Демонтаж старых оградок на кладбище в ${SITE.city}. Аккуратная разборка, вывоз металлолома. При заказе новой оградки — демонтаж бесплатно.`,
    url:         '/demontazh-ogradki',
    images:      [{ url: '/img/og-default.jpg', width: 1200, height: 630, alt: 'Демонтаж оградок — УралМетСтрой' }],
  },
};

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Демонтаж оградок',
  description: 'Аккуратный демонтаж и вывоз старых оградок с кладбища',
  provider: {
    '@type': 'LocalBusiness',
    name: SITE.name,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.zip,
    },
  },
  areaServed: SITE.city,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'RUB',
    price: '1000',
  },
};

const BREADCRUMB_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Услуги', href: '/#services' },
  { label: 'Демонтаж оградок' },
];

const ADVANTAGES = [
  { title: 'Аккуратный демонтаж', desc: 'Работаем бережно — не повреждаем надгробие и прилегающее покрытие' },
  { title: 'Вывоз металлолома', desc: 'Забираем разобранную оградку с собой — не нужно думать об утилизации' },
  { title: 'При заказе новой — бесплатно', desc: 'Демонтаж старой оградки входит в стоимость, если вы заказываете у нас новую' },
  { title: 'Выезд в день заказа', desc: 'Принимаем заявки с утра и приезжаем в удобное для вас время' },
];

export default function DemontazhPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />

      <Breadcrumb items={BREADCRUMB_ITEMS} />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <h1>Демонтаж оградок</h1>
          <p className="hero-desc">
            Аккуратно разберём и вывезем старую оградку с кладбища.
            При заказе новой оградки у нас — демонтаж бесплатно.
          </p>
          <div className="hero-badges">
            {['От 1 000 ₽', 'При замене — бесплатно', 'Вывоз металлолома', 'Выезд в день звонка'].map(b => (
              <span key={b} className="hero-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Почему выбирают нас</h2>
            <p>Быстро, аккуратно и без лишних хлопот для вас</p>
          </div>
          <div className="advantages-grid">
            {ADVANTAGES.map(a => (
              <div key={a.title} className="advantage-card">
                <div className="advantage-check">✓</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFO BLOCK */}
      <section className="section bg-light">
        <div className="container">
          <div className="info-block">
            <div className="info-block-icon">💡</div>
            <div>
              <h2>Демонтаж при замене оградки — бесплатно</h2>
              <p>
                Если вы заказываете у нас новую оградку, демонтаж старой включён в стоимость.
                Мы приедем, разберём старую конструкцию, вывезем её и установим новую — всё за один выезд.
              </p>
              <a href={SITE.phoneTel} className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-flex' }}>
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section className="section" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Заказать демонтаж</h2>
            <p>Оставьте заявку — перезвоним в течение 15 минут</p>
          </div>
          <div className="form-wrap">
            <OrderForm service="Демонтаж оградки" title="" />
          </div>
        </div>
      </section>

      <style>{`
        .advantages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
        .advantage-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px 20px; }
        .advantage-check { width: 36px; height: 36px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; margin-bottom: 12px; }
        .advantage-card h3 { font-size: 0.975rem; font-weight: 700; margin-bottom: 8px; }
        .advantage-card p { font-size: 0.875rem; color: var(--text-light); line-height: 1.55; }
        .info-block { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 32px; display: flex; gap: 24px; align-items: flex-start; }
        .info-block-icon { font-size: 2rem; flex-shrink: 0; }
        .info-block h2 { font-size: 1.3rem; font-weight: 700; margin-bottom: 12px; }
        .info-block p { font-size: 0.95rem; color: var(--text-light); line-height: 1.65; }
        .form-wrap { max-width: 640px; margin: 0 auto; }
        @media (max-width: 600px) { .info-block { flex-direction: column; gap: 12px; } }
      `}</style>

      <RelatedLinks links={[
        { href: '/ustanovka',              label: 'Установка оградок' },
        { href: '/pokraska-ogradki',       label: 'Покраска оградок' },
        { href: '/remont-ogradki',         label: 'Ремонт оградок' },
        { href: '/blagoustrojstvo-mogily', label: 'Благоустройство могил' },
        { href: '/catalog',                label: 'Каталог оградок' },
      ]}/>
    </>
  );
}
