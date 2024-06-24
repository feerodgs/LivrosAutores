const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Autor = require('./autor');

const Livro = sequelize.define('Livro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  autor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Autor,
      key: 'id'
    }
  },
  ano_publicacao: {
    type: DataTypes.INTEGER
  },
  genero: {
    type: DataTypes.STRING
  },
  quantidade: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false
});

Livro.belongsTo(Autor, { foreignKey: 'autor_id' });

module.exports = Livro;
