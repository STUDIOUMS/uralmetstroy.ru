# УралМетСтрой — uralmetstroy.ru

Корпоративный сайт производителя кованых и сварных ритуальных изделий в Нижнем Тагиле.

**Живой сайт:** [uralmetstroy.ru](https://uralmetstroy.ru)

---

## Стек

| Технология | Версия |
|---|---|
| Next.js (App Router, SSG) | 14.2 |
| React | 18.3 |
| TypeScript | 5.5 |
| CSS (globals.css, без Tailwind) | — |
| PM2 (cluster mode) | — |
| Nginx (reverse proxy + SSL) | — |

---

## Структура

```
app/
├── page.tsx                    # Главная
├── layout.tsx                  # Корневой layout, Schema.org LocalBusiness
├── sitemap.ts                  # Автогенерация sitemap.xml
├── robots.ts                   # robots.txt
├── catalog/                    # Каталог оградок
├── ritualnye-izdeliya/         # Ритуальные изделия (хаб)
├── kovanye-kresty/             # Кованые кресты
├── kovanye-tsvetniki/          # Кованые цветники
├── metallicheskie-pamyatniki/  # Металлические памятники
├── stolik-i-skameyka/          # Столики и скамейки
├── [slug]/                     # Страница товара (динамическая, SSG)
├── blog/                       # Список статей
├── blog/[slug]/                # Статья блога (динамическая, SSG)
├── ustanovka/                  # Услуга: Установка
├── pokraska-ogradki/           # Услуга: Покраска
├── remont-ogradki/             # Услуга: Ремонт
├── demontazh-ogradki/          # Услуга: Демонтаж
├── blagoustrojstvo-mogily/     # Услуга: Благоустройство
├── cena-ogradki/               # Цены
├── o-kompanii/                 # О компании
├── otzyvy/                     # Отзывы
├── nashi-raboty/               # Фотогалерея работ
├── kontakty/                   # Контакты
├── garantii/                   # Гарантии
├── dostavka-i-oplata/          # Доставка и оплата
└── api/                        # API routes (форма заявки → Telegram)

components/
├── Header.tsx          # Шапка, мобильное меню (≤1024px, slide-in)
├── Footer.tsx          # Подвал, аккордеон на мобиле
├── ProductCard.tsx     # Карточка товара
├── HeroSlider.tsx      # Слайдер главной страницы
├── OrderForm.tsx       # Форма заявки → Telegram Bot API
├── Breadcrumb.tsx      # Хлебные крошки + BreadcrumbList Schema.org
├── FAQ.tsx             # FAQ аккордеон + FAQPage Schema.org
├── FloatingButtons.tsx # Плавающие кнопки звонка/заявки
├── RelatedLinks.tsx    # Блок перелинковки
└── YandexMetrika.tsx   # Яндекс.Метрика (через NEXT_PUBLIC_YM_ID)

lib/
└── data.ts             # Единый источник данных: товары, услуги, блог, SITE

styles/
└── globals.css         # Дизайн-система, 9 breakpoints, кросс-браузерные фиксы

public/
├── img/                # Фотографии товаров и страниц
│   ├── ogrady/         # Фото оградок
│   └── icons/          # PWA иконки
└── manifest.json       # PWA манифест
```

---

## Локальная разработка

```bash
npm install
npm run dev        # http://localhost:3000
```

Проверка типов:
```bash
npx tsc --noEmit
```

---

## Деплой на продакшн

Сервер: `root@80.93.63.90`, путь: `/var/www/nextjs/uralmetstroy.ru`

```bash
# 1. Синхронизировать исходники
rsync -az --exclude='node_modules' --exclude='.next' \
  /var/www/uralmetstroy.ru/ \
  root@80.93.63.90:/var/www/nextjs/uralmetstroy.ru/

# 2. Собрать на сервере
ssh root@80.93.63.90 "source /root/.nvm/nvm.sh && \
  cd /var/www/nextjs/uralmetstroy.ru && \
  npm run build 2>&1 | tail -20"

# 3. Перезапустить PM2
ssh root@80.93.63.90 "source /root/.nvm/nvm.sh && pm2 reload uralmetstroy"
```

Синхронизация изображений:
```bash
rsync -az --delete /var/www/uralmetstroy.ru/public/img/ \
  root@80.93.63.90:/var/www/nextjs/uralmetstroy.ru/public/img/
```

---

## Переменные окружения

Создать `.env.local`:

```env
TELEGRAM_BOT_TOKEN=<токен бота>
TELEGRAM_CHAT_ID=<id чата>
NEXT_PUBLIC_YM_ID=<id счётчика Яндекс.Метрики>
```

---

## SEO

- **Schema.org:** LocalBusiness (глобально), Product (товары), Service (услуги), Article (блог), FAQPage, AggregateRating + Review (отзывы), ItemList (каталог)
- **OpenGraph:** на всех страницах, `og:type=article` для блога
- **Sitemap:** автогенерация через `app/sitemap.ts` → `/sitemap.xml`
- **robots.txt:** через `app/robots.ts`, запрещает `/api/` и `/spasibo`
- **Canonical:** на каждой странице
- **Breadcrumbs:** UI + BreadcrumbList JSON-LD

---

## Адаптивность

| Breakpoint | Изменения |
|---|---|
| ≥ 1440px | Увеличенные отступы секций |
| ≤ 1200px | Контейнер сужается |
| ≤ 1024px | Мобильное меню (hamburger + slide-in) |
| ≤ 900px | Однколоночный layout статей |
| ≤ 768px | Форма в одну колонку |
| ≤ 480px | Продуктовый грид 1 колонка, таблица цен → карточки |
| ≤ 375px | Уменьшены шрифты |

---

## Кросс-браузерность

- Safari < 13: `position: -webkit-sticky`
- Safari: `-webkit-backdrop-filter`
- iOS: `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation`
- Firefox/macOS: `-moz-osx-font-smoothing: grayscale`
- Старые браузеры: `aspect-ratio` с fallback через `padding-top` + `@supports`
