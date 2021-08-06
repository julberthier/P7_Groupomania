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
    articlesId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};