const { validationResult } = require('express-validator');
const Article = require('../models/articleModel');

// POST /api/articles - Créer un article
const createArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const id = await Article.create(req.body);
    const article = await Article.findById(id);
    return res.status(201).json({
      success: true,
      message: 'Article créé avec succès.',
      data: article
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

// GET /api/articles - Lister les articles (avec filtres)
const getAllArticles = async (req, res) => {
  try {
    const { categorie, auteur, date } = req.query;
    const articles = await Article.findAll({ categorie, auteur, date });
    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

// GET /api/articles/:id - Lire un article unique
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article non trouvé.' });
    }
    return res.status(200).json({ success: true, data: article });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

// PUT /api/articles/:id - Modifier un article
const updateArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const existing = await Article.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Article non trouvé.' });
    }

    await Article.update(req.params.id, req.body);
    const updated = await Article.findById(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Article mis à jour avec succès.',
      data: updated
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

// DELETE /api/articles/:id - Supprimer un article
const deleteArticle = async (req, res) => {
  try {
    const existing = await Article.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Article non trouvé.' });
    }

    await Article.delete(req.params.id);
    return res.status(200).json({
      success: true,
      message: `Article #${req.params.id} supprimé avec succès.`
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

// GET /api/articles/search?query=texte - Rechercher
const searchArticles = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === '') {
      return res.status(400).json({ success: false, message: 'Paramètre "query" requis.' });
    }
    const articles = await Article.search(query);
    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  searchArticles
};
