'use client';
// components/Footer.tsx
import Link from 'next/link';
import { useState } from 'react';
import { SITE } from '@/lib/data';

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="footer-column footer-acc-col">
      <button
        className={`footer-acc-toggle${open ? ' open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {title}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <h3 aria-hidden="true">{title}</h3>
      <div className={`footer-acc-body${open ? ' open' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid footer-grid-5">

          {/* Колонка 1: логотип + о компании */}
          <div className="footer-column footer-contact-block">
            <div className="footer-logo">УралМетСтрой</div>
            <p>Собственное производство кованых и сварных ритуальных изделий. {SITE.city}, с {SITE.workingFrom} года.</p>
            <div className="footer-social">
              <a href={`https://wa.me/${SITE.phoneRaw}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-btn">WA</a>
            </div>
          </div>

          {/* Колонка 2: контакты — всегда открыты */}
          <div className="footer-column footer-contact-block">
            <h3>Контакты</h3>
            <div className="footer-acc-body">
              <p className="footer-contact">
                <strong>Телефон:</strong><br/>
                <a href={SITE.phoneTel}>{SITE.phone}</a>
              </p>
              <p className="footer-address">
                <strong>Адрес:</strong><br/>
                {SITE.address},<br/>
                {SITE.city}, {SITE.zip}
              </p>
              <p className="footer-hours">
                <strong>Работаем:</strong><br/>
                {SITE.hours.weekdays}<br/>
                {SITE.hours.saturday}
              </p>
            </div>
          </div>

          {/* Колонка 3: каталог — аккордеон на мобиле */}
          <AccordionSection title="Каталог">
            <ul className="footer-links">
              <li><Link href="/ritualnye-izdeliya">Ритуальные изделия</Link></li>
              <li><Link href="/catalog">Все оградки</Link></li>
              <li><Link href="/catalog#kovanye">Кованые оградки</Link></li>
              <li><Link href="/catalog#svarnye">Сварные оградки</Link></li>
              <li><Link href="/stolik-i-skameyka">Столики и скамейки</Link></li>
              <li><Link href="/kovanye-kresty">Кованые кресты</Link></li>
              <li><Link href="/kovanye-tsvetniki">Цветники</Link></li>
              <li><Link href="/metallicheskie-pamyatniki">Памятники</Link></li>
            </ul>
          </AccordionSection>

          {/* Колонка 4: услуги + компания — аккордеон на мобиле */}
          <AccordionSection title="Услуги">
            <ul className="footer-links">
              <li><Link href="/ustanovka">Установка оградок</Link></li>
              <li><Link href="/pokraska-ogradki">Покраска оградок</Link></li>
              <li><Link href="/remont-ogradki">Ремонт оградок</Link></li>
              <li><Link href="/demontazh-ogradki">Демонтаж оградок</Link></li>
              <li><Link href="/blagoustrojstvo-mogily">Благоустройство</Link></li>
              <li><Link href="/cena-ogradki">Цены</Link></li>
              <li><Link href="/dostavka-i-oplata">Доставка и оплата</Link></li>
            </ul>
            <h3 style={{ marginTop: '16px' }}>Компания</h3>
            <ul className="footer-links">
              <li><Link href="/o-kompanii">О нас</Link></li>
              <li><Link href="/nashi-raboty">Наши работы</Link></li>
              <li><Link href="/otzyvy">Отзывы</Link></li>
              <li><Link href="/blog">Блог</Link></li>
              <li><Link href="/kontakty">Контакты</Link></li>
              <li><Link href="/garantii">Гарантии</Link></li>
            </ul>
          </AccordionSection>

          {/* Колонка 5: кладбища — аккордеон на мобиле */}
          <AccordionSection title="Кладбища НТ">
            <ul className="footer-links">
              {SITE.cemeteries.map(c => <li key={c}>{c}</li>)}
              <li>Вся Свердловская обл.</li>
            </ul>
            <a
              href={SITE.phoneTel}
              style={{ display: 'block', marginTop: '16px', color: 'var(--primary)', fontWeight: 700, fontSize: '1.05rem', background: 'rgba(255,255,255,.1)', padding: '10px 14px', borderRadius: 'var(--radius)', textDecoration: 'none', textAlign: 'center' }}
            >
              {SITE.phone}
            </a>
          </AccordionSection>

        </div>

        <div className="footer-bottom">
          <p>© {SITE.workingFrom}–{year} {SITE.name}. Производство кованых и сварных ритуальных изделий в {SITE.city}.</p>
          <p>
            <Link href="/politika-konfidencialnosti">Политика конфиденциальности</Link>
            &nbsp;·&nbsp;
            <Link href="/kontakty">Контакты</Link>
            &nbsp;·&nbsp;
            <a href="/sitemap.xml">Карта сайта</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
