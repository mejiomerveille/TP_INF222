const { pool } = require('../config/db');

const Article = {

  // Créer un article
  async create(data) {
    const { titre, contenu, auteur, categorie, tags } = data;
    const tagsStr = Array.isArray(tags) ? tags.join(',') : (tags || '');
    const [result] = await pool.execute(
      `INSERT INTO articles (titre, contenu, auteur, categorie, tags)
       VALUES (?, ?, ?, ?, ?)`,
      [titre, contenu, auteur, categorie || null, tagsStr]
    );
    return result.insertId;
  },

  // Récupérer tous les articles (avec filtres optionnels)
  async findAll(filters = {}) {
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];

    if (filters.categorie) {
      query += ' AND categorie = ?';
      params.push(filters.categorie);
    }
    if (filters.auteur) {
      query += ' AND auteur = ?';
      params.push(filters.auteur);
    }
    if (filters.date) {
      query += ' AND DATE(date_creation) = ?';
      params.push(filters.date);
    }

    query += ' ORDER BY date_creation DESC';
    const [rows] = await pool.execute(query, params);
    return rows;
  },

  // Récupérer un article par ID
  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM articles WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  // Mettre à jour un article
  async update(id, data) {
    const { titre, contenu, categorie, tags } = data;
    const tagsStr = Array.isArray(tags) ? tags.join(',') : (tags || '');
    const [result] = await pool.execute(
      `UPDATE articles SET titre = ?, contenu = ?, categorie = ?, tags = ?
       WHERE id = ?`,
      [titre, contenu, categorie || null, tagsStr, id]
    );
    return result.affectedRows;
  },

  // Supprimer un article
  async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM articles WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  },

  // Rechercher des articles par titre ou contenu
  async search(query) {
    const term = `%${query}%`;
    const [rows] = await pool.execute(
      `SELECT * FROM articles
       WHERE titre LIKE ? OR contenu LIKE ?
       ORDER BY date_creation DESC`,
      [term, term]
    );
    return rows;
  }
};

module.exports = Article;
