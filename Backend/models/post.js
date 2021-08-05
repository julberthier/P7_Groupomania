'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
      static associate(models) {
    }
  };
  Post.init({
    userId: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};