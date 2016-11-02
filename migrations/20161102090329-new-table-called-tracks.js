'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Tracks', {
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
        allowNull: false,
        unique: true
      },
      artwork_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at_external: {
        type: Sequelize.DATE,
        allowNull: false
      },
      CuratorTrackId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CuratorTracks',
          key: 'id'
        }
      },
      PublisherId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Publishers',
          key: 'id'
        }
      },
      permalink_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      track_type: {
        type: Sequelize.ENUM('mix', 'song'),
        allowNull: false
      },
      playback_count: {
        type: Sequelize.INTEGER, // should be integer
        allowNull: false
      },
      likes_count: {
        type: Sequelize.INTEGER, //should be integer
        allowNull: false
      },
      purchase_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Tracks');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
