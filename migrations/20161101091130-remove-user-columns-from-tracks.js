'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Tracks', 'username');
    queryInterface.removeColumn('Tracks', 'user_avatar_url');
    queryInterface.removeColumn('Tracks', 'user_country_code');
    queryInterface.removeColumn('Tracks', 'user_city');
    return queryInterface;

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {

    queryInterface.addColumn('Tracks', 'username', Sequelize.STRING);
    queryInterface.addColumn('Tracks', 'user_avatar_url', Sequelize.STRING);
    queryInterface.addColumn('Tracks', 'user_country_code', Sequelize.STRING);
    queryInterface.addColumn('Tracks', 'user_city', Sequelize.STRING);
    return queryInterface;
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
