module.exports = function(sequelize, DataTypes) {
  var Logins = sequelize.define("Logins", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Logins;
};