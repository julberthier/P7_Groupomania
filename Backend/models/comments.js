'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      // models.Comments.belongsTo(models.User, {
      //   foreignKey: "idUsers",
      //   onDelete: "cascade"
      // }),
      // models.Comments.belongsTo(models.Post, { 
      //   foreignKey: "id", 
      //   onDelete:" cascade" 
      // });
    }
  };
  Comments.init({
    idUsers: DataTypes.INTEGER,
    content: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    commentsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
    freezeTableName: true
  });
  return Comments;
};