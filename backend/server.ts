// TerraShift Full-Stack Server
// Real NASA Earth Observation Proxy & Decision-Support API for Bangladesh

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import nasaRoutes from './routes/nasaRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
}));
app.use(express.json());

// API Routes
app.use('/api/nasa', nasaRoutes);

// System Health Endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    project: '🌱 TerraShift',
    tagline: 'From Space Data to Smarter Farming Decisions',
    scope: 'Bangladesh Agricultural Decision-Support',
    timestamp: new Date().toISOString(),
    nasaEndpoints: {
      power: process.env.NASA_POWER_BASE_URL || 'https://power.larc.nasa.gov/api/temporal/daily/point',
      cmr: process.env.NASA_CMR_BASE_URL || 'https://cmr.earthdata.nasa.gov/search/granules.json',
    },
  });
});

// Serve static frontend files if built
const distPath = path.resolve('./dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA fallback middleware (Express 5 compatible)
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
} else {
  app.get('/', (_req, res) => {
    res.send('🌱 TerraShift Backend API running. Frontend not yet built or running separately via Vite.');
  });
}

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message || 'An unexpected error occurred while processing the request.',
  });
});

app.listen(PORT, () => {
  console.log(`🌱 TerraShift Server running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   NASA endpoints: http://localhost:${PORT}/api/nasa/environmental-data`);
  if (fs.existsSync(distPath)) {
    console.log(`   Frontend served from: ${distPath}`);
  }
});
