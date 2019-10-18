// arquivo onde e configurado o servidor express
// importar express
import express from 'express';
import routes from './routes';

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
    this.server.use(express.json());
  }

  // metodo routes chama o arquivo com as rotas
  routes() {
    this.server.use(routes);
  }
}

// exporta o servidor para ser chamado em outros arquivos
export default new App().server;
