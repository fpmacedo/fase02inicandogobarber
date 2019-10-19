/* importa o metodo Router de dentro do express para nao importar o
express inteiro */
import { Router } from 'express';

import User from './app/models/User';

// cria variavel routes que ira conter o metodo Routes
const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Filipe Macedo',
    email: 'lipe_macedo@msn.com',
    password_hash: '1198452354987',
  });

  return res.json(user);
});

export default routes;
