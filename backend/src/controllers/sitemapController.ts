import type { Request, Response } from 'express';
import Category from '../models/Category';
import Item from '../models/Item';

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function urlTag(loc: string, lastmod?: Date, changefreq?: string, priority?: string): string {
  const parts = [`<loc>${escapeXml(loc)}</loc>`];
  if (lastmod) parts.push(`<lastmod>${lastmod.toISOString()}</lastmod>`);
  if (changefreq) parts.push(`<changefreq>${changefreq}</changefreq>`);
  if (priority) parts.push(`<priority>${priority}</priority>`);
  return `<url>${parts.join('')}</url>`;
}

// Public sitemap covering every URL a crawler should index: the static
// public pages plus one entry per category/item, so newly added catalog
// entries show up on the next crawl without a manual resubmission.
async function getSitemap(req: Request, res: Response): Promise<void> {
  const siteUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');

  const [categories, items] = await Promise.all([
    Category.find().select('_id updatedAt'),
    Item.find().select('_id updatedAt'),
  ]);

  const urls = [
    urlTag(`${siteUrl}/`, undefined, 'daily', '1.0'),
    urlTag(`${siteUrl}/categories`, undefined, 'daily', '0.9'),
    urlTag(`${siteUrl}/contact`, undefined, 'monthly', '0.6'),
    ...categories.map((cat) => urlTag(`${siteUrl}/categories/${cat._id}`, cat.updatedAt, 'weekly', '0.8')),
    ...items.map((item) => urlTag(`${siteUrl}/items/${item._id}`, item.updatedAt, 'weekly', '0.7')),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

  res.type('application/xml').send(xml);
}

export { getSitemap };
