// components/FAQ.tsx — FAQ блок со Schema.org FAQPage разметкой
import type { FAQ as FAQItem } from '@/lib/data';

interface Props {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = 'Частые вопросы' }: Props) {
  if (!items || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <section className="faq-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>
      <h2 className="faq-title">{title}</h2>
      <div className="faq-list">
        {items.map((item, i) => (
          <details key={i} className="faq-item">
            <summary className="faq-question">{item.question}</summary>
            <p className="faq-answer">{item.answer}</p>
          </details>
        ))}
      </div>
      <style>{`
        .faq-section { margin-top: 48px; }
        .faq-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 20px; }
        .faq-list { display: flex; flex-direction: column; gap: 8px; }
        .faq-item { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
        .faq-question {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; font-weight: 600; font-size: 0.95rem;
          cursor: pointer; list-style: none; gap: 12px;
          background: white; transition: background 0.15s;
        }
        /* Скрываем стрелку во всех браузерах */
        .faq-question::-webkit-details-marker { display: none; }
        .faq-question::marker { display: none; }
        .faq-question::after { content: '+'; font-size: 1.3rem; font-weight: 400; flex-shrink: 0; color: var(--primary); }
        details[open] .faq-question::after { content: '−'; }
        .faq-question:hover { background: var(--secondary-bg); }
        .faq-answer { padding: 0 20px 16px; font-size: 0.9rem; color: var(--text-light); line-height: 1.6; margin: 0; }
      `}</style>
    </section>
  );
}
