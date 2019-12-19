// CRIA O CONTROLLER PARA O USUARIO OU SEJA A INTERFACE ENTRE
// O FRONT E O BD

// importa o modelo usuario
import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
// importa o yup para fazer validacoes

// cria a classe que sera exportada
class UserController {
  // informa que o store metodo de armazenar e assincrono
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

    // verifica se ja existe algum email igual no BD
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      // caso ja exista retorna ao user bad request
      return res.status(400).json({ error: 'User already exists.' });
    }
    // cria o usuario utilizando os dados do req.body e o metodo create
    // e escolhe apenas alguns campos para retornar ao front end
    const { id, name, email, provider } = await User.create(req.body);
    // retorna como json ao usuario
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  // METODO PARA USUARIO FAZER ATUALIZACAO DE CADASTRO
  async update(req, res) {
    // cri um objeto yup para a verificacao dos dados recebidos
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        // utilizado para verificar se foi indicado oldpassword
        // ou seja troca de senha
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      // garante que o campo confirmpassword seja o mesmo que o password
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // buscar email e pass antigo no body
    const { email, oldPassword } = req.body;
    // busca o usuario dentro do BD pela primary key que definimos como ID
    const user = await User.findByPk(req.userId);
    // verifica se o e-mail novo e diferente do atual
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        // caso ja exista retorna ao user bad request
        return res.status(400).json({ error: 'User already exists.' });
      }
    }
    // verifica se o password antigo esta correto
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
