'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Review, {
        foreignKey: 'postId',
        as: 'reviews',
        onDelete: 'CASCADE',
      });

      this.hasMany(models.Log, {
        foreignKey: 'postId',
        as: 'logs'
      });

      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'users',
        onDelete: 'CASCADE',
      })
    }
  };
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};