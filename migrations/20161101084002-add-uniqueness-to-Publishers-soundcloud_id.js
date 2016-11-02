'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Publishers',
      'soundcloud_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      }
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.changeColumn(
      'Publishers',
      'soundcloud_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
      }
    );
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
