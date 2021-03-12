'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {};
  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The title of the course cannot be empty'
        },
        notEmpty: {
          msg: "Title cannot be empty"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The description of the course cannot be empty'
        },
        notEmpty: {
          msg: "Description cannot be empty"
        }
      }
    },
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });

  Course.associate = (models) => { // associate Course with only 1 user
    Course.belongsTo(models.User, {
      as: 'associatedUser',
      foreignKey: 'userId'
    });
  }

  return Course;
};