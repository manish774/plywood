require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./src/config/db');
const categoryRoutes = require('./src/routes/categories');
const itemRoutes = require('./src/routes/items');
const contactRoutes = require('./src/routes/contact');
const adminRoutes = require('./src/routes/admin');
const { errorHandler, notFound } = require('./src/middleware/errorHandler');

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

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Plywood API server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();

module.exports = app;
