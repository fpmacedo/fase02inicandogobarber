// arquivo onde e configurado o servidor express
// importar express
import express from 'express';
import path from 'path';
import * as Sentry from '@sentry/node';
// importar express-async-errors antes de routes
import 'express-async-errors';
import Youch from 'youch';
import routes from './routes';
import sentryConfig from './config/sentry';

// chama o arquivo de database index.js
import './database';

class App {
  constructor() {
    // cria o server
    this.server = express();

    // Inicia o sentry
    Sentry.init(sentryConfig);

    /* chamas os metodos fora do constructor, caso contrario eles
    nao serao executados */
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  // metodo middlewares
  middlewares() {
    // metodo para iniciar o sentry
    this.server.use(Sentry.Handlers.requestHandler());
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
    // sentry documentacao diz para chamar depois das rotas
    this.server.use(Sentry.Handlers.errorHandler());
  }

  // funcao para tratar excessoes erros
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();

      return res.status(500).json(errors);
    });
  }
}

// exporta o servidor para ser chamado em outros arquivos
export default new App().server;
