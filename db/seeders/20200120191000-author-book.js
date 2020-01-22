"use strict";

module.exports = {
  up: (queryInterface) => {
      return queryInterface.bulkInsert("AuthorBook", [{
        authorId: 1,
        bookId: 1
      }, {
        authorId: 1,
        bookId: 2
      }, {
        authorId: 1,
        bookId: 3
      }, {
        authorId: 1,
        bookId: 4
      }, {
        authorId: 2,
        bookId: 1
      }, {
        authorId: 3,
        bookId: 1
      }, {
        authorId: 2,
        bookId: 3
      }, {
        authorId: 2,
        bookId: 5
      }, {
        authorId: 1,
        bookId: 6
      }, {
        authorId: 1,
        bookId: 8
      }, {
        authorId: 3,
        bookId: 9
      }, {
        authorId: 3,
        bookId: 8
      }, {
        authorId: 3,
        bookId: 7
      }, {
        authorId: 1,
        bookId: 9
      }, {
        authorId: 3,
        bookId: 5
      }, {
        authorId: 2,
        bookId: 7
      }, {
        authorId: 2,
        bookId: 4
      }, {
        authorId: 3,
        bookId: 2
      }, {
        authorId: 3,
        bookId: 6
      }, {
        authorId: 2,
        bookId: 2
      }, {
        authorId: 3,
        bookId: 3
      }], {});
  },

  down: (queryInterface) => {
      return queryInterface.bulkDelete("AuthorBook", null);
  }
};
