'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: "UserRoles"
      });
      this.hasMany(models.UserPermission, {
        foreignKey: 'roleId',
        as: 'UserPermissions',
        onDelete: 'CASCADE',
      });
    }
  };
  Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: false//when you don't have any timestamp columns
  });
  return Role;
};