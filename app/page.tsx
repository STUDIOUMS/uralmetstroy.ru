// app/page.tsx — Главная страница
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, PRODUCTS, SERVICES, BLOG_POSTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import OrderForm from '@/components/OrderForm';
import HeroSlider from '@/components/HeroSlider';

export const metadata: Metadata = {
  title: `${SITE.name} — кованые оградки на могилу, ${SITE.city}`,
  description: `Производство кованых и сварных оградок, столиков, крестов в ${SITE.city}. Собственное производство с ${SITE.workingFrom} года. Цены от 2 000 ₽/м.пог. Установка под ключ. ${SITE.phone}`,
  alternates: { canonical: '/' },
};

const HOMEPAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address,
        addressLocality: SITE.city,
        addressRegion: 'Свердловская область',
        postalCode: SITE.zip,
        addressCountry: 'RU',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE.url}/#localbusiness`,
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
      geo: { '@type': 'GeoCoordinates', latitude: 57.916, longitude: 59.972 },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '16:00' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Сколько стоит оградка?', acceptedAnswer: { '@type': 'Answer', text: 'Сварные оградки — от 2 000 ₽/м.пог., кованые — от 3 800 ₽/м.пог. Стандартная оградка 6 м.пог. обходится от 12 000 ₽ (сварная) до 23 000 ₽ (кованая).' } },
        { '@type': 'Question', name: 'Вы устанавливаете оградки?', acceptedAnswer: { '@type': 'Answer', text: 'Да, устанавливаем под ключ на всех кладбищах Нижнего Тагила: Красный Камень, Вагонское, Гальяно-Горбуновское и других.' } },
        { '@type': 'Question', name: 'Сколько времени занимает изготовление?', acceptedAnswer: { '@type': 'Answer', text: 'Готовые модели — 1–3 рабочих дня, индивидуальные заказы — 5–10 дней.' } },
        { '@type': 'Question', name: 'Какие документы нужны для установки?', acceptedAnswer: { '@type': 'Answer', text: 'Документ о праве на захоронение, паспорт заказчика. На некоторых кладбищах требуется разрешение администрации — поможем оформить.' } },
      ],
    },
  ],
};

const HITS = PRODUCTS.filter(p => ['ograda-klassicheskaya','ograda-ekonom','ograda-barokko','komplekt-standart'].includes(p.slug));
const BLOG_PREVIEW = BLOG_POSTS.slice(0, 4);

const REVIEWS = [
  { name: 'Сергей', city: 'Нижний Тагил', place: 'Красный Камень', rating: 5, text: 'Качественная оградка, аккуратная установка. Сделали за 2 дня. Очень доволен.' },
  { name: 'Ирина',  city: 'Нижний Тагил', place: 'Вагонское',      rating: 5, text: 'Заказывали столик и скамейку — всё быстро, качественно. Мастера приветливые.' },
  { name: 'Андрей', city: 'Нижний Тагил', place: 'Гальяно-Горб.',  rating: 5, text: 'Хорошая цена и достойное качество. Устанавливали в один день с замером.' },
];

const FAQ_ITEMS = [
  { question: 'Сколько стоит оградка?', answer: 'Сварные — от 2 000 ₽/м.пог., кованые — от 3 800 ₽/м.пог. Стандартная оградка 6 м.пог. — от 12 000 ₽.' },
  { question: 'Вы устанавливаете?', answer: 'Да, установка под ключ на всех кладбищах Нижнего Тагила: Красный Камень, Вагонское, Гальяно-Горбуновское и других.' },
  { question: 'Сколько изготовление?', answer: 'Готовые модели — 1–3 рабочих дня, индивидуальные проекты — 5–10 дней.' },
  { question: 'Какие документы нужны?', answer: 'Документ о праве на захоронение и паспорт. Разрешение администрации кладбища — помогаем оформить.' },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(HOMEPAGE_SCHEMA) }} />

      {/* ── HERO СЛАЙДЕР ───────────────────────────────────── */}
      <HeroSlider />

      {/* ── ДОВЕРИЕ ────────────────────────────────────────── */}
      <section className="section bg-light">
        <div className="container">
          <div className="trust-grid">
            {[
              { num: '500+',   label: 'Установленных оградок' },
              { num: '15+',    label: 'Лет на рынке' },
              { num: '4.9★',   label: 'Средняя оценка' },
              { num: '1 день', label: 'Срок установки' },
            ].map(({ num, label }) => (
              <div key={label} className="trust-item">
                <div className="trust-num">{num}</div>
                <div className="trust-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ХИТЫ ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Популярные модели</h2>
            <p>Самые востребованные оградки нашего производства</p>
          </div>
          <div className="product-grid">
            {HITS.map(p => <ProductCard key={p.slug} product={p}/>)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/catalog" className="btn btn-primary btn-lg">Весь каталог оградок</Link>
          </div>
        </div>
      </section>

      {/* ── УСЛУГИ ─────────────────────────────────────────── */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Наши услуги</h2>
            <p>Полный цикл — от замера до установки</p>
          </div>
          <div className="services-grid">
            {SERVICES.map(s => (
              <Link href={`/${s.slug}`} key={s.slug} className="service-card">
                <div className="service-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={s.icon}/>
                  </svg>
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <span className="service-price">{s.priceLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ГЕОГРАФИЯ ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Работаем по всему Нижнему Тагилу и области</h2>
            <p>Устанавливаем оградки на 6 кладбищах — выезд в тот же день</p>
          </div>
          <div className="geo-grid">
            {SITE.cemeteries.map(c => (
              <div key={c} className="geo-card">
                <div className="geo-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span>{c}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link href="/ustanovka" className="btn btn-outline btn-lg">Все кладбища и районы →</Link>
          </div>
        </div>
      </section>

      {/* ── КАК РАБОТАЕМ ───────────────────────────────────── */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Как мы работаем</h2>
            <p>Всего 4 шага от звонка до готовой оградки</p>
          </div>
          <div className="steps-grid">
            {[
              { n: '01', title: 'Звонок и замер', desc: 'Вы звоните — мы приезжаем на кладбище для бесплатного замера участка' },
              { n: '02', title: 'Расчёт и заказ', desc: 'Рассчитываем стоимость, согласуем дизайн и размер, вы оплачиваете 50% предоплату' },
              { n: '03', title: 'Производство', desc: 'Изготавливаем оградку на нашем производстве в течение 1–3 рабочих дней' },
              { n: '04', title: 'Установка', desc: 'Привозим и устанавливаем оградку под ключ, вы принимаете работу и платите остаток' },
            ].map(step => (
              <div key={step.n} className="step-item">
                <div className="step-num">{step.n}</div>
                <div className="step-body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ОТЗЫВЫ ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Отзывы клиентов</h2>
            <p>Реальные отзывы — рейтинг 4.9 из 5</p>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map(r => (
              <div key={r.name} className="review-card" itemScope itemType="https://schema.org/Review">
                <div className="review-rating" aria-label={`Оценка: ${r.rating} из 5`}>
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </div>
                <p className="review-text" itemProp="reviewBody">«{r.text}»</p>
                <div className="review-author">
                  <strong itemProp="author">{r.name}</strong>
                  <span>{r.city} · {r.place}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link href="/otzyvy" className="btn btn-outline btn-lg">Все отзывы →</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Частые вопросы</h2>
            <p>Ответы на самые распространённые вопросы</p>
          </div>
          <div className="faq-list home-faq">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-question">{item.question}</summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── ПРЕВЬЮ БЛОГА ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Полезные статьи</h2>
            <p>Советы по выбору, уходу и установке оградок</p>
          </div>
          <div className="blog-preview-grid">
            {BLOG_PREVIEW.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-preview-card">
                <span className="blog-preview-cat">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="blog-preview-time">{post.readTime} мин чтения</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link href="/blog" className="btn btn-outline btn-lg">Все статьи →</Link>
          </div>
        </div>
      </section>

      {/* ── ФОРМА ──────────────────────────────────────────── */}
      <section className="section bg-light" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Рассчитать стоимость</h2>
            <p>Оставьте заявку — мастер перезвонит в течение 15 минут</p>
          </div>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <OrderForm service="" title=""/>
          </div>
        </div>
      </section>

      {/* ── SEO-текст ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>
              Производство кованых оградок в {SITE.city}
            </h2>
            <p>
              Компания <strong>«УралМетСтрой»</strong> специализируется на производстве кованых и сварных
              ритуальных изделий в {SITE.city} с {SITE.workingFrom} года. Мы изготавливаем оградки,
              столики, скамейки, кресты и памятники на собственном производстве.
            </p>
            <p style={{ marginTop: '12px' }}>
              Устанавливаем оградки на всех кладбищах Нижнего Тагила:{' '}
              {SITE.cemeteries.join(', ')}. Работаем по всей Свердловской области.
            </p>
            <p style={{ marginTop: '12px' }}>
              Гарантия на все изделия — <strong>3–5 лет</strong>. Бесплатный выезд мастера для замера.
              Изготовление за 1–3 дня. Установка за 1 день.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
        .service-card { background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px 20px; text-decoration: none; color: inherit; transition: all var(--transition); display: flex; flex-direction: column; gap: 8px; }
        .service-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); border-color: var(--primary); }
        .service-icon { width: 44px; height: 44px; background: var(--secondary-bg); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; margin-bottom: 4px; }
        .service-card h3 { font-size: 0.95rem; font-weight: 700; }
        .service-card p  { font-size: 0.83rem; color: var(--text-light); flex: 1; }
        .service-price { font-size: 0.875rem; font-weight: 700; color: var(--primary); }

        .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .step-item { position: relative; padding: 24px 20px; background: white; border-radius: var(--radius-lg); border: 1px solid var(--border); }
        .step-num { font-size: 2.5rem; font-weight: 800; color: rgba(17,17,17,.07); line-height: 1; margin-bottom: 10px; }
        .step-body h3 { font-size: 0.975rem; font-weight: 700; margin-bottom: 8px; }
        .step-body p  { font-size: 0.875rem; color: var(--text-light); line-height: 1.55; }

        .geo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .geo-card { display: flex; align-items: center; gap: 10px; padding: 16px 20px; background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); font-weight: 600; font-size: 0.95rem; }
        .geo-icon { width: 36px; height: 36px; background: var(--primary); color: white; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

        .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .review-card { background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px; display: flex; flex-direction: column; gap: 12px; }
        .review-rating { font-size: 1.3rem; color: #f59e0b; letter-spacing: 2px; }
        .review-text { font-size: 0.9rem; color: var(--text); line-height: 1.65; flex: 1; font-style: italic; }
        .review-author { display: flex; flex-direction: column; gap: 2px; }
        .review-author strong { font-size: 0.9rem; }
        .review-author span { font-size: 0.8rem; color: var(--text-muted); }

        .home-faq { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }
        .faq-item { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
        .faq-question { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; font-weight: 600; font-size: 0.95rem; cursor: pointer; list-style: none; gap: 12px; background: white; transition: background 0.15s; }
        .faq-question::-webkit-details-marker { display: none; }
        .faq-question::marker { display: none; }
        .faq-question::after { content: '+'; font-size: 1.3rem; font-weight: 400; flex-shrink: 0; color: var(--primary); }
        details[open] .faq-question::after { content: '−'; }
        .faq-question:hover { background: var(--secondary-bg); }
        .faq-answer { padding: 0 20px 16px; font-size: 0.9rem; color: var(--text-light); line-height: 1.6; margin: 0; }

        .blog-preview-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .blog-preview-card { display: flex; flex-direction: column; gap: 10px; padding: 20px; background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); text-decoration: none; color: inherit; transition: all var(--transition); }
        .blog-preview-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); border-color: var(--primary); }
        .blog-preview-cat { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--accent); }
        .blog-preview-card h3 { font-size: 0.925rem; font-weight: 700; line-height: 1.4; flex: 1; }
        .blog-preview-card p { font-size: 0.82rem; color: var(--text-light); line-height: 1.5; flex: 2; }
        .blog-preview-time { font-size: 0.78rem; color: var(--text-muted); }

        @media (max-width: 1100px) {
          .blog-preview-grid { grid-template-columns: repeat(2, 1fr); }
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr); }
          .geo-grid { grid-template-columns: repeat(2, 1fr); }
          .services-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .reviews-grid { grid-template-columns: 1fr; }
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .steps-grid { grid-template-columns: 1fr; }
          .step-item { display: flex; gap: 16px; align-items: flex-start; }
          .step-num { font-size: 2rem; min-width: 44px; margin-bottom: 0; }
          .blog-preview-grid { grid-template-columns: 1fr; }
          .geo-grid { grid-template-columns: 1fr 1fr; }
          .service-card { padding: 16px; }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr 1fr; }
          .service-card { padding: 14px 12px; gap: 6px; }
          .service-icon { width: 36px; height: 36px; }
        }
        @media (max-width: 400px) {
          .services-grid { grid-template-columns: 1fr; }
          .geo-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
