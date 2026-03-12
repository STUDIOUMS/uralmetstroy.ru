// app/remont-ogradki/page.tsx — Ремонт оградок
import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Ремонт оградок в Нижнем Тагиле — от 800 ₽ | УралМетСтрой',
  description: `Профессиональный ремонт оградок на кладбище в ${SITE.city}. Сварка, выравнивание, замена секций. Выезд в день обращения. Цена от 800 ₽. Звоните: ${SITE.phone}`,
  alternates: { canonical: '/remont-ogradki' },
  openGraph: {
    title:       'Ремонт оградок в Нижнем Тагиле — от 800 ₽ | УралМетСтрой',
    description: `Профессиональный ремонт оградок на кладбище в ${SITE.city}. Сварка, выравнивание, замена секций. Выезд в день обращения.`,
    url:         '/remont-ogradki',
    images:      [{ url: '/img/og-default.jpg', width: 1200, height: 630, alt: 'Ремонт оградок — УралМетСтрой' }],
  },
};

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Ремонт оградок',
  description: 'Сварка, выравнивание и замена секций оградок на кладбище с выездом в день обращения',
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
    price: '800',
  },
};

const BREADCRUMB_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Услуги', href: '/#services' },
  { label: 'Ремонт оградок' },
];

const ADVANTAGES = [
  { title: 'Сварка и восстановление', desc: 'Варим лопнувшие швы, восстанавливаем повреждённые секции и элементы декора' },
  { title: 'Выравнивание столбиков', desc: 'Выправляем накренившиеся столбики и укрепляем основание' },
  { title: 'Замена секций', desc: 'Изготовим и установим новые секции взамен повреждённых или утраченных' },
  { title: 'Выезд в день обращения', desc: 'Принимаем звонки с утра и, как правило, выезжаем в тот же день' },
];

const PRICE_ROWS = [
  { type: 'Мелкий ремонт', work: 'Подварка шва, правка прута', price: 'от 800 ₽' },
  { type: 'Средний ремонт', work: 'Замена секции, выравнивание', price: 'от 2 000 ₽' },
  { type: 'Капитальный ремонт', work: 'Полное восстановление', price: 'от 4 000 ₽' },
];

export default function RemontPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />

      <Breadcrumb items={BREADCRUMB_ITEMS} />

      {/* PAGE HERO */}
      <section className="page-hero" style={{ backgroundImage: "url('/img/slide2.jpg')" }}>
        <div className="container">
          <h1>Ремонт оградок на кладбище</h1>
          <p className="hero-desc">
            Восстановим оградку любой сложности — сварка, выравнивание, замена секций.
            Выезд в день обращения по всем кладбищам {SITE.city}.
          </p>
          <div className="hero-badges">
            {['От 800 ₽', 'Выезд в день звонка', 'Сварочные работы', 'Замена секций'].map(b => (
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
            <h2>Что мы ремонтируем</h2>
            <p>Любые виды повреждений — от мелкой правки до полного восстановления</p>
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
            <h2>Цены на ремонт</h2>
            <p>Точная стоимость определяется после осмотра оградки</p>
          </div>
          <div className="table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Вид ремонта</th>
                  <th>Что входит</th>
                  <th>Стоимость</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_ROWS.map(r => (
                  <tr key={r.type}>
                    <td>{r.type}</td>
                    <td>{r.work}</td>
                    <td><strong>{r.price}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-note">
            Выезд для осмотра и расчёта — бесплатно.{' '}
            <a href={SITE.phoneTel}>{SITE.phone}</a>
          </p>
        </div>
      </section>

      {/* ORDER FORM */}
      <section className="section" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Вызвать мастера</h2>
            <p>Опишите проблему — перезвоним и согласуем время выезда</p>
          </div>
          <div className="form-wrap">
            <OrderForm service="Ремонт оградки" title="" />
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
        { href: '/demontazh-ogradki',      label: 'Демонтаж оградок' },
        { href: '/blagoustrojstvo-mogily', label: 'Благоустройство могил' },
        { href: '/catalog',                label: 'Каталог оградок' },
        { href: '/blog/uhod-za-ogradkoj',  label: 'Уход за оградкой' },
      ]}/>
    </>
  );
}
