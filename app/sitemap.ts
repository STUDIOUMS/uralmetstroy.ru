// app/sitemap.ts — автогенерация sitemap.xml
import type { MetadataRoute } from 'next';
import { PRODUCTS, BLOG_POSTS, SERVICES, SITE } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = [
    { url: SITE.url,                                         priority: 1.0,  freq: 'daily'   },
    { url: `${SITE.url}/catalog`,                            priority: 0.9,  freq: 'daily'   },
    { url: `${SITE.url}/ritualnye-izdeliya`,                 priority: 0.9,  freq: 'weekly'  },
    { url: `${SITE.url}/kovanye-kresty`,                     priority: 0.8,  freq: 'weekly'  },
    { url: `${SITE.url}/kovanye-tsvetniki`,                  priority: 0.8,  freq: 'weekly'  },
    { url: `${SITE.url}/metallicheskie-pamyatniki`,          priority: 0.8,  freq: 'weekly'  },
    { url: `${SITE.url}/stolik-i-skameyka`,                  priority: 0.8,  freq: 'weekly'  },
    { url: `${SITE.url}/cena-ogradki`,                       priority: 0.8,  freq: 'weekly'  },
    { url: `${SITE.url}/blog`,                               priority: 0.8,  freq: 'weekly'  },
    { url: `${SITE.url}/o-kompanii`,                         priority: 0.7,  freq: 'weekly'  },
    { url: `${SITE.url}/otzyvy`,                             priority: 0.7,  freq: 'monthly' },
    { url: `${SITE.url}/nashi-raboty`,                       priority: 0.7,  freq: 'monthly' },
    { url: `${SITE.url}/garantii`,                           priority: 0.6,  freq: 'monthly' },
    { url: `${SITE.url}/dostavka-i-oplata`,                  priority: 0.6,  freq: 'monthly' },
    { url: `${SITE.url}/kontakty`,                           priority: 0.6,  freq: 'monthly' },
    { url: `${SITE.url}/politika-konfidencialnosti`,         priority: 0.3,  freq: 'yearly'  },
  ];

  return [
    ...staticPages.map(p => ({
      url: p.url,
      lastModified: now,
      changeFrequency: p.freq as any,
      priority: p.priority,
    })),
    // Товары
    ...PRODUCTS.map(p => ({
      url: `${SITE.url}/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Услуги
    ...SERVICES.map(s => ({
      url: `${SITE.url}/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Блог
    ...BLOG_POSTS.map(p => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
