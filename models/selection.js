'use strict';
module.exports = function(sequelize, DataTypes) {


  var Selection = sequelize.define('Selection', {
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
        // Selection.hasMany(models.Track, {as: 'tracks'});
        // Selection.hasMany(models.Curator, {as: 'curators'});
      }
    }
  });
  return Selection;
};
