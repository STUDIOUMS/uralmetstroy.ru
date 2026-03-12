// app/kovanye-kresty/page.tsx — Кованые кресты: каталог 10 моделей
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import OrderForm from '@/components/OrderForm';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Кованые кресты на могилу в Нижнем Тагиле — 10 моделей | УралМетСтрой',
  description: 'Кованые православные кресты ручной работы. 10 моделей от 3 500 ₽. Установка в комплекте с оградкой или отдельно. Нижний Тагил.',
  alternates: { canonical: `${SITE.url}/kovanye-kresty` },
  openGraph: {
    title:       'Кованые кресты на могилу в Нижнем Тагиле — 10 моделей | УралМетСтрой',
    description: 'Кованые православные кресты ручной работы. 10 моделей от 3 500 ₽. Установка в комплекте с оградкой или отдельно.',
    url:         '/kovanye-kresty',
    images:      [{ url: '/img/ritualnye-izdeliya.jpg', width: 1200, height: 800, alt: 'Кованые кресты на могилу — УралМетСтрой' }],
  },
};

const FAQ_ITEMS = [
  { q: 'Какие виды крестов вы делаете?',         a: 'Православный восьмиконечный, католический, простой сварной, накладной, с распятием, мемориальный с фотоовалом и эксклюзивные по эскизу.' },
  { q: 'Можно установить крест на уже стоящую оградку?', a: 'Да, привариваем или крепим на болты к любой конструкции — нашей или чужой.' },
  { q: 'Делаете ли надписи на кресте?',           a: 'Да, лазерная гравировка имени и дат на металлической табличке — от 800 ₽.' },
  { q: 'Сколько времени занимает изготовление?',  a: 'Простые сварные кресты — 1–2 дня. Кованые — 5–10 рабочих дней. Индивидуальные проекты — до 14 дней.' },
];

interface CrossItem {
  title:       string;
  type:        string;
  price:       string;
  badge?:      string;
  badgeColor?: string;
  desc:        string;
}

const KRESТЫ: CrossItem[] = [
  { title: '«Православный восьмиконечный»', type: 'Ковка',             price: 'от 8 500 ₽',  badge: 'Хит',      badgeColor: '#111',   desc: 'Классический православный крест ручной ковки. Восьмиконечная форма, традиционный канон.' },
  { title: '«Католический»',                type: 'Ковка с декором',   price: 'от 14 000 ₽',                                            desc: 'Четырёхконечный крест с кованым декором. Строгая форма, изящная обработка.' },
  { title: '«Простой сварной»',             type: 'Сварной',           price: 'от 4 500 ₽',  badge: 'Доступно', badgeColor: '#16a34a', desc: 'Лаконичный сварной крест без лишних деталей. Быстро, надёжно, по доступной цене.' },
  { title: '«Узорный»',                     type: 'Ковка, орнамент',   price: 'от 28 000 ₽', badge: 'Премиум',  badgeColor: '#b45309', desc: 'Крест с растительным кованым орнаментом. Каждый элемент выполнен вручную в кузнице.' },
  { title: '«С распятием»',                 type: 'Объёмная ковка',    price: 'от 22 000 ₽',                                            desc: 'Кованый крест с объёмным распятием. Глубокая проработка деталей, высота 80–120 см.' },
  { title: '«Накладной»',                   type: 'На памятник',       price: 'от 3 500 ₽',  badge: 'Доступно', badgeColor: '#16a34a', desc: 'Крепится на памятник или плиту. Компактный, лёгкий, без установки в грунт.' },
  { title: '«С табличкой»',                 type: 'Ковка + гравировка', price: 'от 12 000 ₽',                                           desc: 'Кованый крест с металлической табличкой для гравировки имени и дат.' },
  { title: '«Мемориальный»',                type: 'Ковка + фотоовал',  price: 'от 16 000 ₽',                                            desc: 'Крест с местом под фотоовал. Современный формат памяти для захоронения.' },
  { title: '«С виноградной лозой»',         type: 'Художественная ковка', price: 'от 25 000 ₽', badge: 'Новинка', badgeColor: '#111',  desc: 'Крест, оплетённый кованой виноградной лозой. Символ вечной жизни.' },
  { title: '«Индивидуальный проект»',       type: 'Любая форма',       price: 'от 18 000 ₽',                                            desc: 'Крест по вашему эскизу или описанию. Любая форма, размер, орнамент.' },
];

export default function KovanyeKrestyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Каталог', href: '/ritualnye-izdeliya' }, { label: 'Кованые кресты' }]}/>

      <section className="page-hero" style={{ backgroundImage: "url('/img/slide1.jpg')" }}>
        <div className="container">
          <h1>Кованые кресты на могилу</h1>
          <p className="hero-desc">10 моделей: православные, католические, с распятием, мемориальные. Собственная кузница.</p>
          <div className="hero-badges">
            {['Ручная ковка', 'Гарантия 5 лет', 'От 3 500 ₽', 'Установка в комплекте'].map(b => (
              <span key={b} className="hero-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Каталог крестов — 10 моделей</h2>
            <p>Кованые и сварные кресты собственного производства</p>
          </div>
          <div className="cat-grid">
            {KRESТЫ.map((item) => (
              <div key={item.title} className="cat-card">
                <div className="cat-card-img">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.2 }}>
                    <line x1="12" y1="2" x2="12" y2="22"/><line x1="7" y1="7" x2="17" y2="7"/>
                  </svg>
                  {item.badge && (
                    <span className="cat-badge" style={{ background: item.badgeColor }}>{item.badge}</span>
                  )}
                </div>
                <div className="cat-card-body">
                  <div className="cat-type">{item.type}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="cat-card-footer">
                  <div className="cat-price">{item.price}</div>
                  <a href="#order" className="btn btn-primary btn-sm">Заказать</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Частые вопросы о крестах</h2>
          </div>
          <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-question">{item.q}</summary>
                <p className="faq-answer">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Заказать крест</h2>
            <p>Оставьте заявку — перезвоним и рассчитаем стоимость</p>
          </div>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <OrderForm service="Кованый крест" title=""/>
          </div>
        </div>
      </section>

      <style>{`
        .cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .cat-card { background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column; transition: all var(--transition); }
        .cat-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--primary); }
        .cat-card-img { position: relative; aspect-ratio: 4/3; background: var(--secondary-bg); display: flex; align-items: center; justify-content: center; }
        .cat-badge { position: absolute; top: 10px; left: 10px; padding: 3px 10px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; color: white; }
        .cat-card-body { padding: 14px 16px; flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .cat-type { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--text-muted); }
        .cat-card-body h3 { font-size: 0.975rem; font-weight: 700; line-height: 1.3; }
        .cat-card-body p { font-size: 0.83rem; color: var(--text-light); line-height: 1.5; flex: 1; }
        .cat-card-footer { padding: 12px 16px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .cat-price { font-size: 1rem; font-weight: 700; color: var(--primary); }
        .faq-item { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
        .faq-question { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; font-weight: 600; font-size: 0.95rem; cursor: pointer; list-style: none; gap: 12px; background: white; transition: background 0.15s; }
        .faq-question::-webkit-details-marker { display: none; }
        .faq-question::after { content: '+'; font-size: 1.3rem; font-weight: 400; flex-shrink: 0; color: var(--primary); }
        details[open] .faq-question::after { content: '−'; }
        .faq-question:hover { background: var(--secondary-bg); }
        .faq-answer { padding: 0 20px 16px; font-size: 0.9rem; color: var(--text-light); line-height: 1.6; margin: 0; }
        @media (max-width: 480px) { .cat-grid { grid-template-columns: 1fr; } }
      `}</style>

      <RelatedLinks links={[
        { href: '/ritualnye-izdeliya',        label: 'Ритуальные изделия' },
        { href: '/kovanye-tsvetniki',         label: 'Кованые цветники' },
        { href: '/metallicheskie-pamyatniki', label: 'Металлические памятники' },
        { href: '/catalog',                   label: 'Каталог оградок' },
        { href: '/cena-ogradki',              label: 'Цены' },
        { href: '/blagoustrojstvo-mogily',    label: 'Благоустройство могил' },
      ]}/>
    </>
  );
}
