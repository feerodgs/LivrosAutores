const Autor = require('../models/autor');

const createAutor = async (req, res) => {
  try {
    const autor = await Autor.create(req.body);
    res.status(201).json(autor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAutores = async (req, res) => {
  try {
    const autores = await Autor.findAll();
    res.json(autores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAutorByName = async (req, res) => {
  const { nome } = req.query;
  try {
    const autores = await Autor.findAll({ where: { nome } });
    res.json(autores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAutor = async (req, res) => {
  try {
    const autor = await Autor.findByPk(req.params.id);
    if (!autor) {
      return res.status(404).json({ error: 'Autor not found' });
    }
    await autor.update(req.body);
    res.json(autor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAutor = async (req, res) => {
  try {
    const autor = await Autor.findByPk(req.params.id);
    if (!autor) {
      return res.status(404).json({ error: 'Autor not found' });
    }
    await autor.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createAutor,
  getAutores,
  getAutorByName,
  updateAutor,
  deleteAutor
};
