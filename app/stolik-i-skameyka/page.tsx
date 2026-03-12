// app/stolik-i-skameyka/page.tsx — Столики и скамейки
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import OrderForm from '@/components/OrderForm';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Столики и скамейки для кладбища в Нижнем Тагиле | УралМетСтрой',
  description: `Металлические столики, скамейки и лавочки для могилы. Кованые и сварные. От 3 500 ₽. Установка под ключ в ${SITE.city}.`,
  alternates: { canonical: `${SITE.url}/stolik-i-skameyka` },
  openGraph: {
    title:       'Столики и скамейки для кладбища в Нижнем Тагиле | УралМетСтрой',
    description: `Металлические столики, скамейки и лавочки для могилы. Кованые и сварные. От 3 500 ₽. Установка под ключ.`,
    url:         '/stolik-i-skameyka',
    images:      [{ url: '/img/stolik-skameyka.jpg', width: 1200, height: 800, alt: 'Столики и скамейки для кладбища — УралМетСтрой' }],
  },
};

const STOLIKI   = PRODUCTS.filter(p => p.slug.startsWith('stolik'));
const SKAMEJKI  = PRODUCTS.filter(p => p.slug.startsWith('skameyka'));
const LAVOCHKI  = PRODUCTS.filter(p => p.slug.startsWith('lavochka'));
const KOMPLEKTY = PRODUCTS.filter(p => p.category === 'komplekty');

export default function StolikPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Столики и скамейки' }]}/>

      <section className="page-hero" style={{ backgroundImage: "url('/img/stolik-skameyka.jpg')" }}>
        <div className="container">
          <h1>Столики, скамейки и лавочки для кладбища</h1>
          <p className="hero-desc">
            Кованые и сварные ритуальные столики, лавочки и скамейки собственного производства.
            Установка под ключ. Гарантия от 3 лет.
          </p>
          <div className="hero-badges" style={{ justifyContent: 'center', marginTop: '16px' }}>
            {['От 3 500 ₽', 'Кованые и сварные', 'Гарантия 3–5 лет', 'Под ключ'].map(b => (
              <span key={b} className="hero-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Столики */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Столики</h2>
            <p>Круглые и прямоугольные металлические столики для могилы</p>
          </div>
          <div className="product-grid">
            {STOLIKI.map(p => <ProductCard key={p.slug} product={p}/>)}
          </div>
        </div>
      </section>

      {/* Лавочки */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Лавочки для кладбища</h2>
            <p>Кованые, ковано-сварные и сварные лавочки — со спинкой и без</p>
          </div>
          <div className="product-grid">
            {LAVOCHKI.map(p => <ProductCard key={p.slug} product={p}/>)}
          </div>
        </div>
      </section>

      {/* Скамейки */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Скамейки</h2>
            <p>Одноместные и двухместные скамейки из профтрубы</p>
          </div>
          <div className="product-grid">
            {SKAMEJKI.map(p => <ProductCard key={p.slug} product={p}/>)}
          </div>
        </div>
      </section>

      {/* Комплекты */}
      {KOMPLEKTY.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Готовые комплекты</h2>
              <p>Оградка + столик + скамейки — всё в едином стиле, выгоднее чем по отдельности</p>
            </div>
            <div className="product-grid">
              {KOMPLEKTY.map(p => <ProductCard key={p.slug} product={p}/>)}
            </div>
          </div>
        </section>
      )}

      {/* Преимущества */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Почему заказывают у нас</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { title: 'Собственное производство', desc: 'Изготавливаем сами — без посредников. Любой размер по вашим меркам.' },
              { title: 'Установка под ключ',       desc: 'Привезём и установим (бетонирование, выравнивание). Без лишних забот.' },
              { title: 'Гарантия 3 года',          desc: 'Официальный гарантийный талон на каждое изделие.' },
              { title: 'Скидка при заказе вместе', desc: 'Заказываете столик и скамейку вместе — скидка 10%.' },
            ].map(a => (
              <div key={a.title} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '8px', fontSize: '0.975rem' }}>{a.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Форма */}
      <section className="section" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Рассчитать стоимость</h2>
            <p>Оставьте заявку — перезвоним в течение 15 минут</p>
          </div>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <OrderForm service="Столик/скамейка" title=""/>
          </div>
        </div>
      </section>
    </>
  );
}
