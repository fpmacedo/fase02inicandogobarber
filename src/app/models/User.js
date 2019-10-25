// ARQUIVO PARA DEFINIR O MODEL DE USUARIO
import Sequelize, { Model } from 'sequelize';
// importa o bcrypt para hash password
import bcrypt from 'bcryptjs';

class User extends Model {
  // cria o metodo init do arquivo para ser chamado pelo index.js
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // campo de password virtual, que nao vai para o BD
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    // hook utilizado para executar algum trecho de codigo antes
    // de algo, exemplo beforesave antes de salvar executa o trecho
    this.addHook('beforeSave', async user => {
      // if para so gerar o hash se estiver criando senha
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // cria o metodo para associar o campo avatar_id ao model do usuario
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  // metodo para verificar se o parametro password passado e o hash
  // sao iguais verificando se a senha e verdadeira
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
