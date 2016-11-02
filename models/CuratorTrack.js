'use strict';
module.exports = function(sequelize, DataTypes) {


  var CuratorTrack = sequelize.define('CuratorTrack', {
		CuratorId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		TrackId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}

  }, {
    classMethods: {
      associate: function(models) {
        CuratorTrack.hasMany(models.Track, {as: 'tracks'});
      }
    }
  });
  return CuratorTrack;
};
