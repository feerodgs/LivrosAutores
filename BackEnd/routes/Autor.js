const express = require('express');
const autorController = require('../controllers/autorController');

const router = express.Router();

router.post('/', autorController.createAutor);
router.get('/', autorController.getAutores);
router.get('/buscar', autorController.getAutorByName);
router.put('/:id', autorController.updateAutor);
router.delete('/:id', autorController.deleteAutor);

module.exports = router;
