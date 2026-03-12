// app/blog/page.tsx — Блог
import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS, SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Блог — советы по выбору оградок | УралМетСтрой',
  description: 'Полезные статьи о выборе, установке и уходе за оградками на кладбище. Советы от производителя из Нижнего Тагила.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title:       'Блог — советы по выбору оградок | УралМетСтрой',
    description: 'Полезные статьи о выборе, установке и уходе за оградками на кладбище. Советы от производителя из Нижнего Тагила.',
    url:         '/blog',
    images:      [{ url: '/img/og-default.jpg', width: 1200, height: 630, alt: 'Блог УралМетСтрой — советы по оградкам' }],
  },
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Блог' }]}/>

      <section className="page-hero" style={{ backgroundImage: "url('/img/ritualnye-izdeliya.jpg')" }}>
        <div className="container">
          <h1>Блог УралМетСтрой</h1>
          <p className="hero-desc">Полезные статьи о выборе, установке и уходе за оградками. Пишем честно — как производители.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {BLOG_POSTS.map(post => (
              <article key={post.slug} className="blog-card" itemScope itemType="https://schema.org/BlogPosting">
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-category">{post.category}</span>
                    <span className="blog-date">
                      <time dateTime={post.date} itemProp="datePublished">
                        {new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </time>
                    </span>
                    <span className="blog-read">{post.readTime} мин</span>
                  </div>
                  <h2 className="blog-card-title" itemProp="headline">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="blog-card-excerpt" itemProp="description">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="blog-read-more">
                    Читать статью →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        .blog-card { background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; transition: all var(--transition); }
        .blog-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
        .blog-card-body { padding: 24px; }
        .blog-card-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
        .blog-category { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: white; background: var(--primary); padding: 2px 10px; border-radius: 100px; }
        .blog-date, .blog-read { font-size: 0.8rem; color: var(--text-muted); }
        .blog-card-title { font-size: 1.05rem; font-weight: 700; margin-bottom: 10px; line-height: 1.4; }
        .blog-card-title a { color: var(--text); text-decoration: none; }
        .blog-card-title a:hover { color: var(--primary); }
        .blog-card-excerpt { font-size: 0.875rem; color: var(--text-light); line-height: 1.6; margin-bottom: 16px; }
        .blog-read-more { font-size: 0.875rem; font-weight: 600; color: var(--primary); text-decoration: none; }
        .blog-read-more:hover { text-decoration: underline; }
      `}</style>
    </>
  );
}
