'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
    }
  };
  Comment.init({    
    username: DataTypes.STRING,
    userId: DataTypes.STRING,
    content: DataTypes.STRING,
    photoUser: DataTypes.STRING,
    articlesId: DataTypes.STRING,
    date: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};