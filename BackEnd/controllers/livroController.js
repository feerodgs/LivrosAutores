const Livro = require('../models/livro');
const Autor = require('../models/autor');

const createLivro = async (req, res) => {
  try {
    const livro = await Livro.create(req.body);
    res.status(201).json(livro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getLivros = async (req, res) => {
  try {
    const livros = await Livro.findAll({
      include: {
        model: Autor,
        required: false,
        // attributes: ['nome'],
      }
    });
    res.json(livros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLivroByFilters = async (req, res) => {
  const { titulo, autor, genero } = req.query;
  try {
    const where = {};
    if (titulo) where.titulo = titulo;
    if (autor) where.autor_id = autor;
    if (genero) where.genero = genero;
    const livros = await Livro.findAll({ where, include: Autor });
    res.json(livros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateLivro = async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (!livro) {
      return res.status(404).json({ error: 'Livro not found' });
    }
    await livro.update(req.body);
    res.json(livro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteLivro = async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (!livro) {
      return res.status(404).json({ error: 'Livro not found' });
    }
    await livro.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createLivro,
  getLivros,
  getLivroByFilters,
  updateLivro,
  deleteLivro
};
