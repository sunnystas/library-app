'use strict';

module.exports = (sequelize, DataTypes) => {
  const AuthorBook = sequelize.define('AuthorBook', {
    authorId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return AuthorBook;
};