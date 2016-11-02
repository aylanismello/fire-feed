'use strict';
module.exports = function(sequelize, DataTypes) {

  const defaultOptions = (allowNull = false) => ({
    type: DataTypes.STRING,
    allowNull
  });

  var Curator = sequelize.define('Curator', {
    name: defaultOptions(),
    soundcloud_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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

      }
    }
  });
  return Curator;
};
