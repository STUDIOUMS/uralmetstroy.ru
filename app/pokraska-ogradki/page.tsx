// app/pokraska-ogradki/page.tsx — Покраска оградок
import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Покраска оградок в Нижнем Тагиле — от 1 500 ₽ | УралМетСтрой',
  description: `Профессиональная покраска оградок на кладбище в ${SITE.city}. Антикоррозийная грунтовка, любой цвет RAL, выезд на кладбище. Цена от 1 500 ₽. Звоните: ${SITE.phone}`,
  alternates: { canonical: '/pokraska-ogradki' },
  openGraph: {
    title:       'Покраска оградок в Нижнем Тагиле — от 1 500 ₽ | УралМетСтрой',
    description: `Профессиональная покраска оградок на кладбище в ${SITE.city}. Антикоррозийная грунтовка, любой цвет RAL, выезд на кладбище. Цена от 1 500 ₽.`,
    url:         '/pokraska-ogradki',
    images:      [{ url: '/img/og-default.jpg', width: 1200, height: 630, alt: 'Покраска оградок — УралМетСтрой' }],
  },
};

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Покраска оградок',
  description: 'Антикоррозийная грунтовка и покраска оградок с выездом на кладбище',
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
    price: '1500',
  },
};

const BREADCRUMB_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Услуги', href: '/#services' },
  { label: 'Покраска оградок' },
];

const ADVANTAGES = [
  { title: 'Антикоррозийная грунтовка', desc: 'Наносим грунт перед покраской — защита металла от ржавчины на годы' },
  { title: 'Выезд на кладбище', desc: 'Приезжаем прямо к могиле, всё необходимое привозим с собой' },
  { title: 'Любой цвет RAL', desc: 'Подберём любой оттенок из палитры RAL — чёрный, коричневый, бронза и другие' },
  { title: 'Срок службы 3–5 лет', desc: 'Профессиональная покраска в 2 слоя держится 3–5 лет при правильной подготовке' },
];

const PRICE_ROWS = [
  { type: 'Малая оградка', size: 'до 1.5 × 1 м', price: 'от 1 500 ₽' },
  { type: 'Стандарт', size: '1.8 × 1 м', price: 'от 2 000 ₽' },
  { type: 'Большая оградка', size: '2.5 × 1.5 м и более', price: 'от 3 000 ₽' },
];

export default function PokraskaPage() {
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
          <h1>Покраска оградок на кладбище</h1>
          <p className="hero-desc">
            Обновим внешний вид оградки прямо на кладбище — антикоррозийная грунтовка,
            покраска в любой цвет RAL. Результат держится 3–5 лет.
          </p>
          <div className="hero-badges">
            {['От 1 500 ₽', 'Выезд на кладбище', 'Любой цвет RAL', 'Срок 3–5 лет'].map(b => (
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
            <h2>Наши преимущества</h2>
            <p>Профессиональная покраска с гарантированным результатом</p>
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

      {/* HOW WE WORK */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Как проходит покраска</h2>
            <p>Три этапа для долговечного результата</p>
          </div>
          <div className="steps-grid-3">
            {[
              { n: '01', title: 'Подготовка', desc: 'Очищаем оградку от ржавчины и старой краски металлической щёткой' },
              { n: '02', title: 'Грунтовка', desc: 'Наносим антикоррозийный грунт для надёжной защиты металла' },
              { n: '03', title: 'Покраска', desc: 'Красим в 2 слоя эмалью выбранного цвета, даём просохнуть' },
            ].map(s => (
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
            <h2>Цены на покраску</h2>
            <p>Стоимость зависит от размера оградки и состояния металла</p>
          </div>
          <div className="table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Размер оградки</th>
                  <th>Параметры</th>
                  <th>Стоимость</th>
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
            В стоимость включены: грунтовка, 2 слоя краски, выезд на кладбище в черте {SITE.city}.{' '}
            <a href={SITE.phoneTel}>{SITE.phone}</a>
          </p>
        </div>
      </section>

      {/* ORDER FORM */}
      <section className="section bg-light" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Заказать покраску оградки</h2>
            <p>Перезвоним и согласуем удобное время выезда</p>
          </div>
          <div className="form-wrap">
            <OrderForm service="Покраска оградки" title="" />
          </div>
        </div>
      </section>

      <style>{`
        .advantages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
        .advantage-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px 20px; }
        .advantage-check { width: 36px; height: 36px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; margin-bottom: 12px; }
        .advantage-card h3 { font-size: 0.975rem; font-weight: 700; margin-bottom: 8px; }
        .advantage-card p { font-size: 0.875rem; color: var(--text-light); line-height: 1.55; }
        .steps-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .step-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px 20px; }
        .step-num-lg { font-size: 2.5rem; font-weight: 800; color: rgba(17,17,17,.07); line-height: 1; margin-bottom: 10px; }
        .step-card h3 { font-size: 0.975rem; font-weight: 700; margin-bottom: 8px; }
        .step-card p { font-size: 0.875rem; color: var(--text-light); line-height: 1.55; }
        .table-wrap { overflow-x: auto; border-radius: var(--radius-lg); border: 1px solid var(--border); }
        .table-note { margin-top: 14px; font-size: 0.875rem; color: var(--text-light); }
        .table-note a { color: var(--primary); font-weight: 600; }
        .form-wrap { max-width: 640px; margin: 0 auto; }
        @media (max-width: 700px) { .steps-grid-3 { grid-template-columns: 1fr; } }
      `}</style>

      <RelatedLinks links={[
        { href: '/ustanovka',              label: 'Установка оградок' },
        { href: '/remont-ogradki',         label: 'Ремонт оградок' },
        { href: '/demontazh-ogradki',      label: 'Демонтаж оградок' },
        { href: '/blagoustrojstvo-mogily', label: 'Благоустройство могил' },
        { href: '/catalog',                label: 'Каталог оградок' },
        { href: '/blog/pokraska-ogradki-svoimi-rukami', label: 'Покраска своими руками' },
      ]}/>
    </>
  );
}
