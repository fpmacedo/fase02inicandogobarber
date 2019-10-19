// MIDDLEWARE PARA QUE O USUARIO SO ACESE DETERMINADAS PAGINAS
// SE ESTIVER LOGADO
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // divindindo a authhader pois ela retorna o barer na frente
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTU3MTUxOTI3MCwiZXhwIjoxNTcyMTI0MDcwfQ.fjmm3rY36lzYm5XbylrcnsLPAizXuNLskR5G5m89X0M
  // [,token] estruturacao para so pegar o token ja na primeira posi do array
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // req.userId =
    console.log(decoded);

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
