'use client';
// components/OrderForm.tsx
import { useState } from 'react';
import { SITE } from '@/lib/data';

interface OrderFormProps {
  service?: string;
  title?:   string;
  compact?: boolean;
}

interface FormState {
  name:     string;
  phone:    string;
  service:  string;
  cemetery: string;
  comment:  string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function OrderForm({ service = '', title = 'Оставить заявку', compact = false }: OrderFormProps) {
  const [form, setForm]     = useState<FormState>({ name: '', phone: '', service, cemetery: '', comment: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError]   = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Форматирование телефона
  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('8')) val = '7' + val.slice(1);
    if (val.length > 11) val = val.slice(0, 11);
    let formatted = val;
    if (val.length > 0)  formatted = '+7';
    if (val.length > 1)  formatted = '+7 (' + val.slice(1);
    if (val.length > 4)  formatted = '+7 (' + val.slice(1, 4) + ') ' + val.slice(4);
    if (val.length > 7)  formatted = '+7 (' + val.slice(1, 4) + ') ' + val.slice(4, 7) + '-' + val.slice(7);
    if (val.length > 9)  formatted = '+7 (' + val.slice(1, 4) + ') ' + val.slice(4, 7) + '-' + val.slice(7, 9) + '-' + val.slice(9);
    setForm(prev => ({ ...prev, phone: formatted }));
  }

  function openWhatsApp() {
    const text = encodeURIComponent(
      `Здравствуйте! Меня зовут ${form.name || '...'}, телефон: ${form.phone || '...'}. ` +
      (form.service  ? `Услуга: ${form.service}. ` : '') +
      (form.comment  ? form.comment : 'Прошу рассчитать стоимость.')
    );
    window.open(`https://wa.me/${SITE.phoneRaw}?text=${text}`, '_blank');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { setError('Укажите ваше имя'); return; }
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) {
      setError('Укажите корректный номер телефона'); return;
    }

    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/send-form', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus('success');
        setForm({ name: '', phone: '', service, cemetery: '', comment: '' });
        // Метрика
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(process.env.NEXT_PUBLIC_YM_ID, 'reachGoal', 'form_submit');
        }
        // Предлагаем WhatsApp через 1.5 сек
        setTimeout(() => {
          if (confirm('Также написать нам в WhatsApp для быстрой связи?')) {
            openWhatsApp();
          }
        }, 1500);
      } else {
        throw new Error(data.error || 'Ошибка отправки');
      }
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Ошибка. Позвоните нам напрямую.');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3>Заявка принята!</h3>
        <p>Перезвоним в течение 15 минут в рабочее время.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
          <a href={SITE.phoneTel} className="btn btn-primary">Позвонить сейчас</a>
          <button onClick={openWhatsApp} className="btn btn-outline" type="button">WhatsApp</button>
        </div>
      </div>
    );
  }

  return (
    <form className={`order-form${compact ? ' order-form--compact' : ''}`} onSubmit={handleSubmit} noValidate>
      {title && !compact && <h2 className="form-title">{title}</h2>}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Ваше имя *</label>
          <input
            id="name" name="name" type="text"
            placeholder="Иван Иванов"
            value={form.name}
            onChange={handleChange}
            required autoComplete="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Телефон *</label>
          <input
            id="phone" name="phone" type="tel"
            placeholder="+7 (___) ___-__-__"
            value={form.phone}
            onChange={handlePhone}
            required autoComplete="tel"
          />
        </div>
      </div>

      {!compact && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="service">Услуга / товар</label>
              <select id="service" name="service" value={form.service} onChange={handleChange}>
                <option value="">Выберите...</option>
                <optgroup label="Оградки">
                  <option>Кованая оградка</option>
                  <option>Сварная оградка</option>
                  <option>Оградка по индивидуальному проекту</option>
                </optgroup>
                <optgroup label="Услуги">
                  <option>Установка оградки</option>
                  <option>Покраска оградки</option>
                  <option>Ремонт оградки</option>
                  <option>Демонтаж оградки</option>
                  <option>Благоустройство могилы</option>
                </optgroup>
                <optgroup label="Комплекты">
                  <option>Комплект Стандарт</option>
                  <option>Кованый комплект</option>
                </optgroup>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cemetery">Кладбище</label>
              <select id="cemetery" name="cemetery" value={form.cemetery} onChange={handleChange}>
                <option value="">Выберите...</option>
                <option>Красный Камень</option>
                <option>Вагонское кладбище</option>
                <option>Гальяно-Горбуновское</option>
                <option>Другое в НТ</option>
                <option>Верхняя Салда</option>
                <option>Кушва</option>
                <option>Другое в области</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Размер, пожелания</label>
            <textarea
              id="comment" name="comment"
              placeholder="Размер участка, желаемый стиль, особые пожелания..."
              value={form.comment}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </>
      )}

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary form-submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
        </button>
        <button type="button" className="btn btn-wa" onClick={openWhatsApp}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>
      </div>

      <p className="form-note">
        Нажимая «Отправить», вы соглашаетесь с{' '}
        <a href="/politika-konfidencialnosti">политикой конфиденциальности</a>
      </p>
    </form>
  );
}
