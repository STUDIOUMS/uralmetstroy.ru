// components/RelatedLinks.tsx — блок перелинковки «Смотрите также»
import Link from 'next/link';

interface RelatedLink {
  href:  string;
  label: string;
}

interface Props {
  title?: string;
  links:  RelatedLink[];
}

export default function RelatedLinks({ title = 'Смотрите также', links }: Props) {
  return (
    <section className="related-links-section">
      <div className="container">
        <p className="related-links-title">{title}</p>
        <div className="related-links-list">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="related-link">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .related-links-section { padding: 20px 0; border-top: 1px solid var(--border); background: var(--secondary-bg); }
        .related-links-title { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--text-muted); margin-bottom: 10px; }
        .related-links-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .related-link { display: inline-block; padding: 6px 14px; border: 1px solid var(--border); border-radius: 100px; font-size: 0.82rem; font-weight: 500; color: var(--text); background: white; text-decoration: none; transition: all var(--transition); }
        .related-link:hover { border-color: var(--primary); color: var(--primary); background: white; }
      `}</style>
    </section>
  );
}
