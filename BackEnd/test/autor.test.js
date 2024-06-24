const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js').default; // Importando o app como default

const { expect } = chai;


describe('API de Autores', () => {
  it('Deve criar um novo autor', (done) => {
    chai.request(app)
      .post('/api/autores')
      .send({
        nome: 'Autor Teste',
        bio: 'Biografia do Autor Teste',
        data_nasc: '2000-01-01',
        nacionalidade: 'Brasileira'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('Deve listar todos os autores', (done) => {
    chai.request(app)
      .get('/api/autores')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Deve buscar autores pelo nome', (done) => {
    chai.request(app)
      .get('/api/autores/buscar')
      .query({ nome: 'Autor Teste' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Deve atualizar um autor', (done) => {
    const autorId = 1; 
    chai.request(app)
      .put(`/api/autores/${autorId}`)
      .send({
        nome: 'Autor Teste Atualizado',
        bio: 'Biografia do Autor Teste Atualizado'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('nome').eql('Autor Teste Atualizado');
        done();
      });
  });

  it('Deve deletar um autor', (done) => {
    const autorId = 1; 
    chai.request(app)
      .delete(`/api/autores/${autorId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});
