# 🚀 Деплой Подкова-НТ.ру — Next.js SSR на Nginx + Node.js

## Требования к серверу
- Ubuntu 20.04+ / Debian 11+
- Node.js 18+ (рекомендуется 20 LTS)
- Nginx
- Минимум 1 GB RAM, 1 vCPU

---

## 1. Установка Node.js 20 на сервере

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # должно быть v20.x.x
```

---

## 2. Установка PM2 (менеджер процессов)

```bash
sudo npm install -g pm2
```

---

## 3. Настройка Telegram Bot

### Создать бота:
1. Telegram → @BotFather → `/newbot`
2. Назовите: `Podkova NT Заявки`
3. Username: `podkovant_forms_bot`
4. Скопируйте **BOT_TOKEN**: `7123456789:AAHdqTXN...`

### Получить Chat ID:
1. Напишите боту `/start`
2. Откройте: `https://api.telegram.org/bot<TOKEN>/getUpdates`
3. Найдите `"chat":{"id": 123456789}` — ваш **CHAT_ID**

### Тест:
```
https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<CHAT_ID>&text=Тест
```

---

## 4. Загрузка проекта на сервер

```bash
# Создать папку
sudo mkdir -p /var/www/uralmetstroy.ru
sudo chown $USER:$USER /var/www/uralmetstroy.ru

# Загрузить файлы (из вашего компьютера)
scp -r ./podkova-nt-nextjs/* root@ВАШ_IP:/var/www/uralmetstroy.ru/

# Или через rsync
rsync -avz --delete ./podkova-nt-nextjs/ root@ВАШ_IP:/var/www/uralmetstroy.ru/
```

---

## 5. Настройка переменных окружения

```bash
cd /var/www/uralmetstroy.ru
nano .env.local
```

Заполните:
```
TELEGRAM_BOT_TOKEN=7123456789:AAHdqTXN...
TELEGRAM_CHAT_ID=123456789
NEXT_PUBLIC_WA_PHONE=79220308444
NEXT_PUBLIC_TG_USERNAME=podkova_nt
NEXT_PUBLIC_YM_ID=12345678
NEXT_PUBLIC_SITE_URL=https://uralmetstroy.ru
```

---

## 6. Установка зависимостей и сборка

```bash
cd /var/www/uralmetstroy.ru
npm install
npm run build
```

Если билд прошёл успешно — в директории появится папка `.next/`.

---

## 7. Запуск через PM2

```bash
cd /var/www/uralmetstroy.ru
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # скопировать и выполнить выведенную команду
```

### Проверка:
```bash
pm2 status
pm2 logs podkova-nt
curl http://localhost:3000  # должен вернуть HTML главной
```

---

## 8. Настройка Nginx

```bash
sudo cp nginx.conf /etc/nginx/sites-available/uralmetstroy.ru
sudo ln -s /etc/nginx/sites-available/uralmetstroy.ru /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Сначала сайт будет работать по HTTP. Для HTTPS — следующий шаг.

---

## 9. SSL сертификат (Certbot, бесплатно)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d uralmetstroy.ru -d www.uralmetstroy.ru
sudo certbot renew --dry-run  # проверить автопродление
```

После получения сертификата Nginx перезапустится автоматически.

---

## 10. Фотографии товаров

Загрузите фото в папку:
```
/var/www/uralmetstroy.ru/public/img/ogrady/
```

Именование файлов:
```
ograda-klassicheskaya-1.jpg   ← главное фото
ograda-klassicheskaya-2.jpg   ← второе фото
ograda-ekonom-1.jpg
komplekt-standart-1.jpg
...
```

Рекомендации:
- Формат: **WebP** (лучше) или JPG
- Размер: 1200×900 px для основных
- Качество: 80–85%
- Вес: не более 200 KB

---

## 11. Яндекс.Метрика

1. Зайдите на [metrika.yandex.ru](https://metrika.yandex.ru)
2. Создайте счётчик для `uralmetstroy.ru`
3. Скопируйте **ID счётчика** (8 цифр)
4. Добавьте в `.env.local`: `NEXT_PUBLIC_YM_ID=12345678`
5. Пересоберите: `npm run build && pm2 restart podkova-nt`

---

## 12. Яндекс.Вебмастер

1. [webmaster.yandex.ru](https://webmaster.yandex.ru) → Добавить сайт
2. Подтвердить через мета-тег (добавить в `app/layout.tsx` → `metadata.verification`)
3. Добавить sitemap: `https://uralmetstroy.ru/sitemap.xml`

---

## 13. Обновление сайта

```bash
cd /var/www/uralmetstroy.ru

# Загрузить новые файлы
rsync -avz ./новые-файлы/ root@ВАШ_IP:/var/www/uralmetstroy.ru/

# На сервере:
npm install        # если менялись зависимости
npm run build      # пересобрать
pm2 restart podkova-nt  # перезапустить
```

---

## 14. Полезные команды

```bash
pm2 status                  # статус процессов
pm2 logs podkova-nt         # логи в реальном времени
pm2 restart podkova-nt      # перезапустить
pm2 reload podkova-nt       # graceful reload (без простоя)
pm2 stop podkova-nt         # остановить

nginx -t                    # проверить конфиг
systemctl reload nginx      # перезагрузить nginx
certbot renew               # обновить SSL

# Посмотреть логи nginx
tail -f /var/log/nginx/uralmetstroy.ru.access.log
tail -f /var/log/nginx/uralmetstroy.ru.error.log
```

---

## Чек-лист перед запуском

- [ ] Node.js 18+ установлен
- [ ] `.env.local` заполнен (Telegram Bot Token + Chat ID)
- [ ] `npm run build` прошёл без ошибок
- [ ] PM2 запущен: `pm2 status` показывает `online`
- [ ] `curl http://localhost:3000` возвращает HTML
- [ ] Nginx настроен, `nginx -t` без ошибок
- [ ] SSL сертификат получен, HTTPS работает
- [ ] Telegram тест-заявка пришла
- [ ] WhatsApp кнопка открывает чат
- [ ] Яндекс.Метрика добавлена
- [ ] Сайт в Яндекс.Вебмастер, sitemap отправлен
- [ ] Фото загружены в `/public/img/ogrady/`
