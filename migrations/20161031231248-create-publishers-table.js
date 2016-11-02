'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Publishers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      soundcloud_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      permalink_url: Sequelize.STRING,
      avatar_url: Sequelize.STRING,
      country: Sequelize.STRING,
      track_count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      followers_count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      followings_count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      city: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Publishers');
  }
};
