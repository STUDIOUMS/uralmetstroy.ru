// components/ProductCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
}

const BADGE_COLORS: Record<string, string> = {
  black: '#111',
  green: '#16a34a',
  gold:  '#b45309',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { slug, title, priceLabel, priceOld, description, images, badge, badgeColor, inStock } = product;
  const imgSrc = images[0] || '/img/ogrady/placeholder.svg';

  return (
    <article className="product-card" itemScope itemType="https://schema.org/Product">
      <Link href={`/${slug}`} className="product-card-link" tabIndex={-1} aria-hidden="true">
        <div className="product-card-img">
          <Image
            src={imgSrc}
            alt={title}
            width={400} height={300}
            className="product-card-photo"
            loading="lazy"
          />
          {badge && (
            <span
              className="product-card-badge"
              style={{ background: BADGE_COLORS[badgeColor || 'black'] }}
            >
              {badge}
            </span>
          )}
          {!inStock && <span className="product-card-badge" style={{ background: '#6b7280' }}>Под заказ</span>}
        </div>
      </Link>

      <div className="product-card-body">
        <h3 className="product-card-title" itemProp="name">
          <Link href={`/${slug}`}>{title}</Link>
        </h3>
        <p className="product-card-desc">{description}</p>
      </div>

      <div className="product-card-footer">
        <div className="product-card-price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span className="price" itemProp="price" content={String(product.price)}>{priceLabel}</span>
          <meta itemProp="priceCurrency" content="RUB"/>
          <meta itemProp="availability" content={inStock ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder'}/>
          {priceOld && <span className="price-old">{priceOld.toLocaleString('ru-RU')} ₽</span>}
        </div>
        <Link href={`/${slug}`} className="btn btn-outline btn-sm">Подробнее</Link>
      </div>
    </article>
  );
}
