# CONTEXT — uralmetstroy.ru

Дата обновления: 2026-03-11 (сессия 3)

## Стек

- **Next.js 14** (App Router, SSR), TypeScript
- **CSS**: globals.css, CSS-переменные, без Tailwind
- **Данные**: `lib/data.ts` — единый источник (PRODUCTS, SERVICES, BLOG_POSTS, SITE)
- **Форма**: POST `/api/send-form` → Telegram Bot API
- **Deploy**: PM2 cluster (2 инстанса) + Nginx reverse proxy
- **Node.js**: v20.20.1
- **Порт**: 3000 (uralmetstroy — единственный сайт на этом сервере)
- **Сервер**: 138.249.141.64
- **SSL**: Let's Encrypt, действует до 2026-06-08

## Структура приложения

```
app/
  page.tsx                    — Главная
  layout.tsx                  — Layout (Header, Footer, шрифты)
  not-found.tsx               — 404
  robots.ts                   — robots.txt
  sitemap.ts                  — sitemap.xml (авто)
  catalog/page.tsx            — Каталог оградок
  [slug]/page.tsx             — Страница товара (динамическая)
  blog/page.tsx               — Список статей блога
  blog/[slug]/page.tsx        — Статья блога (динамическая)
  cena-ogradki/page.tsx       — Страница цен
  kontakty/page.tsx           — Контакты + карта
  ustanovka/page.tsx          — Услуга: установка
  pokraska-ogradki/page.tsx   — Услуга: покраска
  remont-ogradki/page.tsx     — Услуга: ремонт
  demontazh-ogradki/page.tsx  — Услуга: демонтаж
  blagoustrojstvo-mogily/page.tsx — Услуга: благоустройство
  api/send-form/route.ts      — API форм → Telegram
lib/
  data.ts                     — Все данные проекта
components/
  Header.tsx, Footer.tsx, OrderForm.tsx, ProductCard.tsx, Breadcrumb.tsx, ...
public/img/
  hero-ograda.jpg             — Герой главной страницы
  slide1-3.jpg/webp           — Слайды (также .webp)
  ogrady.jpg/webp             — Категория оградки
  ritualnye-izdeliya.jpg/webp — Категория ритуальные изделия
  ritual-ogrady.jpg/webp      — Доп. фото
  stolik-skameyka.jpg/webp    — Столики и скамейки
  ogrady/
    ograda-klassicheskaya-1.jpg  — РЕАЛЬНОЕ ФОТО ✓
    ograda-klassicheskaya-2.jpg  — РЕАЛЬНОЕ ФОТО ✓
    ograda-*.svg                 — SVG заглушки (остальные 7 товаров)
    placeholder.svg
```

## Что сделано (хронология сессии)

1. **Обновлён Node.js** с v18.19.1 до v20.20.1 (через NodeSource)
2. **Исправлен баг**: оба сайта (uralmetstroy + podkova-nt) висели на порту 3000 → рандомно отдавал контент подковы. Podkova-nt удалена с сервера полностью (PM2 + Nginx)
3. **Исправлен next.config.js**: `NEXT_PUBLIC_SITE_NAME` был `'Подкова-НТ'` → `'УралМетСтрой'`
4. **Исправлен sitemap.ts**: удалены 7 несуществующих страниц (ritualnye-izdeliya, stolik-i-skameyka, kovanye-kresty и др.) — были 404
5. **Созданы 7 новых страниц**: ustanovka, pokraska-ogradki, remont-ogradki, demontazh-ogradki, blagoustrojstvo-mogily, cena-ogradki, kontakty
6. **Перенесены реальные фото** из источника `/var/www/1-podkova-nt.ru-v3.0-17.02.26/`: 16 файлов JPG+WebP, исправлены пути в data.ts для `ograda-klassicheskaya`
7. **SSL сертификат** обновлён (certbot --force-renewal)
8. **Сборка**: `npm run build` — 31 страница, статус 200

## Источник контента (исходник)

`/var/www/1-podkova-nt.ru-v3.0-17.02.26/podkova-nt.ru-v3.0-17.02.26/`

Содержит HTML-файлы с полными текстами статей, FAQ, описаниями товаров, фотографиями.

## Сделано дополнительно (2026-03-11, сессия 2)

9. **Блог** — дописаны 3 статьи: `kladbishcha-nizhny-tagil`, `uhod-za-ogradkoj`, `ceny-na-ogradki-2026`
10. **FAQ компонент** — создан `components/FAQ.tsx` со Schema.org FAQPage; добавлен в `[slug]/page.tsx`
11. **FAQ данные** — добавлены 4 вопроса/ответа для каждого из 9 товаров в `data.ts`
12. **Новые товары** — добавлены 6 товаров: кресты, цветники, памятники, 2 столика, 2 скамейки
13. **Страница портфолио** — создана `app/nashi-raboty/page.tsx` с галереей и Schema.org
14. **Header** — исправлены нерабочие ссылки (ritualnye-izdeliya → kovanye-kresty и др.), удалён /o-kompanii
15. **Sitemap** — добавлена страница `/nashi-raboty`
16. **Сборка** — 39 страниц, все HTTP 200

## Сделано (сессия 3, 2026-03-11 — FINAL-PROMT-v2)

### БЛОК 7 (Мобильные баги) — ВЫПОЛНЕНО
- Добавлена иконка телефона в мобильный хедер (mobile-phone-btn)
- Hero секция перекомпонована под мобиле (center, кнопки стеком, фото под текстом)
- product-grid: 1 колонка на 480px, services-grid: 2 колонки на 600px
- Форма: font-size 16px (нет iOS zoom), min-height 48px
- Футер: аккордеон на мобиле (клиентский компонент, контакты всегда открыты)
- Таблицы: responsive CSS (карточки на <480px)
- Steps: горизонтальный layout на мобиле

### БЛОК 1 (Новые страницы) — ВЫПОЛНЕНО
Создано 6 новых страниц (все HTTP 200):
- /o-kompanii — история, производство, преимущества, Schema.org Org+LocalBusiness
- /politika-konfidencialnosti — 152-ФЗ, robots: noindex
- /otzyvy — 8 отзывов, Schema.org Review+AggregateRating
- /garantii — 4 вида гарантий, талон
- /dostavka-i-oplata — доставка по зонам, способы оплаты, рассрочка
- /ritualnye-izdeliya — 6 категорий-карточек, FAQ аккордеон, Schema.org ItemList
- /stolik-i-skameyka — каталог столиков и скамеек

### БЛОК 2 (Секции на главную) — ВЫПОЛНЕНО
- HeroSlider.tsx — 3 слайда, автопрокрутка 5с, точки, стрелки, свайп на мобиле
- Секция "География работ" — 6 кладбищ карточками
- Секция "Отзывы" — 3 карточки + кнопка "Все отзывы"
- Секция "FAQ" — 4 вопроса <details/summary>
- Секция "Превью блога" — 4 последних статьи
- Schema.org: Organization, LocalBusiness, FAQPage на главной

### БЛОК 5 (Навигация/футер) — ВЫПОЛНЕНО
- Header: "О нас" dropdown обновлён (+ О компании, + Отзывы)
- Header: Каталог dropdown обновлён (+ Ритуальные изделия, убраны дублирующие)
- Footer: + Ритуальные изделия, + Отзывы, + Гарантии, + Доставка и оплата, + О нас, аккордеон

### БЛОК 6 (Sitemap) — ВЫПОЛНЕНО
Добавлены URL: /o-kompanii, /politika-konfidencialnosti, /otzyvy, /garantii, /dostavka-i-oplata, /ritualnye-izdeliya

### Итог: 46 страниц, все HTTP 200

## Следующие шаги

### 1. БЛОК 3 — Расширить каталоги (приоритет)
- /kovanye-kresty → 10 моделей (сейчас 1 карточка)
- /kovanye-tsvetniki → 10 моделей (сейчас 1 карточка)
- /metallicheskie-pamyatniki → 10 моделей (сейчас 1 карточка)
- /catalog → с 9 до 12 моделей (добавить 3 оградки)
- /stolik-i-skameyka → уже каталог, добавить недостающие модели в data.ts

### 2. БЛОК 4 — 6 новых статей блога
Добавить в data.ts и создать файлы в blog/:
- ustanovka-ogradki-zimoy, kak-zakazat-ogradku, pokraska-ogradki-svoimi-rukami
- dokumenty-dlya-ustanovki-ogradki, blagoustrojstvo-mogily-poshagovo, kovanaya-vs-svarnaya-ogradka

### 3. БЛОК 8 — Обновить цены (за м.пог.)
Все цены на оградки → формат "от X ₽/м.пог."

### 4. Реальные фото товаров
Большинство товаров показывают placeholder.svg.

## Команды деплоя

```bash
cd /var/www/uralmetstroy.ru
npm run build && pm2 reload uralmetstroy

# Проверка
pm2 status
pm2 logs uralmetstroy --lines 20 --nostream
curl -I https://uralmetstroy.ru
```

## Ключевые файлы

| Файл | Назначение |
|------|-----------|
| `lib/data.ts` | Все данные: товары, услуги, блог, контакты |
| `next.config.js` | Конфиг: заголовки, редиректы, env-переменные |
| `app/layout.tsx` | Общий layout, шрифты, Header/Footer |
| `ecosystem.config.js` | PM2 конфиг (cluster mode, port 3000) |
| `/etc/nginx/sites-available/uralmetstroy.ru` | Nginx: SSL, proxy_pass, статика |
