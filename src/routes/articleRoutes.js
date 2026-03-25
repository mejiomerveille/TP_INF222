const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  searchArticles
} = require('../controllers/articleController');

// Règles de validation communes
const articleValidationRules = [
  body('titre').notEmpty().withMessage('Le titre est obligatoire.'),
  body('contenu').notEmpty().withMessage('Le contenu est obligatoire.'),
  body('auteur').notEmpty().withMessage("L'auteur est obligatoire."),
];

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Texte à rechercher dans le titre ou le contenu
 *     responses:
 *       200:
 *         description: Liste des articles correspondants
 *       400:
 *         description: Paramètre query manquant
 */
router.get('/search', searchArticles);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *       - in: query
 *         name: auteur
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: "Format: YYYY-MM-DD"
 *     responses:
 *       200:
 *         description: Liste des articles
 */
router.get('/', getAllArticles);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - contenu
 *               - auteur
 *             properties:
 *               titre:
 *                 type: string
 *                 example: "Mon premier article"
 *               contenu:
 *                 type: string
 *                 example: "Contenu de l'article..."
 *               auteur:
 *                 type: string
 *                 example: "Jean Dupont"
 *               categorie:
 *                 type: string
 *                 example: "Tech"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["nodejs", "api"]
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', articleValidationRules, createArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article trouvé
 *       404:
 *         description: Article non trouvé
 */
router.get('/:id', getArticleById);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article existant
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               contenu:
 *                 type: string
 *               auteur:
 *                 type: string
 *               categorie:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Article mis à jour
 *       404:
 *         description: Article non trouvé
 */
router.put('/:id', articleValidationRules, updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article supprimé
 *       404:
 *         description: Article non trouvé
 */
router.delete('/:id', deleteArticle);

module.exports = router;
