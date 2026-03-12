// app/kovanye-tsvetniki/page.tsx — Кованые цветники: каталог 10 моделей
import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import OrderForm from '@/components/OrderForm';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Кованые цветники для могилы в Нижнем Тагиле — 10 моделей | УралМетСтрой',
  description: 'Кованые и сварные цветники для кладбища. 10 моделей от 1 500 ₽. Круглые, прямоугольные, с орнаментом. Установка под ключ. Нижний Тагил.',
  alternates: { canonical: `${SITE.url}/kovanye-tsvetniki` },
  openGraph: {
    title:       'Кованые цветники для могилы в Нижнем Тагиле — 10 моделей | УралМетСтрой',
    description: 'Кованые и сварные цветники для кладбища. 10 моделей от 1 500 ₽. Круглые, прямоугольные, с орнаментом. Установка под ключ.',
    url:         '/kovanye-tsvetniki',
    images:      [{ url: '/img/ritual-ogrady.jpg', width: 1200, height: 800, alt: 'Кованые цветники для могилы — УралМетСтрой' }],
  },
};

const FAQ_ITEMS = [
  { q: 'Нужно ли бетонировать цветник?',         a: 'Небольшие (до Ø50 см) достаточно воткнуть в грунт. Большие и высокие модели рекомендуем забетонировать — устойчивее к морозному пучению.' },
  { q: 'Подходит ли цветник для искусственных цветов?', a: 'Да, форма подходит как для живых растений в горшках, так и для букетов искусственных цветов.' },
  { q: 'Можно ли заказать нестандартный размер?', a: 'Да, делаем любой размер и форму по вашему эскизу или размерам. Стоимость рассчитывается индивидуально.' },
  { q: 'Какой уход нужен?',                       a: 'Раз в 3–5 лет рекомендуем обновить покраску. Порошковое покрытие не требует ежегодного ухода.' },
];

interface TsvetnikItem {
  title:       string;
  type:        string;
  price:       string;
  badge?:      string;
  badgeColor?: string;
  desc:        string;
}

const TSVETNIKI: TsvetnikItem[] = [
  { title: '«Круглый малый»',         type: 'Сварной, Ø40 см',          price: 'от 1 500 ₽',  badge: 'Доступно', badgeColor: '#16a34a', desc: 'Компактный круглый цветник диаметром 40 см. Подходит для небольших участков. Устанавливается в грунт без бетонирования.' },
  { title: '«Круглый стандарт»',      type: 'Сварной, Ø60 см',          price: 'от 2 200 ₽',  badge: 'Хит',      badgeColor: '#111',   desc: 'Самая популярная модель. Диаметр 60 см — оптимальный для большинства участков. Перфорированное дно для стока воды.' },
  { title: '«Круглый большой»',       type: 'Сварной, Ø80 см',          price: 'от 3 000 ₽',                                            desc: 'Цветник диаметром 80 см для семейного участка или двойного захоронения. Вместительный, устойчивый.' },
  { title: '«Прямоугольный»',         type: 'Сварной, 60×40 см',        price: 'от 2 500 ₽',                                            desc: 'Прямоугольный цветник 60×40 см. Удобен для угловой установки у основания памятника или оградки.' },
  { title: '«С витой окантовкой»',    type: 'Ковка, Ø60 см',            price: 'от 4 500 ₽',                                            desc: 'Кованый цветник с декоративной витой окантовкой по периметру. Эффектно смотрится с кованой оградкой.' },
  { title: '«С листьями»',            type: 'Художественная ковка',     price: 'от 6 500 ₽',  badge: 'Новинка',  badgeColor: '#111',   desc: 'Цветник с кованым орнаментом из листьев и завитков по краю. Каждый элемент выполнен вручную в нашей кузнице.' },
  { title: '«Двойной»',               type: 'Сварной, 120×40 см',       price: 'от 4 000 ₽',                                            desc: 'Удлинённый цветник 120×40 см для двух соседних захоронений. Равномерно обрамляет оба участка.' },
  { title: '«С крестом»',             type: 'Ковка + крест',            price: 'от 7 500 ₽',                                            desc: 'Цветник с интегрированным кованым крестом. Компактный и выразительный надгробный ансамбль.' },
  { title: '«Высокий на стойках»',    type: 'Подвесной, высота 40 см',  price: 'от 3 500 ₽',                                            desc: 'Цветник на металлических стойках высотой 40 см. Подходит для искусственных цветов, защищает их от воды и грязи.' },
  { title: '«Индивидуальный»',        type: 'Любая форма и размер',     price: 'от 2 000 ₽',                                            desc: 'Цветник по вашему эскизу или размерам. Форма сердца, звезды, прямоугольник с закруглениями — любой вариант.' },
];

export default function KovanyeTsvetnikPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Каталог', href: '/ritualnye-izdeliya' }, { label: 'Кованые цветники' }]}/>

      <section className="page-hero" style={{ backgroundImage: "url('/img/ritual-ogrady.jpg')" }}>
        <div className="container">
          <h1>Кованые цветники для могилы</h1>
          <p className="hero-desc">10 моделей: круглые, прямоугольные, с орнаментом, двойные. Собственное производство.</p>
          <div className="hero-badges">
            {['Ручная ковка', 'Гарантия 3 года', 'От 1 500 ₽', 'Установка под ключ'].map(b => (
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
            <h2>Каталог цветников — 10 моделей</h2>
            <p>Кованые и сварные цветники для кладбища собственного производства</p>
          </div>
          <div className="cat-grid">
            {TSVETNIKI.map((item) => (
              <div key={item.title} className="cat-card">
                <div className="cat-card-img">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.2 }}>
                    <circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>
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
            <h2>Частые вопросы о цветниках</h2>
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
            <h2>Заказать цветник</h2>
            <p>Оставьте заявку — перезвоним и рассчитаем стоимость</p>
          </div>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <OrderForm service="Кованый цветник" title=""/>
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
        { href: '/kovanye-kresty',            label: 'Кованые кресты' },
        { href: '/metallicheskie-pamyatniki', label: 'Металлические памятники' },
        { href: '/ritualnye-izdeliya',        label: 'Ритуальные изделия' },
        { href: '/catalog',                   label: 'Каталог оградок' },
        { href: '/blagoustrojstvo-mogily',    label: 'Благоустройство могил' },
        { href: '/cena-ogradki',              label: 'Цены' },
      ]}/>
    </>
  );
}
