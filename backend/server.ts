import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import connectDB from './src/config/db';
import categoryRoutes from './src/routes/categories';
import itemRoutes from './src/routes/items';
import contactRoutes from './src/routes/contact';
import adminRoutes from './src/routes/admin';
import authRoutes from './src/routes/auth';
import { errorHandler, notFound } from './src/middleware/errorHandler';

const app = express();

app.use(cors()); // frontend runs on a different origin/port (e.g. Vite's 5173)
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start(): Promise<void> {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Plywood API server listening on port ${PORT}`);
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Failed to start server:', message);
    process.exit(1);
  }
}

start();

export default app;
