module.exports = function(sequelize, DataTypes) {
  var Settings = sequelize.define("Settings", {
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comedy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    horror: {
      type: DataTypes.STRING,
      allowNull: false
    },
    drama: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // settings
  Settings.associate = function(models) {
    Settings.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
 
  return Settings;
};