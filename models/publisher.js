'use strict';
module.exports = function(sequelize, DataTypes) {

  const defaultOptions = (allowNull = false) => ({
    type: DataTypes.STRING,
    allowNull
  });

  var Publisher = sequelize.define('Publisher', {
    name: defaultOptions(),
    soundcloud_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    permalink_url: defaultOptions(),
    avatar_url: defaultOptions(true),
    country: defaultOptions(true),
    city: defaultOptions(true),
    track_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followers_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followings_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Publisher.hasMany(models.Track, {as: 'tracks', onDelete: 'CASCADE'});
      }
    }
  });
  return Publisher;
};
