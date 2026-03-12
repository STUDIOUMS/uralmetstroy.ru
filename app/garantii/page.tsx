// app/garantii/page.tsx — Гарантии на оградки и ритуальные изделия
import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Гарантии на оградки и ритуальные изделия — УралМетСтрой',
  description:
    'Гарантия на кованые оградки 5 лет, сварные 3 года, покраску 5 лет. Официальный гарантийный талон.',
  alternates: { canonical: '/garantii' },
  openGraph: {
    title:       'Гарантии на оградки и ритуальные изделия — УралМетСтрой',
    description: 'Гарантия на кованые оградки 5 лет, сварные 3 года, покраску 5 лет. Официальный гарантийный талон. Нижний Тагил.',
    url:         '/garantii',
    images:      [{ url: '/img/og-default.jpg', width: 1200, height: 630, alt: 'Гарантии УралМетСтрой' }],
  },
};

const GUARANTEE_SCHEMA = {
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
  },
  description:
    'Производитель оградок в Нижнем Тагиле. Гарантия на кованые изделия 5 лет, сварные 3 года.',
};

const BREADCRUMB_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Гарантии' },
];

const GUARANTEE_CARDS = [
  {
    icon: '🔩',
    title: 'Гарантия на изделие',
    bullets: ['Сварные оградки — 3 года', 'Кованые оградки — 5 лет', 'Столики и скамейки — 3 года'],
    accent: false,
  },
  {
    icon: '🎨',
    title: 'Гарантия на покрытие',
    bullets: ['Порошковая покраска — 5 лет', 'Без шелушения и выцветания', 'Устойчиво к UV и осадкам'],
    accent: true,
  },
  {
    icon: '🔧',
    title: 'Гарантия на установку',
    bullets: ['Монтаж и бетонирование — 3 года', 'Столбики не накренятся', 'Бесплатное устранение дефектов'],
    accent: false,
  },
  {
    icon: '🖌️',
    title: 'Покраска старых оградок',
    bullets: ['Однослойная покраска — 3 года', 'С грунтовкой в 2 слоя — 5 лет', 'Подбор цвета по RAL'],
    accent: false,
  },
];

const INCLUDED = [
  { title: 'Материалы', desc: 'Дефекты металла, трубы, прутьев — устраняем бесплатно' },
  { title: 'Сварные швы', desc: 'Трещины и разрывы сварки по вине производства — гарантийный ремонт' },
  { title: 'Покрытие', desc: 'Отслоение, пузыри, выцветание порошковой краски — перекраска за наш счёт' },
  { title: 'Монтаж', desc: 'Крен столбиков, просадка, нарушение геометрии после установки — исправляем' },
];

const EXCLUDED = [
  { title: 'Механические повреждения', desc: 'Вмятины, погнутые прутья от внешнего воздействия' },
  { title: 'Вандализм', desc: 'Повреждения, нанесённые третьими лицами умышленно' },
  { title: 'Неправильный уход', desc: 'Применение агрессивной химии, абразивов, неоговорённых средств' },
  { title: 'Естественный износ', desc: 'Царапины, потертости от многолетней эксплуатации вне гарантийного срока' },
];

const COUPON_ITEMS = [
  'Модель изделия и серийный номер',
  'Дата монтажа и адрес кладбища',
  'Гарантийный срок',
  'Подпись и печать мастера',
];

export default function GarantiiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(GUARANTEE_SCHEMA) }}
      />

      <Breadcrumb items={BREADCRUMB_ITEMS} />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <h1>Гарантии на изделия и работы</h1>
          <p className="hero-desc">
            Официальная гарантия на все изделия и услуги {SITE.name} — выдаём гарантийный талон
            при каждой установке. Кованые оградки до&nbsp;5&nbsp;лет.
          </p>
          <div className="hero-badges">
            {['Кованые — 5 лет', 'Сварные — 3 года', 'Покрытие — 5 лет', 'Гарантийный талон'].map((b) => (
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

      {/* GUARANTEE CARDS 2×2 */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Сроки гарантии</h2>
            <p>На каждый вид изделия и услуги — свой гарантийный срок</p>
          </div>
          <div className="guarantee-grid">
            {GUARANTEE_CARDS.map((card) => (
              <div
                key={card.title}
                style={{
                  background: card.accent ? 'var(--primary, #111)' : '#fff',
                  color: card.accent ? '#fff' : 'inherit',
                  border: card.accent ? 'none' : '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '28px 24px',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{card.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px' }}>{card.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {card.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        color: card.accent ? 'rgba(255,255,255,.9)' : '#374151',
                      }}
                    >
                      <span style={{ color: card.accent ? '#fff' : 'var(--primary, #111)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Что входит в гарантию</h2>
            <p>Гарантия покрывает производственные дефекты и ошибки при монтаже</p>
          </div>
          <div className="list-grid">
            {INCLUDED.map((item) => (
              <div
                key={item.title}
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '20px 18px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    flexShrink: 0,
                    background: 'var(--primary, #111)',
                    color: '#fff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  ✓
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S NOT INCLUDED */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Что не входит в гарантию</h2>
            <p>Случаи, не связанные с производственными дефектами</p>
          </div>
          <div className="list-grid">
            {EXCLUDED.map((item) => (
              <div
                key={item.title}
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '20px 18px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    flexShrink: 0,
                    background: '#f3f4f6',
                    color: '#9ca3af',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}
                >
                  ✕
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE COUPON */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Гарантийный талон</h2>
            <p>Выдаётся каждому клиенту сразу после установки</p>
          </div>
          <div
            style={{
              maxWidth: '560px',
              margin: '0 auto',
              background: '#fff',
              border: '2px dashed #d1d5db',
              borderRadius: '16px',
              padding: '32px 28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span style={{ fontSize: '2.2rem' }}>📄</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>Гарантийный талон</div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{SITE.name} — {SITE.city}</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '18px', lineHeight: 1.6 }}>
              Талон выдаётся бесплатно при каждой установке изделия. В документе фиксируется:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {COUPON_ITEMS.map((item) => (
                <li
                  key={item}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#374151' }}
                >
                  <span
                    style={{
                      width: '22px',
                      height: '22px',
                      background: 'var(--primary, #111)',
                      color: '#fff',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '0.8rem', color: '#9ca3af', margin: 0, lineHeight: 1.5 }}>
              Сохраняйте талон на весь гарантийный срок. При обращении по гарантии предъявите мастеру.
            </p>
          </div>
        </div>
      </section>

      {/* ORDER FORM — GUARANTEE CASE */}
      <section className="section" id="garantijnyj-sluchaj">
        <div className="container">
          <div className="section-header">
            <h2>Гарантийный случай</h2>
            <p>Обнаружили дефект? Оставьте заявку — разберёмся и устраним бесплатно</p>
          </div>
          <div className="form-wrap">
            <OrderForm service="Гарантийный случай" title="" />
          </div>
        </div>
      </section>

      <style>{`
        .guarantee-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .list-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .form-wrap { max-width: 640px; margin: 0 auto; }
        @media (max-width: 700px) {
          .guarantee-grid { grid-template-columns: 1fr; }
          .list-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <RelatedLinks links={[
        { href: '/o-kompanii',        label: 'О компании' },
        { href: '/dostavka-i-oplata', label: 'Доставка и оплата' },
        { href: '/otzyvy',            label: 'Отзывы клиентов' },
        { href: '/catalog',           label: 'Каталог оградок' },
        { href: '/remont-ogradki',    label: 'Ремонт оградок' },
      ]}/>
    </>
  );
}
