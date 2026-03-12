// app/ritualnye-izdeliya/page.tsx — Ритуальные изделия (серверный компонент)
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import OrderForm from '@/components/OrderForm';
import FaqAccordion from './FaqAccordion';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Ритуальные изделия в Нижнем Тагиле — полный каталог | УралМетСтрой',
  description:
    'Кованые и сварные оградки, кресты, цветники, памятники, столики, скамейки. Собственное производство. Нижний Тагил.',
  alternates: { canonical: '/ritualnye-izdeliya' },
  openGraph: {
    title:       'Ритуальные изделия в Нижнем Тагиле — полный каталог | УралМетСтрой',
    description: 'Кованые и сварные оградки, кресты, цветники, памятники, столики, скамейки. Собственное производство с 2010 года.',
    url:         '/ritualnye-izdeliya',
    images:      [{ url: '/img/ritualnye-izdeliya.jpg', width: 1200, height: 800, alt: 'Ритуальные изделия — УралМетСтрой' }],
  },
};

const ITEM_LIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Ритуальные изделия — полный каталог',
  description: 'Все виды ритуальных изделий из металла собственного производства в Нижнем Тагиле',
  url: `${SITE.url}/ritualnye-izdeliya`,
  numberOfItems: 6,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Оградки',
      url: `${SITE.url}/catalog`,
      description: '40+ моделей кованых и сварных оградок',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Кованые кресты',
      url: `${SITE.url}/kovanye-kresty`,
      description: '10 моделей православных и католических крестов',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Цветники',
      url: `${SITE.url}/kovanye-tsvetniki`,
      description: '10 видов кованых цветников для могилы',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Памятники',
      url: `${SITE.url}/metallicheskie-pamyatniki`,
      description: 'Металлические памятники с гравировкой',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Столики и скамейки',
      url: `${SITE.url}/stolik-i-skameyka`,
      description: 'Ритуальная мебель',
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'Комплекты',
      url: `${SITE.url}/catalog#komplekty`,
      description: 'Оградка + столик + скамейки в наборе',
    },
  ],
};

const BREADCRUMB_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Ритуальные изделия' },
];

interface Category {
  title: string;
  href: string;
  priceFrom: string;
  desc: string;
  img: string;
  imgAlt: string;
}

const CATEGORIES: Category[] = [
  {
    title: 'Оградки',
    href: '/catalog',
    priceFrom: 'от 1 400 ₽/м.пог.',
    desc: '40+ моделей кованых и сварных оградок собственного производства',
    img: '/img/ogrady.jpg',
    imgAlt: 'Металлические оградки на могилу — каталог УралМетСтрой',
  },
  {
    title: 'Кованые кресты',
    href: '/kovanye-kresty',
    priceFrom: 'от 2 500 ₽',
    desc: '10 моделей православных и католических крестов ручной ковки',
    img: '/img/ritualnye-izdeliya.jpg',
    imgAlt: 'Кованые кресты на могилу Нижний Тагил',
  },
  {
    title: 'Цветники',
    href: '/kovanye-tsvetniki',
    priceFrom: 'от 1 000 ₽',
    desc: '10 видов кованых цветников — круглые и прямоугольные',
    img: '/img/ritual-ogrady.jpg',
    imgAlt: 'Кованые цветники для могилы Нижний Тагил',
  },
  {
    title: 'Памятники',
    href: '/metallicheskie-pamyatniki',
    priceFrom: 'от 15 000 ₽',
    desc: 'Металлические памятники с лазерной гравировкой фото и текста',
    img: '/img/pamyatnik-1.jpg',
    imgAlt: 'Металлические памятники на могилу Нижний Тагил',
  },
  {
    title: 'Столики и скамейки',
    href: '/stolik-i-skameyka',
    priceFrom: 'от 3 500 ₽',
    desc: 'Кованые и сварные столики, лавочки и скамейки для кладбища',
    img: '/img/stolik-skameyka.jpg',
    imgAlt: 'Металлические столики и скамейки для кладбища',
  },
  {
    title: 'Комплекты',
    href: '/catalog#komplekty',
    priceFrom: 'от 25 000 ₽',
    desc: 'Оградка + столик + скамейки в едином стиле — скидка до 15%',
    img: '/img/komplekt-ka-08.jpg',
    imgAlt: 'Комплект оградка столик скамейка для могилы',
  },
];

export default function RitualnyeIzdeliyaPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ритуальные изделия — полный каталог',
    description: 'Все виды ритуальных изделий из металла собственного производства в Нижнем Тагиле',
    url: `${SITE.url}/ritualnye-izdeliya`,
    numberOfItems: 6,
    itemListElement: ITEM_LIST_SCHEMA.itemListElement,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Breadcrumb items={BREADCRUMB_ITEMS} />

      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <h1>Ритуальные изделия — полный каталог</h1>
          <p className="hero-desc">
            Собственное производство. Все виды ритуальных изделий из металла.
          </p>
          <div className="hero-badges">
            {[
              'Собственное производство',
              'Доставка на кладбище',
              'Гарантия 3–5 лет',
              'Консультация бесплатно',
            ].map(b => (
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

      {/* КАТАЛОГ КАТЕГОРИЙ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Категории изделий</h2>
            <p>Выберите нужный раздел — все изделия производим сами в Нижнем Тагиле</p>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.title} href={cat.href} className="cat-card">
                <div className="cat-img-wrap">
                  <Image
                    src={cat.img}
                    alt={cat.imgAlt}
                    width={480}
                    height={280}
                    className="cat-img"
                    loading={i < 3 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="cat-body">
                  <h3 className="cat-title">{cat.title}</h3>
                  <p className="cat-desc">{cat.desc}</p>
                  <p className="cat-price">{cat.priceFrom}</p>
                  <span className="btn btn-primary cat-btn">Смотреть →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO-ТЕКСТ */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Ритуальные изделия из металла в Нижнем Тагиле</h2>
          </div>
          <div className="seo-text">
            <p>
              Компания «УралМетСтрой» производит ритуальные изделия из металла с {SITE.workingFrom} года.
              За это время мы изготовили более тысячи <Link href="/catalog">оградок</Link>, <Link href="/kovanye-kresty">крестов</Link>, <Link href="/kovanye-tsvetniki">цветников</Link> и комплектов для жителей
              Нижнего Тагила и Свердловской области. Вся продукция создаётся в собственном цеху по адресу
              {' '}{SITE.address} — вы можете приехать и убедиться в качестве лично.
            </p>
            <p>
              <strong><Link href="/catalog">Оградки</Link></strong> — наш основной продукт. В каталоге представлено более 40 моделей:
              от бюджетных <Link href="/catalog">сварных</Link> (от 1 400 ₽/м.пог.) до эксклюзивных <Link href="/catalog">кованых</Link> с художественным орнаментом
              (от 2 500 ₽/м.пог.). Все оградки изготавливаются под размер конкретного участка.
            </p>
            <p>
              <strong><Link href="/kovanye-kresty">Кресты</Link> и <Link href="/kovanye-tsvetniki">цветники</Link></strong> выполняются в кованой технике ручной работы. Православные
              восьмиконечные кресты, католические, надгробные — 10 стандартных моделей и изготовление
              по индивидуальному эскизу. <Link href="/kovanye-tsvetniki">Цветники</Link> круглые и прямоугольные от 1 000 ₽.
            </p>
            <p>
              <strong><Link href="/metallicheskie-pamyatniki">Металлические памятники</Link></strong> — бюджетная альтернатива граниту. Листовой металл
              4 мм с лазерной гравировкой фотографии, имени и дат. Порошковая краска чёрного или
              коричневого цвета, гарантия 3 года. Стоимость от 15 000 ₽.
            </p>
            <p>
              <strong><Link href="/stolik-i-skameyka">Столики и скамейки</Link></strong> производим в кованом и сварном исполнении. Круглые,
              прямоугольные столики, лавочки со спинкой и без — от 3 500 ₽. Возможна установка
              в комплекте с оградкой.
            </p>
            <p>
              <strong>Комплекты</strong> позволяют оформить могилу в едином стиле и сэкономить 10–15%.
              Полный <Link href="/catalog#komplekty">комплект с оградкой, столиком и скамейками</Link> обойдётся от 25 000 ₽. <Link href="/dostavka-i-oplata">Доставка</Link>
              по Нижнему Тагилу бесплатная, <Link href="/ustanovka">установка</Link> включена в стоимость комплекта.
            </p>
            <p>
              Работаем с кладбищами Красный Камень, Вагонское, Гальяно-Горбуновское, а также
              выезжаем в Верхнюю Салду, Кушву и Невьянск. Предоплата 50%, остаток — после
              приёмки работ. Рассрочка 0% от 20 000 ₽ на 3–6 месяцев.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Частые вопросы</h2>
            <p>Отвечаем на самые распространённые вопросы о ритуальных изделиях</p>
          </div>
          <div className="faq-wrap">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* ФОРМА */}
      <section className="section bg-light" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Оставить заявку</h2>
            <p>Перезвоним в течение 15 минут, поможем подобрать изделия и рассчитаем стоимость</p>
          </div>
          <div className="form-wrap">
            <OrderForm title="" />
          </div>
        </div>
      </section>

      <style>{`
        /* ── Сетка категорий 3×2 ───────────────────────── */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .cat-grid { grid-template-columns: 1fr; }
          .cat-img-wrap { aspect-ratio: 16/7; }
        }

        /* ── Карточка категории ────────────────────────── */
        .cat-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
        }
        .cat-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,.13);
          border-color: var(--primary);
          transform: translateY(-2px);
        }
        .cat-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: var(--secondary-bg);
        }
        .cat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s;
        }
        .cat-card:hover .cat-img {
          transform: scale(1.06);
        }
        .cat-body {
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }
        .cat-title {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0;
          color: var(--text);
        }
        .cat-desc {
          font-size: 0.875rem;
          color: var(--text-light);
          line-height: 1.5;
          margin: 0;
          flex: 1;
        }
        .cat-price {
          font-size: 1rem;
          font-weight: 700;
          color: var(--primary);
          margin: 6px 0 8px;
        }
        .cat-btn {
          align-self: flex-start;
          font-size: 0.875rem;
          padding: 8px 18px;
        }

        /* ── SEO-текст ─────────────────────────────────── */
        .seo-text {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 820px;
          margin: 0 auto;
        }
        .seo-text p {
          font-size: 0.925rem;
          color: var(--text-light);
          line-height: 1.7;
          margin: 0;
        }
        .seo-text strong {
          color: var(--text);
        }
        .seo-text a {
          color: var(--primary);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .seo-text a:hover { opacity: 0.8; }

        /* ── FAQ ───────────────────────────────────────── */
        .faq-wrap {
          max-width: 760px;
          margin: 0 auto;
        }

        /* ── Форма ─────────────────────────────────────── */
        .form-wrap { max-width: 640px; margin: 0 auto; }
      `}</style>

      <RelatedLinks links={[
        { href: '/catalog',                   label: 'Каталог оградок' },
        { href: '/kovanye-kresty',            label: 'Кованые кресты' },
        { href: '/kovanye-tsvetniki',         label: 'Кованые цветники' },
        { href: '/metallicheskie-pamyatniki', label: 'Металлические памятники' },
        { href: '/stolik-i-skameyka',         label: 'Столики и скамейки' },
        { href: '/blagoustrojstvo-mogily',    label: 'Благоустройство могил' },
        { href: '/ustanovka',                 label: 'Установка оградок' },
        { href: '/dostavka-i-oplata',         label: 'Доставка и оплата' },
        { href: '/cena-ogradki',              label: 'Цены' },
        { href: '/nashi-raboty',              label: 'Наши работы' },
      ]}/>
    </>
  );
}
