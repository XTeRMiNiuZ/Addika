'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, {
        foreignKey: 'postId',
        as: 'posts',
        onDelete: 'CASCADE',
      })
    }
  };
  UserPermission.init({
    roleId: DataTypes.INTEGER,
    resource: DataTypes.STRING,
    action: DataTypes.STRING,
    actionType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserPermission',
    timestamps: false//when you don't have any timestamp columns
  });
  return UserPermission;
};