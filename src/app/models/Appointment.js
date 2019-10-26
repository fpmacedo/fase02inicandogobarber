// ARQUIVO PARA DEFINIR O MODEL DE ARQUIVOS
import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  // cria o metodo init do arquivo para ser chamado pelo index.js
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // cria o metodo para associar o campo ao model do usuario
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
