const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Autor = sequelize.define('Autor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT
  },
  data_nasc: {
    type: DataTypes.DATE
  },
  nacionalidade: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
});

module.exports = Autor;
