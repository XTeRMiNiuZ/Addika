'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts',
        onDelete: 'CASCADE',
      });

      this.hasMany(models.Log, {
        foreignKey: 'userId',
        as: 'logs',
        onDelete: 'CASCADE',
      });
  
      this.belongsToMany(models.Role, {
        through: "UserRoles"
      });
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 3,
          msg: "Name must be atleast 3 characters in length"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 8
        }
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      default: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};