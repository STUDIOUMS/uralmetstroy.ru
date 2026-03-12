// app/otzyvy/page.tsx — Отзывы клиентов
import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Отзывы клиентов — УралМетСтрой, Нижний Тагил',
  description: 'Реальные отзывы клиентов об оградках и услугах УралМетСтрой в Нижнем Тагиле. Рейтинг 4.9 из 5.',
  alternates: { canonical: '/otzyvy' },
  openGraph: {
    title:       'Отзывы клиентов — УралМетСтрой, Нижний Тагил',
    description: 'Реальные отзывы клиентов об оградках и услугах УралМетСтрой в Нижнем Тагиле. Рейтинг 4.9 из 5. 127+ отзывов.',
    url:         '/otzyvy',
    images:      [{ url: '/img/og-default.jpg', width: 1200, height: 630, alt: 'Отзывы клиентов УралМетСтрой' }],
  },
};

const REVIEWS = [
  {
    name: 'Сергей',
    city: 'Нижний Тагил',
    rating: 5,
    topic: 'Красный Камень',
    text: 'Качественная оградка, аккуратная установка. Сделали за 2 дня.',
  },
  {
    name: 'Ирина',
    city: 'Нижний Тагил',
    rating: 5,
    topic: 'Вагонское',
    text: 'Заказывали столик и скамейку — всё быстро, качественно.',
  },
  {
    name: 'Андрей',
    city: 'Нижний Тагил',
    rating: 5,
    topic: 'Гальяно-Горбуновское',
    text: 'Хорошая цена и достойное качество.',
  },
  {
    name: 'Елена',
    city: 'Верхняя Салда',
    rating: 5,
    topic: 'Покраска оградки',
    text: 'Обновили старую оградку — выглядит как новая. Приехали в тот же день.',
  },
  {
    name: 'Михаил',
    city: 'Нижний Тагил',
    rating: 5,
    topic: 'Кованый комплект',
    text: 'Заказали полный комплект: оградка + столик + 2 скамейки. Всё идеально.',
  },
  {
    name: 'Ольга',
    city: 'Кушва',
    rating: 4,
    topic: 'Установка',
    text: 'Хорошая работа, единственное — пришлось подождать 5 дней из-за очереди.',
  },
  {
    name: 'Дмитрий',
    city: 'Нижний Тагил',
    rating: 5,
    topic: 'Демонтаж + новая оградка',
    text: 'Убрали старую, поставили новую кованую. Разница — небо и земля.',
  },
  {
    name: 'Наталья',
    city: 'Невьянск',
    rating: 5,
    topic: 'Благоустройство',
    text: 'Полное благоустройство могилы — оградка, столик, цветник, гравий. Красиво.',
  },
];

const REVIEWS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '8',
    bestRating: '5',
    worstRating: '1',
  },
  review: REVIEWS.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(r.rating),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: r.text,
    name: r.topic,
  })),
};

const BREADCRUMB_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Отзывы' },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`Оценка ${rating} из 5`} style={{ color: '#f5a623', fontSize: '1.1rem', letterSpacing: '1px' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? '★' : '☆'}</span>
      ))}
    </span>
  );
}

export default function OtzyyvyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(REVIEWS_SCHEMA) }}
      />

      <Breadcrumb items={BREADCRUMB_ITEMS} />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <h1>Отзывы клиентов — 4.9★</h1>
          <p className="hero-desc">
            8 реальных отзывов от жителей Нижнего Тагила и области
          </p>
          <div className="hero-badges">
            {['Рейтинг 4.9 / 5', '8 отзывов', 'Нижний Тагил и область', 'Проверенные клиенты'].map((b) => (
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

      {/* REVIEWS GRID */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Что говорят наши клиенты</h2>
            <p>Реальные отзывы — без редактирования и купюр</p>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <article
                key={i}
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                  <strong style={{ fontSize: '0.975rem' }}>
                    {r.name}, {r.city}
                  </strong>
                  <Stars rating={r.rating} />
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    background: '#f3f4f6',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '0.8rem',
                    color: '#4b5563',
                    fontWeight: 600,
                    alignSelf: 'flex-start',
                  }}
                >
                  {r.topic}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6, margin: 0 }}>
                  &laquo;{r.text}&raquo;
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section className="section bg-light" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Стать нашим клиентом</h2>
            <p>Оставьте заявку — перезвоним в течение 15 минут</p>
          </div>
          <div className="form-wrap">
            <OrderForm title="" />
          </div>
        </div>
      </section>

      <style>{`
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .form-wrap { max-width: 640px; margin: 0 auto; }
        @media (max-width: 900px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .reviews-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <RelatedLinks links={[
        { href: '/o-kompanii',      label: 'О компании' },
        { href: '/garantii',        label: 'Гарантии' },
        { href: '/nashi-raboty',    label: 'Наши работы' },
        { href: '/catalog',         label: 'Каталог оградок' },
        { href: '/dostavka-i-oplata', label: 'Доставка и оплата' },
      ]}/>
    </>
  );
}
