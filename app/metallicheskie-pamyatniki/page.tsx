// app/metallicheskie-pamyatniki/page.tsx — Металлические памятники: каталог 10 моделей
import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import OrderForm from '@/components/OrderForm';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Металлические памятники в Нижнем Тагиле — 10 моделей | УралМетСтрой',
  description: 'Металлические памятники на могилу с лазерной гравировкой. 10 моделей от 12 000 ₽. Установка за 1 день. Нижний Тагил.',
  alternates: { canonical: `${SITE.url}/metallicheskie-pamyatniki` },
  openGraph: {
    title:       'Металлические памятники в Нижнем Тагиле — 10 моделей | УралМетСтрой',
    description: 'Металлические памятники на могилу с лазерной гравировкой. 10 моделей от 12 000 ₽. Установка за 1 день.',
    url:         '/metallicheskie-pamyatniki',
    images:      [{ url: '/img/pamyatnik-1.jpg', width: 1200, height: 800, alt: 'Металлические памятники — УралМетСтрой' }],
  },
};

const FAQ_ITEMS = [
  { q: 'Чем металлический памятник отличается от гранитного?', a: 'Металл значительно дешевле, устанавливается за 1 день. Гранит долговечнее, но дороже в 5–10 раз и требует больше времени на изготовление и установку.' },
  { q: 'Можно ли нанести фото на металлический памятник?',     a: 'Да, лазерная гравировка портрета по вашей фотографии. Присылайте фото в хорошем качестве (от 300 dpi). Гравировка чёткая и долговечная.' },
  { q: 'Как долго служит металлический памятник?',             a: 'При качественном порошковом покрытии — 15–25 лет. Рекомендуем раз в 5–7 лет обновлять покраску для максимального срока службы.' },
  { q: 'Входит ли установка в стоимость?',                     a: 'Установка на готовый фундамент включена в стоимость. Если нужен фундамент — доплата от 3 000 ₽. Работы выполняем за 1 день.' },
];

interface PamyatnikItem {
  title:       string;
  type:        string;
  price:       string;
  badge?:      string;
  badgeColor?: string;
  desc:        string;
}

const PAMYATNIKI: PamyatnikItem[] = [
  { title: '«Стела»',                   type: 'Листовой металл 4 мм',     price: 'от 12 000 ₽', badge: 'Доступно', badgeColor: '#16a34a', desc: 'Простая прямоугольная стела без декора. Высота 80–120 см, порошковая краска. Быстрое изготовление — 2–3 дня.' },
  { title: '«Стела с аркой»',           type: 'Листовой металл + арка',   price: 'от 15 000 ₽', badge: 'Хит',      badgeColor: '#111',   desc: 'Прямоугольная стела с арочным навершием. Классический и строгий вид. Подходит для православных захоронений.' },
  { title: '«С цветочным орнаментом»', type: 'Металл + кованые накладки', price: 'от 22 000 ₽',                                            desc: 'Стела с накладным кованым орнаментом из листьев и завитков. Сочетание металлического памятника и кузнечной работы.' },
  { title: '«С фотоовалом»',            type: 'Металл + фотоовал',        price: 'от 18 000 ₽',                                            desc: 'Стела с местом под фотоовал. Керамический фотоовал вставляется в рамку. Современный и личный формат памяти.' },
  { title: '«С лазерной гравировкой»', type: 'Портрет + надпись',         price: 'от 20 000 ₽',                                            desc: 'Металлическая стела с лазерной гравировкой портрета, имени и дат. Высокая детализация, долговечность гравировки 20+ лет.' },
  { title: '«Православный»',            type: 'Стела + крест',            price: 'от 16 000 ₽',                                            desc: 'Стела с интегрированным православным крестом в навершии. Традиционная форма для православных захоронений.' },
  { title: '«Мусульманский»',           type: 'Стела + полумесяц',        price: 'от 16 000 ₽',                                            desc: 'Стела с полумесяцем и звездой в навершии. Подходит для мусульманских захоронений. Надписи на русском и арабском.' },
  { title: '«Двойной»',                 type: 'Широкая стела 80×120 см',  price: 'от 28 000 ₽',                                            desc: 'Широкий памятник 80×120 см для двух имён. Два отдельных отсека для фотографий и надписей в едином стиле.' },
  { title: '«С декоративной рамкой»',   type: 'Металл + кованая рамка',   price: 'от 25 000 ₽', badge: 'Новинка',  badgeColor: '#111',   desc: 'Стела в декоративной кованой рамке с завитками. Изысканный вид, высокая художественная ценность.' },
  { title: '«Индивидуальный проект»',   type: 'Любая форма и размер',     price: 'от 20 000 ₽',                                            desc: 'Памятник по вашему эскизу или описанию. Нестандартная форма, размер, комбинация материалов и декора.' },
];

export default function MetallPamyatnikiPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Каталог', href: '/ritualnye-izdeliya' }, { label: 'Металлические памятники' }]}/>

      <section className="page-hero">
        <div className="container">
          <h1>Металлические памятники на могилу</h1>
          <p className="hero-desc">10 моделей: стелы, с гравировкой, с фотоовалом, двойные, православные. Установка за 1 день.</p>
          <div className="hero-badges">
            {['Собственное производство', 'Установка за 1 день', 'От 12 000 ₽', 'Гарантия 3 года'].map(b => (
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
            <h2>Каталог памятников — 10 моделей</h2>
            <p>Металлические памятники собственного производства с лазерной гравировкой</p>
          </div>
          <div className="cat-grid">
            {PAMYATNIKI.map((item) => (
              <div key={item.title} className="cat-card">
                <div className="cat-card-img">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.2 }}>
                    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/>
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
            <h2>Частые вопросы о памятниках</h2>
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
            <h2>Заказать памятник</h2>
            <p>Оставьте заявку — перезвоним и рассчитаем стоимость</p>
          </div>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <OrderForm service="Металлический памятник" title=""/>
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
        { href: '/kovanye-kresty',     label: 'Кованые кресты' },
        { href: '/kovanye-tsvetniki',  label: 'Кованые цветники' },
        { href: '/ritualnye-izdeliya', label: 'Ритуальные изделия' },
        { href: '/catalog',            label: 'Каталог оградок' },
        { href: '/nashi-raboty',       label: 'Наши работы' },
        { href: '/cena-ogradki',       label: 'Цены' },
      ]}/>
    </>
  );
}
