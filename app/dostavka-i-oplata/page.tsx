// app/dostavka-i-oplata/page.tsx — Доставка и оплата
import type { Metadata } from 'next';
import { SITE } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import OrderForm from '@/components/OrderForm';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'Доставка и оплата — УралМетСтрой, Нижний Тагил',
  description: 'Бесплатная доставка по Нижнему Тагилу. Оплата наличными, картой, безнал. Рассрочка от 20 000 ₽.',
  alternates: { canonical: '/dostavka-i-oplata' },
};

const BREADCRUMB_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Доставка и оплата' },
];

const DELIVERY_ROWS = [
  { zone: 'Нижний Тагил', price: 'БЕСПЛАТНО', note: 'Все кладбища города' },
  { zone: 'Верхняя Салда, Кушва, Невьянск', price: 'от 2 500 ₽', note: 'До 80 км от Нижнего Тагила' },
  { zone: 'Другие города области', price: 'от 3 000 ₽', note: 'Цена уточняется по адресу' },
  { zone: 'Самовывоз', price: 'БЕСПЛАТНО', note: SITE.address },
];

const PAYMENT_METHODS = [
  {
    title: 'Наличные',
    desc: 'При получении товара или после завершения установки. Удобно — платите, когда всё готово.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M6 12h.01M18 12h.01"/>
      </svg>
    ),
  },
  {
    title: 'Карта (Сбер, Тинькофф)',
    desc: 'Оплата онлайн по ссылке или при встрече через терминал. Без комиссии.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
        <line x1="6" y1="15" x2="10" y2="15"/>
      </svg>
    ),
  },
  {
    title: 'Безналичный расчёт',
    desc: 'Для юридических лиц и ИП. Выставляем счёт-фактуру, договор, закрывающие документы.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="8" y1="13" x2="16" y2="13"/>
        <line x1="8" y1="17" x2="12" y2="17"/>
      </svg>
    ),
  },
];

const PAYMENT_CONDITIONS = [
  {
    label: 'Предоплата',
    value: '50%',
    desc: 'при оформлении заказа — для запуска производства',
  },
  {
    label: 'Остаток',
    value: '50%',
    desc: 'после завершения установки и вашей приёмки работ',
  },
  {
    label: 'Рассрочка',
    value: '0%',
    desc: 'при заказе от 20 000 ₽ — на срок 3 или 6 месяцев без переплаты',
  },
];

export default function DostavkaPage() {
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />

      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <h1>Доставка и оплата</h1>
          <p className="hero-desc">
            Бесплатная доставка по {SITE.city}. Удобные способы оплаты —
            наличные, карта, безнал. Рассрочка 0% от 20 000 ₽.
          </p>
          <div className="hero-badges">
            {[
              'Доставка по НТ бесплатно',
              'Рассрочка 0%',
              'Предоплата 50%',
              'Самовывоз бесплатно',
            ].map(b => (
              <span key={b} className="hero-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ДОСТАВКА */}
      <section className="section">
        <div className="container">
          <div className="dop-grid">
            {/* Текст */}
            <div className="dop-text">
              <div className="section-header" style={{ textAlign: 'left' }}>
                <h2>Доставка</h2>
                <p>Привозим оградки, столики и все изделия прямо на кладбище</p>
              </div>
              <ul className="dop-list">
                <li>
                  <span className="dop-icon">🚚</span>
                  <span>По <strong>Нижнему Тагилу</strong> — доставка <strong>бесплатна</strong> при любом заказе</span>
                </li>
                <li>
                  <span className="dop-icon">📍</span>
                  <span>Самовывоз по адресу: <strong>{SITE.address}</strong> — бесплатно, в рабочее время</span>
                </li>
                <li>
                  <span className="dop-icon">⏱</span>
                  <span>Сроки доставки: <strong>1–2 дня</strong> после изготовления заказа</span>
                </li>
                <li>
                  <span className="dop-icon">📞</span>
                  <span>Согласуем удобное время доставки по телефону <a href={SITE.phoneTel} className="dop-phone">{SITE.phone}</a></span>
                </li>
              </ul>
            </div>

            {/* Таблица зон */}
            <div className="dop-table-wrap">
              <table className="price-table dop-table">
                <thead>
                  <tr>
                    <th>Зона доставки</th>
                    <th>Стоимость</th>
                    <th>Примечание</th>
                  </tr>
                </thead>
                <tbody>
                  {DELIVERY_ROWS.map(r => (
                    <tr key={r.zone}>
                      <td>{r.zone}</td>
                      <td>
                        <strong className={r.price === 'БЕСПЛАТНО' ? 'price-free' : ''}>
                          {r.price}
                        </strong>
                      </td>
                      <td className="note-cell">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* СПОСОБЫ ОПЛАТЫ */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Способы оплаты</h2>
            <p>Выберите удобный вариант — работаем с физическими и юридическими лицами</p>
          </div>
          <div className="pay-methods-grid">
            {PAYMENT_METHODS.map(m => (
              <div key={m.title} className="pay-card">
                <div className="pay-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* УСЛОВИЯ ОПЛАТЫ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Условия оплаты</h2>
            <p>Прозрачная схема — платите только когда убедились в качестве работы</p>
          </div>
          <div className="conditions-grid">
            {PAYMENT_CONDITIONS.map(c => (
              <div key={c.label} className="condition-card">
                <div className="condition-value">{c.value}</div>
                <h3 className="condition-label">{c.label}</h3>
                <p className="condition-desc">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="conditions-note">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>
              Рассрочка предоставляется при заказе от <strong>20 000 ₽</strong>.
              Срок — 3 или 6 месяцев без переплат и скрытых комиссий.
              Уточняйте условия при оформлении заказа.
            </span>
          </div>
        </div>
      </section>

      {/* ФОРМА */}
      <section className="section bg-light" id="order">
        <div className="container">
          <div className="section-header">
            <h2>Оставить заявку</h2>
            <p>Перезвоним в течение 15 минут и ответим на все вопросы по доставке и оплате</p>
          </div>
          <div className="form-wrap">
            <OrderForm title="" />
          </div>
        </div>
      </section>

      <style>{`
        /* ── Общий двухколоночный грид ─────────────────── */
        .dop-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 800px) { .dop-grid { grid-template-columns: 1fr; } }

        /* ── Текст с буллетами ─────────────────────────── */
        .dop-list {
          list-style: none;
          padding: 0;
          margin: 20px 0 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .dop-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.925rem;
          line-height: 1.55;
          color: var(--text);
        }
        .dop-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .dop-phone { color: var(--primary); font-weight: 600; text-decoration: none; }
        .dop-phone:hover { text-decoration: underline; }

        /* ── Таблица доставки ──────────────────────────── */
        .dop-table-wrap {
          overflow-x: auto;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          box-shadow: 0 2px 8px rgba(0,0,0,.05);
        }
        .dop-table { margin: 0; }
        .price-free { color: #16a34a; }
        .note-cell { color: var(--text-light); font-size: 0.85rem; }

        /* ── Карточки способов оплаты ──────────────────── */
        .pay-methods-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 700px) { .pay-methods-grid { grid-template-columns: 1fr; } }

        .pay-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pay-icon {
          color: var(--primary);
          margin-bottom: 4px;
        }
        .pay-card h3 {
          font-size: 1rem;
          font-weight: 700;
          margin: 0;
        }
        .pay-card p {
          font-size: 0.875rem;
          color: var(--text-light);
          line-height: 1.55;
          margin: 0;
        }

        /* ── Условия оплаты ────────────────────────────── */
        .conditions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }
        @media (max-width: 700px) { .conditions-grid { grid-template-columns: 1fr; } }

        .condition-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          text-align: center;
        }
        .condition-value {
          font-size: 2.8rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 8px;
        }
        .condition-label {
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 8px;
        }
        .condition-desc {
          font-size: 0.875rem;
          color: var(--text-light);
          line-height: 1.55;
          margin: 0;
        }

        .conditions-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: #fefce8;
          border: 1px solid #fde047;
          border-radius: var(--radius);
          padding: 14px 18px;
          font-size: 0.875rem;
          color: #713f12;
          line-height: 1.55;
        }
        .conditions-note svg {
          flex-shrink: 0;
          margin-top: 1px;
          color: #ca8a04;
        }

        /* ── Форма ─────────────────────────────────────── */
        .form-wrap { max-width: 640px; margin: 0 auto; }
      `}</style>

      <RelatedLinks links={[
        { href: '/garantii',     label: 'Гарантии' },
        { href: '/kontakty',     label: 'Контакты' },
        { href: '/o-kompanii',   label: 'О компании' },
        { href: '/catalog',      label: 'Каталог оградок' },
        { href: '/cena-ogradki', label: 'Цены' },
      ]}/>
    </>
  );
}
