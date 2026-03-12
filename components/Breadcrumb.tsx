// components/Breadcrumb.tsx
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://uralmetstroy.ru${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav className="breadcrumb" aria-label="Хлебные крошки">
        <div className="container">
          <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
            {items.map((item, i) => (
              <li
                key={i}
                className="breadcrumb-item"
                itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"
              >
                {item.href ? (
                  <Link href={item.href} itemProp="item">
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span itemProp="name" className="current">{item.label}</span>
                )}
                <meta itemProp="position" content={String(i + 1)}/>
                {i < items.length - 1 && <span className="sep" aria-hidden="true">›</span>}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
