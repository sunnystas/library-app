'use strict';

module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.DATEONLY
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Author;
};
