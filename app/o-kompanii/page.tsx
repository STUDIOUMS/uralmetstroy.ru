// app/o-kompanii/page.tsx
import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'О компании УралМетСтрой — производство кованых оградок с 2010 года',
  description: 'УралМетСтрой — производство кованых и сварных оградок с 2010 года в Нижнем Тагиле. Собственный кузнечный цех, гарантия 3–5 лет.',
  alternates: { canonical: `${SITE.url}/o-kompanii` },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      foundingDate: String(SITE.workingFrom),
      telephone: SITE.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address,
        addressLocality: SITE.city,
        postalCode: SITE.zip,
        addressCountry: 'RU',
      },
      description: `Производство кованых и сварных ритуальных изделий в ${SITE.city} с ${SITE.workingFrom} года.`,
    },
    {
      '@type': 'LocalBusiness',
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      priceRange: '₽₽',
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address,
        addressLocality: SITE.city,
        postalCode: SITE.zip,
        addressCountry: 'RU',
      },
    },
  ],
};

const ADVANTAGES = [
  { title: 'Собственное производство', desc: 'Кузнечный цех, сварка, покраска — всё в одном месте. Цены без посредников.' },
  { title: 'Гарантия 3–5 лет',         desc: 'На сварные изделия — 3 года, на кованые — 5 лет. Даём официальный гарантийный талон.' },
  { title: 'Все кладбища НТ',           desc: 'Работаем на 6 кладбищах Нижнего Тагила и по всей Свердловской области.' },
  { title: 'Бесплатный замер',          desc: 'Мастер приедет на кладбище, замерит участок и рассчитает точную стоимость.' },
];

const PRODUCTION = [
  { title: 'Кузнечный цех',     desc: 'Художественная ковка прутьев, завитков, розеток и декоративных элементов.' },
  { title: 'Сварочный участок', desc: 'Сборка каркаса, сварка профтруб, монтаж декора на кованые модели.' },
  { title: 'Покрасочная камера', desc: 'Нанесение порошковой краски и обжиг при температуре 200°C.' },
  { title: 'Контроль качества', desc: 'Каждое изделие проверяется мастером перед отгрузкой.' },
];

export default function OKompaniiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}/>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'О компании' }]}/>

      <section className="page-hero">
        <div className="container">
          <h1>О компании {SITE.name}</h1>
          <p className="hero-desc">Производство кованых и сварных ритуальных изделий с {SITE.workingFrom} года</p>
        </div>
      </section>

      {/* История */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>Наша история</h2>
              <p style={{ lineHeight: 1.75, marginBottom: '16px' }}>
                Компания «УралМетСтрой» основана в {SITE.workingFrom} году в Нижнем Тагиле. Производство расположено
                по адресу <strong>{SITE.address}</strong> (Кузнечный Двор, {SITE.city}).
              </p>
              <p style={{ lineHeight: 1.75, marginBottom: '16px' }}>
                Начинали с простых сварных оградок — сегодня выполняем полный цикл: от эскиза до установки.
                Кузнечный цех, сварочный участок, покрасочная камера, бригада монтажников.
              </p>
              <p style={{ lineHeight: 1.75 }}>
                За 15+ лет работы установили более 500 оградок на кладбищах Нижнего Тагила
                и Свердловской области. Каждый заказ выполняется по индивидуальным меркам.
              </p>
            </div>
            <div style={{ background: 'var(--secondary-bg)', borderRadius: 'var(--radius-xl)', padding: '36px' }}>
              <div className="trust-grid">
                {[
                  { num: '500+',      label: 'Установленных оградок' },
                  { num: '15+',       label: 'Лет на рынке' },
                  { num: '4.9★',      label: 'Средняя оценка' },
                  { num: '6',         label: 'Кладбищ НТ' },
                ].map(({ num, label }) => (
                  <div key={label} className="trust-item">
                    <div className="trust-num">{num}</div>
                    <div className="trust-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              .history-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* Производство */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Производство</h2>
            <p>Полный цикл — от металла до готового изделия на кладбище</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {PRODUCTION.map(p => (
              <div key={p.title} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '10px', fontSize: '1rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Почему мы */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Почему выбирают нас</h2>
            <p>Производитель напрямую — без посредников</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {ADVANTAGES.map((a, i) => (
              <div key={a.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ width: 36, height: 36, background: 'var(--primary)', color: 'white', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: '6px', fontSize: '0.95rem' }}>{a.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Форма */}
      <section className="section bg-light" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Рассчитать стоимость</h2>
            <p>Оставьте заявку — перезвоним в течение 15 минут</p>
          </div>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <OrderForm service="" title=""/>
          </div>
        </div>
      </section>

      <RelatedLinks links={[
        { href: '/otzyvy',          label: 'Отзывы клиентов' },
        { href: '/garantii',        label: 'Гарантии' },
        { href: '/nashi-raboty',    label: 'Наши работы' },
        { href: '/dostavka-i-oplata', label: 'Доставка и оплата' },
        { href: '/catalog',         label: 'Каталог оградок' },
        { href: '/kontakty',        label: 'Контакты' },
      ]}/>
    </>
  );
}
