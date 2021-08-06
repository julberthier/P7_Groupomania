'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Post);
    }
  };
  User.init({
    email: { type: DataTypes.STRING,
      unique: true },
    username: { type: DataTypes.STRING,
      unique: true },
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    photo: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};