/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSR — серверный рендеринг
  // Для статики поменять на: output: 'export'
  
  // Сжатие
  compress: true,
  
  // Оптимизация изображений
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    // Если фото на внешнем хостинге — добавить домены:
    // domains: ['cdn.uralmetstroy.ru'],
  },

  // HTTP заголовки безопасности
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'X-Frame-Options',            value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection',           value: '1; mode=block' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=(self)' },
        ],
      },
      // Долгий кэш для статики
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/img/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // Редиректы
  async redirects() {
    return [
      // www → без www (настроить на сервере через Nginx лучше)
      // { source: '/', destination: '/', permanent: false },
    ];
  },

  // Переписывание путей (если нужны чистые URL без расширений)
  // async rewrites() { return []; },

  // Переменные окружения (публичные)
  env: {
    NEXT_PUBLIC_SITE_NAME: 'УралМетСтрой',
    NEXT_PUBLIC_PHONE:     '+7 (922) 03-08-444',
    NEXT_PUBLIC_PHONE_RAW: '79220308444',
    NEXT_PUBLIC_ADDRESS:   'ул. Красногвардейская 56А, Нижний Тагил',
    NEXT_PUBLIC_VK:        'https://vk.com/podkova_nt',
    NEXT_PUBLIC_OK:        'https://ok.ru/group/podkovant',
  },

  // Экспериментальные фичи
  experimental: {
    // optimizeCss: true, // требует critters
  },
};

module.exports = nextConfig;
