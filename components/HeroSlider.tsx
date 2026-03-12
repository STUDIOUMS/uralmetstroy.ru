'use client';
// components/HeroSlider.tsx — слайдер Hero на главной (CSS transitions, без библиотек)
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/data';

interface Slide {
  tag:    string;
  h1:     string;
  sub:    string;
  badges: string[];
  btns:   Array<{ label: string; href: string; primary?: boolean }>;
}

const SLIDES: Slide[] = [
  {
    tag:    'Нижний Тагил · собственное производство с 2010 года',
    h1:     'Кованые и сварные оградки на могилу',
    sub:    'Изготавливаем в собственном кузнечном цехе. Установка под ключ на всех кладбищах Нижнего Тагила.',
    badges: ['Гарантия 3–5 лет', 'Быстрая установка', 'От 2 000 ₽/м.пог.'],
    btns:   [
      { label: 'Рассчитать стоимость', href: '#order',   primary: true },
      { label: 'Каталог оградок',      href: '/catalog' },
    ],
  },
  {
    tag:    'Установка на любом кладбище Нижнего Тагила',
    h1:     'Установка за 1 день на всех кладбищах',
    sub:    'Работаем на Красном Камне, Вагонском, Гальяно-Горбуновском и других. Бесплатный выезд для замера.',
    badges: ['Красный Камень', 'Вагонское', 'Гальяно-Горбуновское'],
    btns:   [
      { label: 'Подробнее об установке', href: '/ustanovka', primary: true },
      { label: 'Позвонить',              href: SITE.phoneTel },
    ],
  },
  {
    tag:    'Акция · до конца месяца',
    h1:     'Столик + скамейка в подарок',
    sub:    'При заказе кованой оградки от 15 000 ₽ — ритуальный столик в подарок. Успейте воспользоваться предложением.',
    badges: ['При заказе от 15 000 ₽', 'До конца месяца', 'Только кованые модели'],
    btns:   [
      { label: 'Узнать подробнее', href: '/catalog#kovanye', primary: true },
      { label: 'Смотреть модели',  href: '/catalog' },
    ],
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const startX = useRef<number>(0);

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), []);

  // Автопрокрутка 5 сек
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, 5000);
    return () => clearTimeout(id);
  }, [current, paused, next]);

  // Swipe на мобиле
  function onTouchStart(e: React.TouchEvent) { startX.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) dx > 0 ? next() : prev();
  }

  const slide = SLIDES[current];

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Главный слайдер"
    >
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-tag">{slide.tag}</p>
            <h1>{slide.h1}</h1>
            <p className="hero-sub">{slide.sub}</p>
            <div className="hero-actions">
              {slide.btns.map(btn => (
                <Link
                  key={btn.label}
                  href={btn.href}
                  className={btn.primary ? 'btn btn-white btn-lg' : 'btn btn-outline-white btn-lg'}
                >
                  {btn.label}
                </Link>
              ))}
            </div>
            <div className="hero-badges">
              {slide.badges.map(b => (
                <span key={b} className="hero-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Управление слайдером */}
        <div className="slider-controls">
          {/* Стрелки */}
          <button className="slider-arrow slider-arrow--prev" onClick={prev} aria-label="Предыдущий слайд">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          {/* Точки */}
          <div className="slider-dots" role="tablist" aria-label="Слайды">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Слайд ${i + 1}`}
                className={`slider-dot${i === current ? ' active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>

          {/* Стрелка вперёд */}
          <button className="slider-arrow slider-arrow--next" onClick={next} aria-label="Следующий слайд">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      <style>{`
        .hero { background: var(--primary); color: white; padding: 64px 0 40px; overflow: hidden; position: relative; }
        .hero-content { min-height: 280px; }
        .hero-text { max-width: 640px; }
        .hero-tag { font-size: 0.85rem; text-transform: uppercase; letter-spacing: .08em; color: rgba(255,255,255,.55); margin-bottom: 12px; }
        .hero-text h1 { font-size: clamp(1.8rem, 4.5vw, 3rem); font-weight: 800; line-height: 1.15; margin-bottom: 16px; }
        .hero-sub { font-size: 1.05rem; color: rgba(255,255,255,.8); max-width: 520px; margin-bottom: 28px; line-height: 1.6; }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; }
        .btn-white { background: white; color: var(--primary); border-color: white; }
        .btn-white:hover { background: var(--secondary-bg); }
        .btn-outline-white { background: transparent; color: white; border-color: rgba(255,255,255,.5); }
        .btn-outline-white:hover { background: rgba(255,255,255,.12); border-color: white; }
        .hero-badges { display: flex; flex-wrap: wrap; gap: 8px; }
        .hero-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 0.8rem; color: rgba(255,255,255,.75); }

        .slider-controls { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 32px; }
        .slider-dots { display: flex; gap: 8px; align-items: center; }
        .slider-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.3); border: none; cursor: pointer; padding: 0; transition: all .25s; }
        .slider-dot.active { background: white; width: 24px; border-radius: 4px; }
        .slider-arrow { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; padding: 0; }
        .slider-arrow:hover { background: rgba(255,255,255,.2); }

        @media (max-width: 1024px) {
          .hero { padding: 48px 0 32px; }
          .hero-content { min-height: 240px; }
          .hero-text h1 { font-size: clamp(1.6rem, 4vw, 2.4rem); }
        }
        @media (max-width: 768px) {
          .hero { padding: 36px 0 28px; }
          .hero-content { min-height: auto; }
          .hero-text { text-align: center; }
          .hero-text h1 { font-size: clamp(1.4rem, 5.5vw, 2rem); }
          .hero-sub { font-size: 0.95rem; margin-bottom: 20px; max-width: 100%; }
          .hero-actions { justify-content: center; }
          .hero-badges { justify-content: center; }
          .slider-controls { margin-top: 20px; }
        }
        @media (max-width: 480px) {
          .hero { padding: 28px 0 20px; }
          .hero-text h1 { font-size: clamp(1.3rem, 6vw, 1.8rem); }
          .hero-sub { font-size: 0.875rem; }
          .hero-actions { flex-direction: column; gap: 10px; }
          .hero-actions .btn { width: 100%; justify-content: center; }
          .hero-tag { font-size: 0.78rem; }
          .slider-controls { margin-top: 16px; }
          .slider-arrow { width: 30px; height: 30px; }
        }
        @media (max-width: 375px) {
          .hero-text h1 { font-size: 1.3rem; }
          .hero-sub { font-size: 0.825rem; }
          .hero-badge { font-size: 0.73rem; }
        }
      `}</style>
    </section>
  );
}
