// app/api/send-form/route.ts
// POST /api/send-form — отправка заявок в Telegram

import { NextRequest, NextResponse } from 'next/server';

// Rate limiting (простой in-memory, для прода лучше Redis)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now  = Date.now();
  const data = rateLimitMap.get(ip);

  if (!data || now > data.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 }); // 1 минута
    return true;
  }
  if (data.count >= 5) return false; // макс 5 заявок в минуту с одного IP
  data.count++;
  return true;
}

// Валидация полей
function validate(body: Record<string, string>): string | null {
  if (!body.name  || body.name.trim().length  < 2) return 'Укажите имя';
  if (!body.phone || body.phone.trim().length < 10) return 'Укажите телефон';
  const phone = body.phone.replace(/\D/g, '');
  if (phone.length < 10 || phone.length > 15) return 'Некорректный номер';
  return null;
}

// Форматируем сообщение для Telegram
function buildTelegramMessage(body: Record<string, string>, meta: { ip: string; url: string }): string {
  const now = new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Yekaterinburg',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const lines = [
    '🔔 *Новая заявка — uralmetstroy.ru*',
    '',
    `👤 *Имя:* ${body.name}`,
    `📞 *Телефон:* ${body.phone}`,
    body.service  ? `🛠 *Услуга:* ${body.service}`    : null,
    body.cemetery ? `📍 *Кладбище:* ${body.cemetery}` : null,
    body.comment  ? `💬 *Коммент:* ${body.comment}`   : null,
    '',
    `🕐 ${now} (Екб)`,
    `🌐 ${meta.url}`,
  ].filter((l): l is string => l !== null).join('\n');

  return lines;
}

export async function POST(req: NextRequest) {
  // ── IP Rate limit ──────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'Слишком много запросов' }, { status: 429 });
  }

  // ── Парсим body ────────────────────────────────────────────
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  // ── Валидация ─────────────────────────────────────────────
  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 422 });
  }

  // ── Telegram ──────────────────────────────────────────────
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID || BOT_TOKEN.includes('ВСТАВИТЬ')) {
    console.warn('[send-form] Telegram не настроен — пропускаем отправку');
    // Возвращаем success чтобы не ломать UX
    return NextResponse.json({ ok: true, channel: 'none' });
  }

  const referer = req.headers.get('referer') ?? 'неизвестно';
  const text    = buildTelegramMessage(body, { ip, url: referer });

  try {
    const tgUrl  = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const tgResp = await fetch(tgUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id:    CHAT_ID,
        text,
        parse_mode: 'Markdown',
      }),
    });

    if (!tgResp.ok) {
      const errData = await tgResp.json();
      console.error('[send-form] Telegram error:', errData);
      // Не ломаем UX — возвращаем success
      return NextResponse.json({ ok: true, channel: 'tg_error', detail: errData.description });
    }

    return NextResponse.json({ ok: true, channel: 'telegram' });

  } catch (err) {
    console.error('[send-form] Network error:', err);
    return NextResponse.json({ ok: true, channel: 'network_error' });
  }
}

// Блокируем GET
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
