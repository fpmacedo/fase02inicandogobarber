// CRIA O CONTROLLER PARA O USUARIO OU SEJA A INTERFACE ENTRE
// O FRONT E O BD

// importa o modelo usuario
import User from '../models/User';

// cria a classe que sera exportada
class UserController {
  // informa que o store metodo de armazenar e assincrono
  async store(req, res) {
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

  async update(req, res) {
    return res.json({ ok: true });
  }
}

export default new UserController();
