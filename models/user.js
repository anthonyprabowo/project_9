'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {};
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Firstname field cannot be empty"
        },
        notEmpty: {
          msg: "Firstname field cannot be empty"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Lastname field cannot be empty"
        },
        notEmpty: {
          msg: "Lastname field cannot be empty"
        }
        
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email address has been used. Please enter a new email address"
      },
      validate: {
        notNull: {
          msg: 'Email field cannot be empty'
        },
        isEmail: {
          msg: 'Email is not valid'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be empty'
        },
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: 'userID',
      foreignKey: 'userId',
    })
  }
  return User;
};