// MIDDLEWARE PARA QUE O USUARIO SO ACESE DETERMINADAS PAGINAS
// SE ESTIVER LOGADO
import jwt from 'jsonwebtoken';
// importa o promisify permitindo usar a sintaxe async await no verify
import { promisify } from 'util';

// importa o segredo do token
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // busca o header da req enviada pelo insomnia
  const authHeader = req.headers.authorization;

  // verifica caso na o tenha header
  if (!authHeader) {
    // console.log('Token not provided');
    return res.status(401).json({ error: 'Token not provided' });
  }

  // divindindo a authhader pois ela retorna o barer na frente
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTU3MTUxOTI3MCwiZXhwIjoxNTcyMTI0MDcwfQ.fjmm3rY36lzYm5XbylrcnsLPAizXuNLskR5G5m89X0M
  // [,token] estruturacao para so pegar o token ja na primeira posi do array
  const [, token] = authHeader.split(' ');

  try {
    // promisify nao retorna callback
    // /jwt verify defodifica o token do usuario com o segredo
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // joga o id do usuario para dentro da requisicao
    req.userId = decoded.id;
    // console.log(decoded);

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }

  // return next();
};
