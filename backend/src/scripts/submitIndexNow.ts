import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db';
import Category from '../models/Category';
import Item from '../models/Item';

// IndexNow (https://www.indexnow.org) lets a site push its URLs directly to
// Bing/Yandex for near-instant crawling — no account or Search Console
// verification needed, just a key file hosted at the site root proving
// ownership. Google doesn't consume IndexNow directly, but this is a free,
// zero-setup indexing channel worth using alongside Search Console.
//
// The key below must match the content of the key file deployed at
// frontend/public/<key>.txt (served at https://<site>/<key>.txt).
//
// Run after each deploy that adds/changes catalog pages:
//   npm run indexnow
const INDEXNOW_KEY = '1896b3276fba8f1b7d5ce90c08ba341f';

async function submitIndexNow(): Promise<void> {
  const siteUrl = (process.env.FRONTEND_URL || 'https://www.plyswastik.com').replace(/\/$/, '');
  const host = new URL(siteUrl).host;

  await connectDB();

  const [categories, items] = await Promise.all([
    Category.find().select('_id'),
    Item.find().select('_id'),
  ]);

  const urlList = [
    `${siteUrl}/`,
    `${siteUrl}/categories`,
    `${siteUrl}/contact`,
    ...categories.map((cat) => `${siteUrl}/categories/${cat._id}`),
    ...items.map((item) => `${siteUrl}/items/${item._id}`),
  ];

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${siteUrl}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });

  console.log(`Submitted ${urlList.length} URLs to IndexNow — status ${res.status} ${res.statusText}`);
  if (!res.ok) {
    console.log(await res.text());
  }

  await mongoose.disconnect();
}

submitIndexNow().catch((err) => {
  console.error('IndexNow submission failed:', err);
  process.exit(1);
});
