'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    associate(models) {
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId'
      })
    }
  };
  Comment.init({    
    content: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    commentsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};