
/*importa o metodo Router de dentro do express para nao importar o
express inteiro*/
import {Router} from 'express';

//cria variavel routes que ira conter o metodo Routes
const routes = new Router();

routes.get('/', (req, res) => {

  return res.json({ message: 'Helo wadaorld'});

})

export default routes;