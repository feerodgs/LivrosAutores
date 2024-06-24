const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../index');
const db = require('../models');

chai.use(chaiHttp);

describe('Livros', () => {
  before((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      db.Autor.create({
        nome: "J.K. Rowling",
        bio: "Author of the Harry Potter series",
        data_nasc: "1965-07-31",
        nacionalidade: "British"
      }).then(() => done());
    });
  });

  describe('/POST livro', () => {
    it('deve criar um novo livro', (done) => {
      db.Autor.findOne().then((autor) => {
        let livro = {
          titulo: "Harry Potter and the Philosopher's Stone",
          descricao: "Fantasy novel",
          autor_id: autor.id,
          ano_publicacao: 1997,
          genero: "Fantasy",
          quantidade: 10
        };
        chai.request(server)
            .post('/api/livros')
            .send(livro)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('titulo').eql("Harry Potter and the Philosopher's Stone");
              done();
            });
      });
    });
  });

  describe('/GET livros', () => {
    it('deve listar todos os livros', (done) => {
      chai.request(server)
          .get('/api/livros')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          });
    });
  });

  describe('/GET livro/:id', () => {
    it('deve retornar um livro por id', (done) => {
      db.Autor.findOne().then((autor) => {
        let livro = {
          titulo: "Harry Potter and the Philosopher's Stone",
          descricao: "Fantasy novel",
          autor_id: autor.id,
          ano_publicacao: 1997,
          genero: "Fantasy",
          quantidade: 10
        };
        db.Livro.create(livro).then((livro) => {
          chai.request(server)
              .get('/api/livros/' + livro.id)
              .send(livro)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('titulo').eql("Harry Potter and the Philosopher's Stone");
                done();
              });
        });
      });
    });
  });

  describe('/PUT livro/:id', () => {
    it('deve atualizar um livro por id', (done) => {
      db.Autor.findOne().then((autor) => {
        let livro = {
          titulo: "Harry Potter and the Philosopher's Stone",
          descricao: "Fantasy novel",
          autor_id: autor.id,
          ano_publicacao: 1997,
          genero: "Fantasy",
          quantidade: 10
        };
        db.Livro.create(livro).then((livro) => {
          chai.request(server)
              .put('/api/livros/' + livro.id)
              .send({ titulo: "Harry Potter and the Chamber of Secrets" })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('titulo').eql("Harry Potter and the Chamber of Secrets");
                done();
              });
        });
      });
    });
  });

  describe('/DELETE livro/:id', () => {
    it('deve excluir um livro por id', (done) => {
      db.Autor.findOne().then((autor) => {
        let livro = {
          titulo: "Harry Potter and the Philosopher's Stone",
          descricao: "Fantasy novel",
          autor_id: autor.id,
          ano_publicacao: 1997,
          genero: "Fantasy",
          quantidade: 10
        };
        db.Livro.create(livro).then((livro) => {
          chai.request(server)
              .delete('/api/livros/' + livro.id)
              .end((err, res) => {
                res.should.have.status(204);
                done();
              });
        });
      });
    });
  });
});
