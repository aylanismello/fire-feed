'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    const defaultOptions = (allowNull = false) => ({
      type: Sequelize.STRING,
      allowNull
    });

    queryInterface.addColumn(
      'Curators',
      'permalink_url',
      defaultOptions()
    );

    queryInterface.addColumn(
      'Curators',
      'avatar_url',
      defaultOptions(true)

    );

    queryInterface.addColumn(
      'Curators',
      'country',
      defaultOptions(true)
    );

    queryInterface.addColumn(
      'Curators',
      'track_count',
      defaultOptions()
    );

    queryInterface.addColumn(
      'Curators',
      'followers_count',
      defaultOptions()
    );

    queryInterface.addColumn(
      'Curators',
      'followings_count',
      defaultOptions()
    );

    return queryInterface;

  },

  down: function (queryInterface, Sequelize) {

    queryInterface.removeColumn('Curators', 'permalink_url');
    queryInterface.removeColumn('Curators', 'avatar_url');
    queryInterface.removeColumn('Curators', 'country');
    queryInterface.removeColumn('Curators', 'track_count');
    queryInterface.removeColumn('Curators', 'followers_count');
    queryInterface.removeColumn('Curators', 'followings_count');
    return queryInterface;

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
