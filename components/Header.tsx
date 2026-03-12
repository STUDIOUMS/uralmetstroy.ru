'use client';
// components/Header.tsx
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/data';

interface DropdownItem {
  href: string;
  label: string;
}

interface NavItem {
  href?:     string;
  label:     string;
  dropdown?: DropdownItem[];
}

const NAV: NavItem[] = [
  { href: '/', label: 'Главная' },
  {
    label: 'Каталог',
    dropdown: [
      { href: '/ritualnye-izdeliya',         label: 'Ритуальные изделия' },
      { href: '/catalog',                    label: 'Все оградки' },
      { href: '/kovanye-kresty',             label: 'Кованые кресты' },
      { href: '/kovanye-tsvetniki',          label: 'Цветники' },
      { href: '/metallicheskie-pamyatniki',  label: 'Памятники' },
      { href: '/stolik-i-skameyka',          label: 'Столики и скамейки' },
    ],
  },
  {
    label: 'Услуги',
    dropdown: [
      { href: '/ustanovka',             label: 'Установка оградок' },
      { href: '/pokraska-ogradki',      label: 'Покраска оградок' },
      { href: '/remont-ogradki',        label: 'Ремонт оградок' },
      { href: '/demontazh-ogradki',     label: 'Демонтаж оградок' },
      { href: '/blagoustrojstvo-mogily',label: 'Благоустройство' },
    ],
  },
  { href: '/cena-ogradki', label: 'Цены' },
  {
    label: 'О нас',
    dropdown: [
      { href: '/o-kompanii',    label: 'О компании' },
      { href: '/nashi-raboty',  label: 'Наши работы' },
      { href: '/otzyvy',        label: 'Отзывы' },
      { href: '/blog',          label: 'Блог' },
      { href: '/kontakty',      label: 'Контакты' },
    ],
  },
];

export default function Header() {
  const pathname             = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDd, setOpenDd]  = useState<string | null>(null);
  const headerRef            = useRef<HTMLElement>(null);

  // Закрывать дропдаун при клике снаружи
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDd(null);
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Блокировать прокрутку body при открытом меню
  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  // Закрывать при смене маршрута
  useEffect(() => {
    setMenuOpen(false);
    setOpenDd(null);
  }, [pathname]);

  function isActive(href?: string, dropdown?: DropdownItem[]): boolean {
    if (href) return pathname === href || (href !== '/' && pathname.startsWith(href));
    if (dropdown) return dropdown.some(d => pathname.startsWith(d.href));
    return false;
  }

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <Link href="/" className="logo" aria-label="На главную — УралМетСтрой">
          <svg className="logo-icon" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          УралМетСтрой
        </Link>

        <nav className={`nav${menuOpen ? ' active' : ''}`} id="mainNav" aria-label="Основная навигация">
          {NAV.map((item) => (
            item.dropdown ? (
              <div key={item.label} className={`dropdown${openDd === item.label ? ' open' : ''}`}>
                <button
                  className={`dropdown-toggle${isActive(undefined, item.dropdown) ? ' active' : ''}`}
                  aria-expanded={openDd === item.label}
                  aria-haspopup="true"
                  onClick={() => setOpenDd(openDd === item.label ? null : item.label)}
                >
                  {item.label}
                  <span className="dropdown-arrow" aria-hidden="true">▾</span>
                </button>
                <div className="dropdown-menu" aria-label={item.label}>
                  {item.dropdown.map((d) => (
                    <Link
                      key={d.href}
                      href={d.href}
                      className={pathname === d.href ? 'active' : ''}
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={isActive(item.href) ? 'active' : ''}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <a className="phone" href={SITE.phoneTel} aria-label={`Позвонить ${SITE.phone}`}>
          {SITE.phone}
        </a>

        {/* Иконка телефона — только на мобиле */}
        <a className="mobile-phone-btn" href={SITE.phoneTel} aria-label={`Позвонить ${SITE.phone}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.18 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
          </svg>
        </a>

        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          id="hamburger"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span/><span/><span/>
        </button>
      </div>

      <div
        className={`nav-overlay${menuOpen ? ' active' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
    </header>
  );
}
