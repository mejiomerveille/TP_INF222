const mysql = require('mysql2/promise');
require('dotenv').config();

// Création du pool de connexions MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blog_db',
  waitForConnections: true,
  connectionLimit: 10,
});

// Initialisation de la base de données (création de la table si elle n'existe pas)
const initDB = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titre VARCHAR(255) NOT NULL,
      contenu TEXT NOT NULL,
      auteur VARCHAR(100) NOT NULL,
      date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
      categorie VARCHAR(100),
      tags VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  try {
    await pool.execute(createTableQuery);
    console.log('✅ Table articles prête.');
  } catch (error) {
    console.error('❌ Erreur initialisation DB:', error.message);
    process.exit(1);
  }
};

module.exports = { pool, initDB };
