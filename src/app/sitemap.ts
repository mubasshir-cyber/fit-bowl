import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fitbowl.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-10-18'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#menu`,
      lastModified: new Date('2026-10-18'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#plans`,
      lastModified: new Date('2026-10-18'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#how-it-works`,
      lastModified: new Date('2026-10-18'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#reviews`,
      lastModified: new Date('2026-10-18'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#faqs`,
      lastModified: new Date('2026-10-18'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#trial-form`,
      lastModified: new Date('2026-10-18'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
