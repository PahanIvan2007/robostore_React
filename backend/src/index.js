require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('../generated/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', require('./routes/auth')(prisma));
app.use('/api/products', require('./routes/products')(prisma));
app.use('/api/orders', require('./routes/orders')(prisma));
app.use('/api/categories', require('./routes/categories')(prisma));
app.use('/api/users', require('./routes/users')(prisma));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
