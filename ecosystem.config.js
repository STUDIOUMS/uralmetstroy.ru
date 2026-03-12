// ecosystem.config.js — PM2 конфигурация
// Автозапуск Next.js при перезагрузке сервера
//
// ИСПОЛЬЗОВАНИЕ:
//   npm install -g pm2
//   pm2 start ecosystem.config.js
//   pm2 save
//   pm2 startup  ← выполнить команду которую выведет этот скрипт

module.exports = {
  apps: [
    {
      name:         'uralmetstroy',
      script:       'node_modules/.bin/next',
      args:         'start',
      cwd:          '/var/www/uralmetstroy.ru',
      instances:    'max',          // кол-во ядер CPU (или число, например 2)
      exec_mode:    'cluster',      // cluster mode для нескольких ядер
      watch:        false,
      max_memory_restart: '500M',

      env: {
        NODE_ENV:  'production',
        PORT:      3000,
      },

      // Логи
      out_file:     '/var/log/pm2/uralmetstroy.out.log',
      error_file:   '/var/log/pm2/uralmetstroy.error.log',
      merge_logs:   true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',

      // Автоперезапуск при краше
      autorestart:  true,
      restart_delay: 3000,
      max_restarts:  10,
    },
  ],
};
