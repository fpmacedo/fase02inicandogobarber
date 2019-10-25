module.exports = {
  up: (queryInterface, Sequelize) => {
    // indica o metodo addColumn para adicionar uma coluna
    // ao banco users
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      // Cria uma referencia para o ID dos usuarios
      references: { model: 'files', key: 'id' },
      // se o ID do usuario for atualizado atualiza o
      // ID da imagem tambem
      onUpdate: 'CASCADE',
      // Se deletar o ID do usuario seta o ID do avatar
      // como sendo nulo
      onDelete: 'SET NULL',
      // permite que o campo seja nulo
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
