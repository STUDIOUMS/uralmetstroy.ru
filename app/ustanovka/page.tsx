// app/ustanovka/page.tsx — Установка оградок
import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Установка оградок в Нижнем Тагиле — от 2 000 ₽ | УралМетСтрой',
  description: `Профессиональная установка оградок на кладбище в ${SITE.city}. Бетонирование столбиков, выезд в день заказа, гарантия на монтаж. Цена от 2 000 ₽. Звоните: ${SITE.phone}`,
  alternates: { canonical: '/ustanovka' },
  openGraph: {
    title:       'Установка оградок в Нижнем Тагиле — от 2 000 ₽ | УралМетСтрой',
    description: `Профессиональная установка оградок на кладбище в ${SITE.city}. Бетонирование столбиков, выезд в день заказа, гарантия на монтаж. Цена от 2 000 ₽.`,
    url:         '/ustanovka',
    images:      [{ url: '/img/og-default.jpg', width: 1200, height: 630, alt: 'Установка оградок — УралМетСтрой' }],
  },
};

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Установка оградок',
  description: 'Профессиональный монтаж оградок на кладбище с бетонированием столбиков',
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
    price: '2000',
    priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: 2000 },
  },
};

const BREADCRUMB_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Услуги', href: '/#services' },
  { label: 'Установка оградок' },
];

const ADVANTAGES = [
  { title: 'Бетонирование столбиков', desc: 'Надёжная фиксация в грунте на любой глубине — оградка простоит десятилетия' },
  { title: 'Выезд в день заказа', desc: 'Принимаем заявки с утра и выезжаем уже сегодня при наличии свободного мастера' },
  { title: 'Опыт с 2010 года', desc: 'Более 500 установленных оградок на всех кладбищах Нижнего Тагила' },
  { title: 'Гарантия на монтаж', desc: 'Даём письменную гарантию на все виды монтажных работ сроком 3 года' },
];

const STEPS = [
  { n: '01', title: 'Замер', desc: 'Выезжаем на кладбище, измеряем участок и согласуем размер оградки' },
  { n: '02', title: 'Изготовление', desc: 'Производим оградку на нашем цеху по точным размерам участка за 1–3 дня' },
  { n: '03', title: 'Доставка', desc: 'Привозим оградку на кладбище в удобное для вас время' },
  { n: '04', title: 'Монтаж', desc: 'Устанавливаем с бетонированием столбиков. Принимаете работу и платите остаток' },
];

const PRICE_ROWS = [
  { type: 'Эконом (сварная)', size: '1.5 × 1 м', price: 'от 2 000 ₽' },
  { type: 'Стандарт (сварная)', size: '1.8 × 1 м', price: 'от 2 500 ₽' },
  { type: 'Кованая оградка', size: '1.8 × 1 м', price: 'от 3 500 ₽' },
];

export default function UstanovkaPage() {
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
          <h1>Установка оградок на кладбище</h1>
          <p className="hero-desc">
            Профессиональный монтаж в {SITE.city} — бетонирование столбиков, выезд в день заказа.
            Опыт с {SITE.workingFrom} года, гарантия на все работы.
          </p>
          <div className="hero-badges">
            {['От 2 000 ₽', 'Выезд в день заказа', 'Гарантия 3 года', 'Опыт 15+ лет'].map(b => (
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
            <p>Надёжный монтаж с гарантией — от замера до сдачи работ</p>
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

      {/* STEPS */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Этапы работы</h2>
            <p>От первого звонка до готовой оградки — 4 простых шага</p>
          </div>
          <div className="steps-grid-4">
            {STEPS.map(s => (
              <div key={s.n} className="step-card">
                <div className="step-num-lg">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE TABLE */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Стоимость установки</h2>
            <p>Цены указаны за монтаж одной оградки с бетонированием</p>
          </div>
          <div className="table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Тип оградки</th>
                  <th>Размер</th>
                  <th>Стоимость установки</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_ROWS.map(r => (
                  <tr key={r.type}>
                    <td>{r.type}</td>
                    <td>{r.size}</td>
                    <td><strong>{r.price}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-note">
            Точная стоимость зависит от сложности участка и грунта.{' '}
            <a href={SITE.phoneTel}>{SITE.phone}</a> — рассчитаем бесплатно.
          </p>
        </div>
      </section>

      {/* ORDER FORM */}
      <section className="section bg-light" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Заказать установку оградки</h2>
            <p>Перезвоним в течение 15 минут и согласуем удобное время выезда</p>
          </div>
          <div className="form-wrap">
            <OrderForm service="Установка оградки" title="" />
          </div>
        </div>
      </section>

      <style>{`
        .advantages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
        .advantage-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px 20px; }
        .advantage-check { width: 36px; height: 36px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; margin-bottom: 12px; }
        .advantage-card h3 { font-size: 0.975rem; font-weight: 700; margin-bottom: 8px; }
        .advantage-card p { font-size: 0.875rem; color: var(--text-light); line-height: 1.55; }
        .steps-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .step-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px 20px; }
        .step-num-lg { font-size: 2.5rem; font-weight: 800; color: rgba(17,17,17,.07); line-height: 1; margin-bottom: 10px; }
        .step-card h3 { font-size: 0.975rem; font-weight: 700; margin-bottom: 8px; }
        .step-card p { font-size: 0.875rem; color: var(--text-light); line-height: 1.55; }
        .table-wrap { overflow-x: auto; border-radius: var(--radius-lg); border: 1px solid var(--border); }
        .table-note { margin-top: 14px; font-size: 0.875rem; color: var(--text-light); }
        .table-note a { color: var(--primary); font-weight: 600; }
        .form-wrap { max-width: 640px; margin: 0 auto; }
        @media (max-width: 900px) { .steps-grid-4 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .steps-grid-4 { grid-template-columns: 1fr; } }
      `}</style>

      <RelatedLinks links={[
        { href: '/pokraska-ogradki',       label: 'Покраска оградок' },
        { href: '/remont-ogradki',         label: 'Ремонт оградок' },
        { href: '/demontazh-ogradki',      label: 'Демонтаж оградок' },
        { href: '/blagoustrojstvo-mogily', label: 'Благоустройство могил' },
        { href: '/catalog',                label: 'Каталог оградок' },
        { href: '/cena-ogradki',           label: 'Цены' },
      ]}/>
    </>
  );
}
