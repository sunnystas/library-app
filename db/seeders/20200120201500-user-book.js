"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("UserBook", [{
        userId: 2,
        bookId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }, {
        userId: 2,
        bookId: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }, {
        userId: 2,
        bookId: 3,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }, {
        userId: 2,
        bookId: 4,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }], {});
  },

  down: (queryInterface) => {
      return queryInterface.bulkDelete("UserBook", null);
  }
};
