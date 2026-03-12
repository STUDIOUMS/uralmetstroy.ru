// app/blagoustrojstvo-mogily/page.tsx — Благоустройство могил
import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Благоустройство могил в Нижнем Тагиле — от 3 000 ₽ | УралМетСтрой',
  description: `Благоустройство и уход за могилами в ${SITE.city}. Уборка, выравнивание, насыпка щебня, посадка растений, покраска оградки. От 3 000 ₽. Звоните: ${SITE.phone}`,
  alternates: { canonical: '/blagoustrojstvo-mogily' },
  openGraph: {
    title:       'Благоустройство могил в Нижнем Тагиле — от 3 000 ₽ | УралМетСтрой',
    description: `Благоустройство и уход за могилами в ${SITE.city}. Уборка, выравнивание, насыпка щебня, посадка растений, покраска оградки. От 3 000 ₽.`,
    url:         '/blagoustrojstvo-mogily',
    images:      [{ url: '/img/og-default.jpg', width: 1200, height: 630, alt: 'Благоустройство могил — УралМетСтрой' }],
  },
};

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Благоустройство могил',
  description: 'Полный комплекс работ по благоустройству и уходу за могилой: уборка, выравнивание, насыпка, озеленение',
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
    price: '3000',
  },
};

const BREADCRUMB_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Услуги', href: '/#services' },
  { label: 'Благоустройство могил' },
];

const ADVANTAGES = [
  { title: 'Уборка и выравнивание', desc: 'Расчищаем участок, выравниваем поверхность, убираем мусор и сорняки' },
  { title: 'Насыпка щебня или песка', desc: 'Засыпаем участок щебнем, гравием или цветным песком для опрятного вида' },
  { title: 'Посадка растений', desc: 'Высаживаем многолетние цветы и кустарники, ухоженный вид на весь сезон' },
  { title: 'Покраска оградки в комплексе', desc: 'При заказе полного благоустройства покрасим оградку со скидкой' },
];

const PRICE_ROWS = [
  { type: 'Базовое', work: 'Уборка, выравнивание', price: 'от 3 000 ₽' },
  { type: 'Стандарт', work: 'Уборка + насыпка щебня + покраска оградки', price: 'от 5 000 ₽' },
  { type: 'Полное', work: 'Всё включено + посадка растений', price: 'от 8 000 ₽' },
];

export default function BlagoustrojstvoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />

      <Breadcrumb items={BREADCRUMB_ITEMS} />

      {/* PAGE HERO */}
      <section className="page-hero" style={{ backgroundImage: "url('/img/slide3.jpg')" }}>
        <div className="container">
          <h1>Благоустройство могил</h1>
          <p className="hero-desc">
            Полный уход за могилой — от уборки и выравнивания до насыпки щебня и посадки растений.
            Приведём захоронение в порядок бережно и профессионально.
          </p>
          <div className="hero-badges">
            {['От 3 000 ₽', 'Уборка и выравнивание', 'Насыпка щебня', 'Посадка растений'].map(b => (
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
            <h2>Что входит в услугу</h2>
            <p>Берём на себя весь уход — вам не придётся приезжать самостоятельно</p>
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

      {/* PRICE TABLE */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Цены на благоустройство</h2>
            <p>Выберите подходящий пакет или запросите индивидуальный расчёт</p>
          </div>
          <div className="table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Пакет</th>
                  <th>Состав работ</th>
                  <th>Стоимость</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_ROWS.map(r => (
                  <tr key={r.type}>
                    <td><strong>{r.type}</strong></td>
                    <td>{r.work}</td>
                    <td><strong>{r.price}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-note">
            Работаем на всех кладбищах {SITE.city} и {SITE.region}.{' '}
            <a href={SITE.phoneTel}>{SITE.phone}</a>
          </p>
        </div>
      </section>

      {/* ORDER FORM */}
      <section className="section" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Заказать благоустройство</h2>
            <p>Перезвоним и согласуем состав работ и удобное время</p>
          </div>
          <div className="form-wrap">
            <OrderForm service="Благоустройство могилы" title="" />
          </div>
        </div>
      </section>

      <style>{`
        .advantages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
        .advantage-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px 20px; }
        .advantage-check { width: 36px; height: 36px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; margin-bottom: 12px; }
        .advantage-card h3 { font-size: 0.975rem; font-weight: 700; margin-bottom: 8px; }
        .advantage-card p { font-size: 0.875rem; color: var(--text-light); line-height: 1.55; }
        .table-wrap { overflow-x: auto; border-radius: var(--radius-lg); border: 1px solid var(--border); }
        .table-note { margin-top: 14px; font-size: 0.875rem; color: var(--text-light); }
        .table-note a { color: var(--primary); font-weight: 600; }
        .form-wrap { max-width: 640px; margin: 0 auto; }
      `}</style>

      <RelatedLinks links={[
        { href: '/ustanovka',              label: 'Установка оградок' },
        { href: '/pokraska-ogradki',       label: 'Покраска оградок' },
        { href: '/remont-ogradki',         label: 'Ремонт оградок' },
        { href: '/kovanye-kresty',         label: 'Кованые кресты' },
        { href: '/kovanye-tsvetniki',      label: 'Кованые цветники' },
        { href: '/blog/blagoustrojstvo-mogily-poshagovo', label: 'Благоустройство пошагово' },
        { href: '/catalog',                label: 'Каталог оградок' },
      ]}/>
    </>
  );
}
