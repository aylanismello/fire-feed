'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameTable('CuratorTracks', 'Selections');

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameTable('Selections', 'CuratorTracks');

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
