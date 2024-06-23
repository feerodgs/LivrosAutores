const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('biblioteca', 'root', 'masterkey', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;