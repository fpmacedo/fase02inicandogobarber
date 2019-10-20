// CRONTOLLER PARA CRIAR UMA SESSAO DE USUARIO
// instalar yarn add jsonwebtoken
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';
// importa o modelo usuario

class SessionController {
  async store(req, res) {
    // cria um objeto yup para a verificacao dos dados recebidos
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    // verifica se todos os parametros dentro do schema sao validos
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // pega email e password do corpo da requisicao
    const { email, password } = req.body;
    // verifica se o e-mail do usuario ja existe no bd
    const user = await User.findOne({ where: { email } });
    // verifica se o usuario existe a partir do email
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;
    // retorna os dados do usuario
    return res.json({
      user: {
        id,
        name,
        email,
      },
      // gera o token da sessao do usuario, jogando o id que e o payload
      // do JWT e o segundo parametro e o verificador que e unico
      // gerei este com o site https://www.md5online.org/ digitando o
      // meugobarberonline que gerou o resultado abaixo
      // The MD5 hash for meugobarberonline is : 247486234f865a944180b455fef20e07
      // terceiro parametro e o tempo de validade do token
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
