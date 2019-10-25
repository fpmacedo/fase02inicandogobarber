// arquivo onde e configurado o servidor express
// importar express
import express from 'express';
import path from 'path';
import routes from './routes';

// chama o arquivo de database index.js
import './database';

class App {
  constructor() {
    // cria o server
    this.server = express();
    /* chamas os metodos fora do constructor, caso contrario eles
    nao serao executados */
    this.middlewares();
    this.routes();
  }

  // metodo middlewares
  middlewares() {
    // informa ao express que ele tem que ler JSON no corpo das msgs POST
    this.server.use(express.json());
    // metodo para servir arquivos estaticos avatar etc
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // metodo routes chama o arquivo com as rotas
  routes() {
    this.server.use(routes);
  }
}

// exporta o servidor para ser chamado em outros arquivos
export default new App().server;
