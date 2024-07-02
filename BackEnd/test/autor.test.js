const request = require('supertest');
const app = require('../index');
const sequelize = require('../config/database');
const Autor = require('../models/autor');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('API de Autores', () => {
  describe('/POST autor', () => {
    it('Deve criar um novo autor', async () => {
      const res = await request(app)
        .post('/api/autores')
        .send({
          nome: 'Autor Teste',
          bio: 'Biografia do Autor Teste',
          data_nasc: '2000-01-01',
          nacionalidade: 'Brasileira'
        });

      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('id');
    });
  });

  describe('/GET autores', () => {
    it('Deve listar todos os autores', async () => {
      const res = await request(app).get('/api/autores');

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('/GET autor/buscar', () => {
    it('Deve buscar autores pelo nome', async () => {
      const res = await request(app)
        .get('/api/autores/buscar')
        .query({ nome: 'Autor Teste' });

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('/PUT autor/:id', () => {
    it('Deve atualizar um autor', async () => {
      const autor = await Autor.create({
        nome: 'Autor Original',
        bio: 'Biografia Original',
        data_nasc: '2000-01-01',
        nacionalidade: 'Brasileira'
      });

      const res = await request(app)
        .put(`/api/autores/${autor.id}`)
        .send({
          nome: 'Autor Teste Atualizado',
          bio: 'Biografia do Autor Teste Atualizado'
        });

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('nome', 'Autor Teste Atualizado');
    });
  });

  describe('/DELETE autor/:id', () => {
    it('Deve deletar um autor', async () => {
      const autor = await Autor.create({
        nome: 'Autor a ser Deletado',
        bio: 'Biografia a ser Deletada',
        data_nasc: '2000-01-01',
        nacionalidade: 'Brasileira'
      });

      const res = await request(app).delete(`/api/autores/${autor.id}`);

      expect(res.status).toBe(204);
    });
  });
});