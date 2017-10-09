module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    md5username: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  // joining user with settings table with a hasone relationship
  User.associate = function(models) {
    User.hasOne(models.Settings, {
    });
  };
  return User;
};