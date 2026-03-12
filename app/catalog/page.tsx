// app/catalog/page.tsx — Каталог оградок
import type { Metadata } from 'next';
import { PRODUCTS, SERVICES } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Каталог оградок на могилу — кованые и сварные | УралМетСтрой',
  description: 'Каталог кованых и сварных оградок для кладбища в Нижнем Тагиле. 20+ моделей от 8 000 ₽. Установка под ключ. Фото, цены, характеристики.',
  alternates: { canonical: '/catalog' },
};

const CATEGORIES = [
  { id: 'kovanye',    label: 'Кованые',    desc: 'Художественная ковка, гарантия 3–5 лет' },
  { id: 'svarnye',    label: 'Сварные',    desc: 'Доступная цена, быстрое изготовление' },
  { id: 'komplekty',  label: 'Комплекты',  desc: 'Оградка + столик + скамейки со скидкой' },
];

export default function CatalogPage() {
  const kovanye    = PRODUCTS.filter(p => p.category === 'ogradki' && (p.specs['Тип'] === 'Кованая' || p.guarantee === '5 лет'));
  const svarnye    = PRODUCTS.filter(p => p.category === 'ogradki' && p.specs['Тип'] === 'Сварная');
  const komplekty  = PRODUCTS.filter(p => p.category === 'komplekty');

  return (
    <>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Каталог оградок' }]}/>

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Каталог оградок на могилу</h1>
          <p className="hero-desc">Кованые и сварные оградки собственного производства. {PRODUCTS.filter(p=>p.category==='ogradki').length}+ моделей от 8 000 ₽. Установка по всем кладбищам Нижнего Тагила.</p>
          <div className="hero-badges">
            {['Собственное производство','Гарантия 3–5 лет','Изготовление за 1–3 дня','Бесплатный замер'].map(b => (
              <span key={b} className="hero-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Фильтр-навигация */}
      <div style={{ background: 'var(--secondary-bg)', padding: '16px 0', borderBottom: '1px solid var(--border)', position: 'sticky', top: '70px', zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <a key={c.id} href={`#${c.id}`}
              style={{ padding: '7px 18px', borderRadius: '100px', background: 'white', border: '1px solid var(--border)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', color: 'var(--text)', transition: 'all 0.2s' }}
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>

      {/* Кованые */}
      <section className="section" id="kovanye">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left' }}>
            <h2>Кованые оградки</h2>
            <p>Художественная ковка, порошковое покрытие, гарантия 3–5 лет</p>
          </div>
          <div className="product-grid">
            {kovanye.map(p => <ProductCard key={p.slug} product={p}/>)}
          </div>
        </div>
      </section>

      {/* Сварные */}
      {svarnye.length > 0 && (
        <section className="section bg-light" id="svarnye">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'left' }}>
              <h2>Сварные оградки</h2>
              <p>Доступная цена, изготовление за 1–2 дня</p>
            </div>
            <div className="product-grid">
              {svarnye.map(p => <ProductCard key={p.slug} product={p}/>)}
            </div>
          </div>
        </section>
      )}

      {/* Комплекты */}
      <section className="section" id="komplekty">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left' }}>
            <h2>Готовые комплекты</h2>
            <p>Оградка + столик + скамейки — всё под ключ со скидкой 10%</p>
          </div>
          <div className="product-grid">
            {komplekty.map(p => <ProductCard key={p.slug} product={p}/>)}
          </div>
        </div>
      </section>

      {/* Форма */}
      <section className="section bg-light" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Не нашли подходящую модель?</h2>
            <p>Изготовим по вашим размерам и пожеланиям</p>
          </div>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <OrderForm service="Оградка по индивидуальному проекту"/>
          </div>
        </div>
      </section>

      <RelatedLinks links={[
        { href: '/ritualnye-izdeliya',        label: 'Ритуальные изделия' },
        { href: '/kovanye-kresty',            label: 'Кованые кресты' },
        { href: '/kovanye-tsvetniki',         label: 'Кованые цветники' },
        { href: '/metallicheskie-pamyatniki', label: 'Металлические памятники' },
        { href: '/stolik-i-skameyka',         label: 'Столики и скамейки' },
        { href: '/cena-ogradki',              label: 'Цены на оградки' },
        { href: '/ustanovka',                 label: 'Установка оградок' },
        { href: '/nashi-raboty',              label: 'Наши работы' },
      ]}/>
    </>
  );
}
