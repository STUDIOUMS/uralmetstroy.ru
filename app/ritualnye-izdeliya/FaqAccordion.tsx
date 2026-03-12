'use client';
// app/ritualnye-izdeliya/FaqAccordion.tsx — клиентский аккордеон FAQ

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Какие ритуальные изделия вы производите?',
    answer:
      'Мы производим полный спектр ритуальных изделий из металла: кованые и сварные оградки (9+ моделей), православные и католические кресты (10 моделей), цветники для могилы (10 видов), металлические памятники с лазерной гравировкой, столики и скамейки, а также готовые комплекты «оградка + мебель» со скидкой. Всё изготавливается в собственном цеху по адресу ул. Красногвардейская 56А.',
  },
  {
    question: 'Есть ли доставка в другие города?',
    answer:
      'Да, доставляем в Верхнюю Салду, Кушву и Невьянск — от 2 500 ₽. По Нижнему Тагилу доставка бесплатная. В другие города Свердловской области — от 3 000 ₽, стоимость уточняется по адресу. Также доступен бесплатный самовывоз с нашего производства.',
  },
  {
    question: 'Можно ли заказать комплект со скидкой?',
    answer:
      'Да, при заказе готового комплекта (оградка + столик + скамейки) вы экономите 10–15% по сравнению с покупкой каждого элемента отдельно. Комплект «Стандарт» — от 25 000 ₽, кованый комплект — от 35 000 ₽, полный комплект с установкой — от 37 500 ₽. Установка входит в стоимость комплекта.',
  },
  {
    question: 'Сколько стоит консультация?',
    answer:
      'Консультация по телефону — бесплатно. Выезд мастера для замера участка на кладбище — тоже бесплатно, без обязательств. Замер занимает 15–20 минут, после чего мы предоставляем точный расчёт стоимости. Звоните: +7 (922) 03-08-444.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(prev => (prev === i ? null : i));
  }

  return (
    <div className="faq-accordion" role="list">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={`faq-acc-item${isOpen ? ' faq-acc-item--open' : ''}`} role="listitem">
            <button
              className="faq-acc-question"
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
              type="button"
            >
              <span>{item.question}</span>
              <span className="faq-acc-icon" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="faq-acc-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        .faq-accordion {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .faq-acc-item {
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--white);
        }
        .faq-acc-item--open {
          border-color: var(--primary);
        }
        .faq-acc-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 20px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text);
          line-height: 1.45;
          transition: background 0.15s;
        }
        .faq-acc-question:hover {
          background: var(--secondary-bg);
        }
        .faq-acc-icon {
          flex-shrink: 0;
          font-size: 1.4rem;
          font-weight: 400;
          color: var(--primary);
          line-height: 1;
          width: 24px;
          text-align: center;
        }
        .faq-acc-answer {
          padding: 0 20px 18px;
          border-top: 1px solid var(--border);
        }
        .faq-acc-answer p {
          margin: 14px 0 0;
          font-size: 0.9rem;
          color: var(--text-light);
          line-height: 1.65;
        }
      `}</style>
    </div>
  );
}
