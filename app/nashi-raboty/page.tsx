// app/nashi-raboty/page.tsx — Портфолио / Наши работы
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: `Наши работы — фото оградок | ${SITE.name}`,
  description: `Фотогалерея выполненных работ УралМетСтрой: кованые и сварные оградки, комплекты, кресты, цветники. Установлено более 500 изделий на кладбищах ${SITE.city}.`,
  alternates: { canonical: '/nashi-raboty' },
};

const GALLERY = [
  {
    src: '/img/ogrady/ograda-klassicheskaya-1.jpg',
    alt: 'Кованая оградка Классическая на кладбище Нижний Тагил',
    title: 'Оградка «Классическая»',
    desc: 'Кованая, 1×2 м, чёрный',
    href: '/ograda-klassicheskaya',
  },
  {
    src: '/img/ogrady/ograda-klassicheskaya-2.jpg',
    alt: 'Оградка Классическая вид сбоку',
    title: 'Оградка «Классическая» — детали',
    desc: 'Кованые прутья, ручная работа',
    href: '/ograda-klassicheskaya',
  },
  {
    src: '/img/slide1.jpg',
    alt: 'Кованые ритуальные изделия УралМетСтрой',
    title: 'Ритуальные изделия',
    desc: 'Оградки, кресты, цветники',
    href: '/catalog',
  },
  {
    src: '/img/slide2.jpg',
    alt: 'Металлические оградки на могилу',
    title: 'Оградки для могил',
    desc: 'Сварные и кованые модели',
    href: '/catalog',
  },
  {
    src: '/img/slide3.jpg',
    alt: 'Установка оградки на кладбище Нижний Тагил',
    title: 'Установка под ключ',
    desc: 'Работы на кладбищах города',
    href: '/ustanovka',
  },
  {
    src: '/img/ogrady.jpg',
    alt: 'Каталог кованых оградок производство',
    title: 'Производство оградок',
    desc: 'Собственная мастерская',
    href: '/catalog',
  },
  {
    src: '/img/ritualnye-izdeliya.jpg',
    alt: 'Ритуальные изделия из металла',
    title: 'Ритуальные изделия',
    desc: 'Кресты, цветники, памятники',
    href: '/kovanye-kresty',
  },
  {
    src: '/img/stolik-skameyka.jpg',
    alt: 'Металлический столик и скамейка для кладбища',
    title: 'Столик и скамейка',
    desc: 'Комплект для семейного участка',
    href: '/komplekt-standart',
  },
  {
    src: '/img/ritual-ogrady.jpg',
    alt: 'Ритуальные оградки в Нижнем Тагиле',
    title: 'Готовые работы',
    desc: 'Установлено на кладбищах НТ',
    href: '/catalog',
  },
];

const STATS = [
  { value: '500+', label: 'выполненных работ' },
  { value: '15', label: 'лет на рынке' },
  { value: '6', label: 'кладбищ обслуживаем' },
  { value: '3–5', label: 'дней изготовление' },
];

export default function NashiRabotyPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Наши работы — УралМетСтрой',
    description: 'Фотогалерея выполненных работ: кованые оградки, комплекты, кресты',
    url: `${SITE.url}/nashi-raboty`,
    author: { '@type': 'Organization', name: SITE.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>

      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Наши работы' }]}/>

      <section className="page-hero">
        <div className="container">
          <h1>Наши работы</h1>
          <p className="hero-desc">
            Фотогалерея выполненных заказов — кованые оградки, комплекты, кресты, цветники.
            Более 500 изделий установлено на кладбищах Нижнего Тагила с {SITE.workingFrom} года.
          </p>
        </div>
      </section>

      {/* Статистика */}
      <section className="section bg-light">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Галерея */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Фотогалерея</h2>
            <p>Нажмите на фото, чтобы перейти к соответствующему товару</p>
          </div>
          <div className="gallery-grid">
            {GALLERY.map((item, i) => (
              <Link key={i} href={item.href} className="gallery-item">
                <div className="gallery-img-wrap">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={480}
                    height={360}
                    className="gallery-img"
                    loading={i < 3 ? 'eager' : 'lazy'}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-overlay-text">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="gallery-note">
            Фотографии отражают реальные выполненные заказы. Можем прислать дополнительные фото по запросу.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-light">
        <div className="container">
          <div className="nashi-cta">
            <div>
              <h2>Хотите так же?</h2>
              <p>Изготовим и установим любую модель из каталога или по индивидуальному эскизу.</p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
                <a href={SITE.phoneTel} className="btn btn-primary btn-lg">{SITE.phone}</a>
                <Link href="/catalog" className="btn btn-outline btn-lg">Смотреть каталог</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Форма */}
      <section className="section" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Оставить заявку</h2>
            <p>Пришлём фото похожих работ и рассчитаем стоимость</p>
          </div>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <OrderForm service="Наши работы — запрос фото"/>
          </div>
        </div>
      </section>

      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: center; }
        .stat-card { background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px 16px; }
        .stat-value { font-size: 2.2rem; font-weight: 800; color: var(--primary); }
        .stat-label { font-size: 0.85rem; color: var(--text-light); margin-top: 4px; }
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .gallery-item { display: block; text-decoration: none; }
        .gallery-img-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--border); background: var(--secondary-bg); }
        .gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .gallery-item:hover .gallery-img { transform: scale(1.05); }
        .gallery-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 50%); opacity: 0; transition: opacity 0.3s; display: flex; align-items: flex-end; padding: 16px; border-radius: var(--radius-lg); }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .gallery-overlay-text { color: white; }
        .gallery-overlay-text strong { display: block; font-size: 0.9rem; font-weight: 700; }
        .gallery-overlay-text span { font-size: 0.78rem; opacity: 0.85; }
        .gallery-note { margin-top: 20px; font-size: 0.82rem; color: var(--text-muted); text-align: center; }
        .nashi-cta { background: var(--primary); color: white; border-radius: var(--radius-lg); padding: 40px 48px; }
        .nashi-cta h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 8px; }
        .nashi-cta p { opacity: 0.9; font-size: 1rem; }
        .nashi-cta .btn-outline { border-color: rgba(255,255,255,.5); color: white; }
        .nashi-cta .btn-outline:hover { border-color: white; background: rgba(255,255,255,.1); }
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .gallery-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .nashi-cta { padding: 28px 20px; }
        }
      `}</style>

      <RelatedLinks links={[
        { href: '/o-kompanii',   label: 'О компании' },
        { href: '/otzyvy',       label: 'Отзывы клиентов' },
        { href: '/catalog',      label: 'Каталог оградок' },
        { href: '/garantii',     label: 'Гарантии' },
        { href: '/cena-ogradki', label: 'Цены на оградки' },
      ]}/>
    </>
  );
}
