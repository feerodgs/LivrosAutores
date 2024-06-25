# Projeto de Gerenciamento de Livros e Autores

## Descrição do Projeto

Bem-vindo ao **Sistema de Gerenciamento de Livros e Autores**! Este projeto foi desenvolvido para a matéria de Programação Web da faculdade de Ciência da Computação. Ele tem como objetivo facilitar o gerenciamento de autores e seus respectivos livros, proporcionando uma interface amigável e funcional para usuários que precisam cadastrar, visualizar, atualizar e excluir informações sobre autores e suas obras literárias.

## Tecnologias Utilizadas

### Frontend

- **React com Vite**: React é uma biblioteca JavaScript para construção de interfaces de usuário, enquanto Vite é uma ferramenta de construção rápida que otimiza a performance durante o desenvolvimento.
- **Material UI**: Uma biblioteca de componentes de interface de usuário que implementa o design system do Material Design, proporcionando uma aparência moderna e consistente.
- **Axios**: Uma biblioteca para fazer requisições HTTP de forma simples e eficiente.

### Backend

- **Node.js**: Um ambiente de execução JavaScript server-side que permite a construção de aplicações escaláveis e eficientes.
- **Sequelize**: Um ORM (Object-Relational Mapper) para Node.js que facilita a interação com bancos de dados relacionais, como o MySQL, PostgreSQL, SQLite e outros.

## Estrutura do Projeto

O projeto está dividido em duas principais pastas: `Backend` e `FrontEnd/LivrosAutores`.

### Backend

O backend é responsável por gerenciar as requisições da API e a lógica de negócio do sistema. Ele foi desenvolvido utilizando Node.js e Sequelize para interação com o banco de dados.

#### Como Executar o Backend

1. Abra o terminal e navegue até a pasta `Backend`:
   ```sh
   cd Backend
   ```
2. Instale as dependências necessárias:
   ```sh
   npm install
   ```
3. Inicie o servidor:
   ```sh
   node index.js
   ```

### Frontend

O frontend oferece a interface de usuário para interação com o sistema. Ele foi desenvolvido utilizando React com Vite, Material UI para a interface e Axios para realizar as requisições à API.

#### Como Executar o Frontend

1. Abra o terminal e navegue até a pasta `FrontEnd/LivrosAutores`:
   ```sh
   cd FrontEnd/LivrosAutores
   ```
2. Instale as dependências necessárias:
   ```sh
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

## Considerações Finais

Este projeto foi desenvolvido com o intuito de fornecer uma ferramenta eficaz e de fácil uso para o gerenciamento de autores e livros. Utilizamos tecnologias modernas e eficientes para garantir uma boa performance tanto no lado do cliente quanto no lado do servidor.

Se você tiver alguma dúvida ou encontrar algum problema, sinta-se à vontade para abrir uma issue ou contribuir para o projeto!

Aproveite o sistema e boa leitura! 📚