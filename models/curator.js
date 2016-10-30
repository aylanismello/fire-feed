'use strict';
module.exports = function(sequelize, DataTypes) {
  var Curator = sequelize.define('Curator', {
    title: DataTypes.STRING,
    soundcloud_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Curator;
};