const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDB } = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const { specs, swaggerUi } = require('../swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Documentation Swagger ─────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customSiteTitle: 'Blog API - INF222'
}));

// ─── Routes ───────────────────────────────────────────────────
app.use('/api/articles', articleRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Bienvenue sur Blog API - INF222',
    documentation: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      articles: `http://localhost:${PORT}/api/articles`
    }
  });
});

// ─── Gestion des routes inexistantes ──────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée.' });
});

// ─── Démarrage du serveur ──────────────────────────────────────
const start = async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📄 Documentation Swagger : http://localhost:${PORT}/api-docs\n`);
  });
};

start();
