'use strict';

const { ErrorHandler } = require('../helpers/Error');
const roles = require("../base/Roles");

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    releasedAt: DataTypes.DATEONLY
  }, {
    timestamps: false,
    freezeTableName: true
  });

  Book.getAvailable = async function(user) {
    try {
      let quantityCond = "";
      if (user.role === roles.USER) {
          quantityCond += 'where "Book"."quantity" > 0';
      }
      // used raw queries to demonstrate my SQL skills
      // actually, I could use Sequelize's hasMany / belongsTo associations, but prefer raw queries instead
      const books = await sequelize.query('select "Book"."id", "Book"."name" as "book", "Book"."quantity", "Book"."releasedAt", string_agg("Author"."firstName" || \' \' || "Author"."lastName", \', \') as "authors"  \
        from "Book" \
        left join "AuthorBook" on "Book"."id" = "AuthorBook"."bookId" \
        left join "Author" on "Author"."id" = "AuthorBook"."authorId" '
        + quantityCond +
        'group by "Book"."id"');
      return books[0];
    } catch (err) {
      throw new ErrorHandler(500, "Error extracting available books");
    }
  };

  Book.getTakenBooks = async function(user) {
    try {
      const books = await sequelize.query('select "Book"."id", "Book"."name" as "book", "UserBook"."createdAt" as "takenAt" \
        from "Book" \
        left join "UserBook" on "Book"."id" = "UserBook"."bookId" \
        where "UserBook"."userId" = ' + user.id);
      return books[0];
    } catch (err) {
      throw new ErrorHandler(500, "Error extracting taken books");
    }
  };

  return Book;
};
