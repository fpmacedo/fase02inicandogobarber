/* importa o metodo Router de dentro do express para nao importar o
express inteiro */
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
// import User from './app/models/User';

// importa o UserController
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middleware/auth';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

// cria variavel routes que ira conter o metodo Routes
const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// routes para definir o middleware para todas as rotas daqui para baixo
routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

// configura uma rota para receber a imagem de um unico arquivo
routes.post('/files', upload.single('file'), FileController.store);

// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Filipe Macedo',
//     email: 'lipe_macedo@msn.com',
//     password_hash: '119e84354987',
//   });

//   return res.json(user);
// });

export default routes;
