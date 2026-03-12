// app/cena-ogradki/page.tsx — Цены на оградки
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, PRODUCTS, SERVICES } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Цены на оградки в Нижнем Тагиле 2026 | УралМетСтрой — от 1 400 ₽/м.пог.',
  description: `Актуальные цены на кованые и сварные оградки, комплекты и услуги в ${SITE.city} 2026. Кованые от 2 500 ₽/м.пог., сварные от 1 400 ₽/м.пог. ${SITE.phone}`,
  alternates: { canonical: '/cena-ogradki' },
  openGraph: {
    title:       'Цены на оградки в Нижнем Тагиле 2026 | УралМетСтрой',
    description: `Актуальные цены на кованые и сварные оградки в ${SITE.city} 2026. Кованые от 2 500 ₽/м.пог., сварные от 1 400 ₽/м.пог.`,
    url:         '/cena-ogradki',
    images:      [{ url: '/img/ogrady.jpg', width: 1200, height: 800, alt: 'Цены на оградки — УралМетСтрой' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone,
  priceRange: '₽₽',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address,
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    postalCode: SITE.zip,
    addressCountry: 'RU',
  },
  description: `Производство и продажа оградок в ${SITE.city}. Кованые от 2 500 ₽/м.пог., сварные от 1 400 ₽/м.пог.`,
};

const BREADCRUMB_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Цены на оградки' },
];

const KOMPLEKTY_ROWS = [
  { title: 'Комплект «Стандарт»', desc: 'Оградка + столик + скамейка, скидка 10%', price: 'от 25 000 ₽', slug: 'komplekt-standart' },
  { title: 'Кованый комплект', desc: 'Кованая оградка + круглый столик + 2 скамейки', price: 'от 35 000 ₽', slug: 'kovanyj-komplekt' },
];

const OGRADKI = PRODUCTS.filter(p => p.category === 'ogradki');
const KOMPLEKTY = PRODUCTS.filter(p => p.category === 'komplekty');

export default function CenaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      <Breadcrumb items={BREADCRUMB_ITEMS} />

      {/* PAGE HERO */}
      <section className="page-hero" style={{ backgroundImage: "url('/img/ogrady.jpg')" }}>
        <div className="container">
          <h1>Цены на оградки и услуги 2026</h1>
          <p className="hero-desc">
            Актуальные цены от производителя. Работаем в {SITE.city} с {SITE.workingFrom} года.
            Индивидуальный расчёт — бесплатно.
          </p>
          <div className="hero-badges">
            {['Кованые от 2 500 ₽/м.пог.', 'Сварные от 1 400 ₽/м.пог.', 'Установка от 2 000 ₽', 'Без посредников'].map(b => (
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

      {/* OGRADKI TABLE */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Оградки — цены 2026</h2>
            <p>Собственное производство, без наценки посредников. <strong>Цены указаны за погонный метр периметра.</strong></p>
          </div>
          <div className="table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Модель</th>
                  <th>Тип</th>
                  <th>Цена</th>
                  <th>Подробнее</th>
                </tr>
              </thead>
              <tbody>
                {OGRADKI.map(p => (
                  <tr key={p.slug}>
                    <td><strong>{p.title}</strong></td>
                    <td>{p.specs['Тип'] ?? '—'}</td>
                    <td>
                      <strong className="price-accent">{p.priceLabel}</strong>
                      {p.priceOld && (
                        <span className="price-old-inline"> {p.priceOld.toLocaleString('ru-RU')} ₽</span>
                      )}
                    </td>
                    <td>
                      <Link href={`/${p.slug}`} className="btn btn-outline btn-sm">
                        Смотреть
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* KOMPLEKTY TABLE */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Комплекты — оградка + столик + скамейка</h2>
            <p>Выгоднее, чем покупать по отдельности — скидка до 10%</p>
          </div>
          <div className="table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Комплект</th>
                  <th>Состав</th>
                  <th>Цена</th>
                  <th>Подробнее</th>
                </tr>
              </thead>
              <tbody>
                {KOMPLEKTY.map(p => (
                  <tr key={p.slug}>
                    <td><strong>{p.title}</strong></td>
                    <td>{p.description}</td>
                    <td><strong className="price-accent">{p.priceLabel}</strong></td>
                    <td>
                      <Link href={`/${p.slug}`} className="btn btn-outline btn-sm">
                        Смотреть
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SERVICES TABLE */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Услуги — цены 2026</h2>
            <p>Установка, покраска, ремонт, демонтаж и благоустройство</p>
          </div>
          <div className="table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Услуга</th>
                  <th>Описание</th>
                  <th>Цена</th>
                  <th>Подробнее</th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map(s => (
                  <tr key={s.slug}>
                    <td><strong>{s.title}</strong></td>
                    <td>{s.description}</td>
                    <td><strong className="price-accent">{s.priceLabel}</strong></td>
                    <td>
                      <Link href={`/${s.slug}`} className="btn btn-outline btn-sm">
                        Подробнее
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="section bg-light">
        <div className="container">
          <div className="cta-block">
            <div className="cta-block-text">
              <h2>Цена зависит от размера — позвоните для расчёта</h2>
              <p>
                Все цены указаны «от». Точная стоимость зависит от размера участка, сложности работ
                и выбранной модели. Рассчитаем бесплатно за 5 минут по телефону.
              </p>
            </div>
            <div className="cta-block-actions">
              <a href={SITE.phoneTel} className="btn btn-primary btn-lg">{SITE.phone}</a>
              <a href={`https://wa.me/${SITE.phoneRaw}`} className="btn btn-wa btn-lg" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section className="section" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Получить точный расчёт</h2>
            <p>Оставьте заявку — перезвоним и рассчитаем стоимость под ваш запрос</p>
          </div>
          <div className="form-wrap">
            <OrderForm service="" title="" />
          </div>
        </div>
      </section>

      <style>{`
        .table-wrap { overflow-x: auto; border-radius: var(--radius-lg); border: 1px solid var(--border); }
        .price-accent { color: var(--primary); font-size: 1rem; }
        .price-old-inline { font-size: 0.8rem; color: var(--text-muted); text-decoration: line-through; margin-left: 6px; }
        .cta-block { background: var(--primary); color: white; border-radius: var(--radius-xl); padding: 40px 36px; display: flex; align-items: center; justify-content: space-between; gap: 28px; flex-wrap: wrap; }
        .cta-block-text h2 { font-size: 1.4rem; font-weight: 700; margin-bottom: 10px; }
        .cta-block-text p { font-size: 0.9rem; color: rgba(255,255,255,.8); max-width: 520px; line-height: 1.6; }
        .cta-block-actions { display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0; }
        .form-wrap { max-width: 640px; margin: 0 auto; }
        @media (max-width: 700px) { .cta-block { flex-direction: column; text-align: center; } .cta-block-text p { max-width: 100%; } }
      `}</style>

      <RelatedLinks links={[
        { href: '/catalog',                   label: 'Каталог оградок' },
        { href: '/ritualnye-izdeliya',        label: 'Ритуальные изделия' },
        { href: '/kovanye-kresty',            label: 'Кованые кресты' },
        { href: '/kovanye-tsvetniki',         label: 'Кованые цветники' },
        { href: '/metallicheskie-pamyatniki', label: 'Металлические памятники' },
        { href: '/dostavka-i-oplata',         label: 'Доставка и оплата' },
        { href: '/garantii',                  label: 'Гарантии' },
        { href: '/blog/ceny-na-ogradki-2026', label: 'Статья о ценах 2026' },
      ]}/>
    </>
  );
}
