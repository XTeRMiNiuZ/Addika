'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      this.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post'
      });
    }
  };
  Log.init({
    resource: DataTypes.STRING,
    action: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};