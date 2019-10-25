// ARQUIVO PARA CRIAR CONEXAO COM BANCO DE DADOS E CARREGAR OS MODULOS
// E O LOADER DE MODELS
import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // cria uma conexao iniciando as configuracoes contidas no databaseConfig
    // parametro sequelize recebido pelo init
    this.connection = new Sequelize(databaseConfig);
    /* percorre todos os models onde model=User e demais model
       chamando model.init ou seja User.init passando o parametro
       connection criado a cima (init esta dentro da class model no User.js)
    */
    models
      .map(model => model.init(this.connection))
      // verifica se dentro do model existe o metodo acossiate
      // em caso positivo chama o metodo
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
