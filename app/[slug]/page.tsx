// app/[slug]/page.tsx — Страница товара (динамическая)
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, getProductBySlug, getRelatedProducts, SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import OrderForm from '@/components/OrderForm';
import FAQ from '@/components/FAQ';

interface Props {
  params: { slug: string };
}

// SSG — генерируем все страницы товаров на билде
export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.metaTitle,
    description: product.metaDesc,
    alternates: { canonical: `/${product.slug}` },
    openGraph: {
      title:  product.metaTitle,
      description: product.metaDesc,
      images: [{ url: product.images[0] || '/img/og-default.jpg', width: 1200, height: 900 }],
      type: 'website',
    },
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  ogradki:    'Каталог оградок',
  kresты:     'Кованые кресты',
  tsvetniki:  'Цветники',
  pamyatniki: 'Памятники',
  komplekty:  'Комплекты',
  stoliki:    'Столики и скамейки',
};
const CATEGORY_HREFS: Record<string, string> = {
  ogradki:    '/catalog',
  kresты:     '/kovanye-kresty',
  tsvetniki:  '/kovanye-tsvetniki',
  pamyatniki: '/metallicheskie-pamyatniki',
  komplekty:  '/komplekt-standart',
  stoliki:    '/stolik-i-skameyka',
};

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const { title, priceLabel, priceOld, descriptionFull, specs, images, guarantee,
          badge, badgeColor, related, category, faq } = product;

  const relatedProducts = getRelatedProducts(related).slice(0, 3);

  const categoryLabel = CATEGORY_LABELS[category] || 'Каталог';
  const categoryHref  = CATEGORY_HREFS[category]  || '/catalog';

  // Schema.org Product
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    image: images.map(img => `${SITE.url}${img}`),
    description: product.metaDesc,
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      url: `${SITE.url}/${product.slug}`,
      seller: { '@type': 'Organization', name: SITE.name },
    },
    additionalProperty: Object.entries(specs).map(([name, value]) => ({
      '@type': 'PropertyValue', name, value,
    })),
  };

  const BADGE_COLORS: Record<string, string> = { black: '#111', green: '#16a34a', gold: '#b45309' };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}/>

      <Breadcrumb items={[
        { label: 'Главная', href: '/' },
        { label: categoryLabel, href: categoryHref },
        { label: title },
      ]}/>

      {/* Основной блок товара */}
      <section className="section product-section">
        <div className="container">
          <div className="product-layout">

            {/* Галерея */}
            <div className="product-gallery">
              <div className="main-photo">
                <Image
                  src={images[0] || '/img/ogrady/placeholder.svg'}
                  alt={title} width={600} height={450} priority
                  className="main-photo-img"
                />
                {badge && (
                  <span className="product-badge" style={{ background: BADGE_COLORS[badgeColor || 'black'] }}>{badge}</span>
                )}
              </div>
              {images.length > 1 && (
                <div className="photo-thumbs">
                  {images.map((src, i) => (
                    <div key={i} className="photo-thumb">
                      <Image src={src} alt={`${title} фото ${i+1}`} width={160} height={120} loading="lazy"/>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Инфо */}
            <div className="product-info">
              <h1>{title}</h1>

              <div className="product-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-text">4.9 / 5 (38 отзывов)</span>
              </div>

              <div className="product-price-block">
                <span className="product-price-main">{priceLabel}</span>
                {priceOld && <span className="product-price-old">{priceOld.toLocaleString('ru-RU')} ₽</span>}
                <span className="product-price-note">с доставкой и установкой в Нижнем Тагиле</span>
              </div>

              <ul className="product-features">
                <li>Собственное производство, {SITE.city}</li>
                <li>Гарантия {guarantee}</li>
                <li>Изготовление за 1–3 рабочих дня</li>
                <li>Установка на любом кладбище НТ</li>
                <li>Индивидуальный размер без доплаты ±10%</li>
              </ul>

              <div className="product-cta-btns">
                <a href={SITE.phoneTel} className="btn btn-primary btn-lg">Заказать</a>
                <a href="#order" className="btn btn-outline btn-lg">Рассчитать цену</a>
              </div>

              <div className="product-phone-hint">
                <strong>{SITE.phone}</strong> — звоните, выедем для бесплатного замера
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Описание + Характеристики */}
      <section className="section bg-light">
        <div className="container">
          <div className="desc-layout">
            <div>
              <h2>Описание</h2>
              <p>{descriptionFull}</p>
              <p style={{ marginTop: '12px' }}>
                Изготавливаем в нашей мастерской на ул. Красногвардейская 56А в Нижнем Тагиле.
                Доставка и установка по всем кладбищам города и Свердловской области.
              </p>
              <p style={{ marginTop: '12px' }}>
                Возможна любая нестандартная высота, цвет по каталогу RAL, надпись — уточняйте при заказе.
              </p>
            </div>
            <div>
              <h2>Характеристики</h2>
              <table className="specs-table">
                <tbody>
                  {Object.entries(specs).map(([k, v]) => (
                    <tr key={k}><td>{k}</td><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <section className="section">
          <div className="container" style={{ maxWidth: '800px' }}>
            <FAQ items={faq}/>
          </div>
        </section>
      )}

      {/* Форма заказа */}
      <section className="section" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Оставить заявку</h2>
            <p>Мастер перезвонит в течение 15 минут</p>
          </div>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <OrderForm service={title}/>
          </div>
        </div>
      </section>

      {/* Похожие товары */}
      {relatedProducts.length > 0 && (
        <section className="section bg-light">
          <div className="container">
            <div className="section-header">
              <h2>Похожие товары</h2>
            </div>
            <div className="product-grid">
              {relatedProducts.map(p => <ProductCard key={p.slug} product={p}/>)}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .product-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .main-photo { position: relative; border-radius: var(--radius-lg); overflow: hidden;
          border: 1px solid var(--border); aspect-ratio: 4/3; background: var(--secondary-bg); }
        .main-photo-img { width: 100%; height: 100%; object-fit: cover; }
        .product-badge { position: absolute; top: 14px; left: 14px; padding: 4px 12px;
          border-radius: 100px; font-size: 0.78rem; font-weight: 700; color: white; }
        .photo-thumbs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 10px; }
        .photo-thumb { border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border); aspect-ratio: 4/3; background: var(--secondary-bg); }
        .photo-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .product-info h1 { font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 800; margin-bottom: 12px; }
        .product-rating { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
        .stars { color: #f59e0b; font-size: 1rem; letter-spacing: 2px; }
        .rating-text { font-size: 0.83rem; color: var(--text-muted); }
        .product-price-block { background: var(--secondary-bg); border-radius: var(--radius); padding: 16px 18px; margin-bottom: 20px; }
        .product-price-main { font-size: 2rem; font-weight: 800; color: var(--primary); display: block; }
        .product-price-old { font-size: 1rem; color: var(--text-muted); text-decoration: line-through; margin-left: 8px; }
        .product-price-note { display: block; font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; }
        .product-features { list-style: none; padding: 0; margin-bottom: 20px; }
        .product-features li { padding: 9px 0; border-bottom: 1px solid var(--border); font-size: 0.9rem;
          display: flex; align-items: center; gap: 8px; }
        .product-features li::before { content: "✓"; color: var(--primary); font-weight: 700; flex-shrink: 0; }
        .product-cta-btns { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
        .product-phone-hint { background: var(--secondary-bg); border-radius: var(--radius); padding: 12px 16px; font-size: 0.83rem; color: var(--text-light); }
        .desc-layout { display: grid; grid-template-columns: 1fr 360px; gap: 40px; align-items: start; }
        .desc-layout h2 { font-size: 1.2rem; font-weight: 700; margin-bottom: 14px; }
        .desc-layout p { font-size: 0.9rem; line-height: 1.7; color: var(--text); }
        @media (max-width: 768px) {
          .product-layout { grid-template-columns: 1fr; gap: 24px; }
          .desc-layout { grid-template-columns: 1fr; }
          .product-cta-btns { flex-direction: column; }
          .product-cta-btns .btn { width: 100%; }
        }
      `}</style>
    </>
  );
}
