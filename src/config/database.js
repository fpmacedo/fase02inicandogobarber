module.exports = {
  // o dialeto que sera utilizado adicionar no terminal dep. yarn add pg pg-hstore
  dialect: 'postgres',
  host: 'localhost',
  // informacoes do docker criado previamente
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
