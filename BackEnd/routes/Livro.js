const express = require('express');
const livroController = require('../controllers/livroController');

const router = express.Router();

router.post('/', livroController.createLivro);
router.get('/', livroController.getLivros);
router.get('/buscar', livroController.getLivroByFilters);
router.put('/:id', livroController.updateLivro);
router.delete('/:id', livroController.deleteLivro);

module.exports = router;