'use strict';

const { ErrorHandler } = require('../helpers/Error');

module.exports = (sequelize, DataTypes) => {
  const UserBook = sequelize.define('UserBook', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });

  return UserBook;
};