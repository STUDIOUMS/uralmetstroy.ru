// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <section style={{ padding: '80px 0', textAlign: 'center' }}>
      <div className="container">
        <div style={{ fontSize: '6rem', fontWeight: 800, color: 'rgba(17,17,17,.06)', lineHeight: 1 }}>404</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '16px 0 12px' }}>Страница не найдена</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '1.05rem' }}>
          Возможно, она была перемещена или удалена
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary btn-lg">На главную</Link>
          <Link href="/catalog" className="btn btn-outline btn-lg">Каталог оградок</Link>
        </div>
      </div>
    </section>
  );
}
