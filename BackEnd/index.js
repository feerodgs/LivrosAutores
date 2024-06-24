const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../BackEnd/config/database');
const autorRoutes = require('../BackEnd/routes/Autor');
const livroRoutes = require('../BackEnd/routes/Livro');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/autores', autorRoutes);
app.use('/api/livros', livroRoutes);

sequelize.sync().then(() => {
  console.log('Banco de dados conectado e tabelas sincronizadas.');
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
});
