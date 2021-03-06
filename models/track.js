'use strict';

module.exports = (sequelize, DataTypes) => {


  const Track = sequelize.define('Track', {
    name: {
      type: DataTypes.STRING,
      allowNull: false

    },
    soundcloud_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    artwork_url: DataTypes.STRING,
    created_at_external: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    permalink_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    track_type: {
      type: DataTypes.ENUM('mix', 'song'),
      allowNull: false
    },
    playback_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    likes_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purchase_url: DataTypes.STRING

  },
  {
    classMethods: {
      associate: function(models) {
      

        Track.belongsTo(models.Publisher, {
          foreignKey: {
            allowNull: false
          }
        });
        // associations can be defined here
      }
    }
  });

  return Track;

};




// export default Track;
