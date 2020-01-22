"use strict";

module.exports = {
  up: (queryInterface) => {
      return queryInterface.bulkInsert("Book", [{
        name: "Book 1",
        quantity: 10,
        releasedAt: "2010-04-21"
      }, {
        name: "Book 2",
        quantity: 10,
        releasedAt: "2011-04-21"
      }, {
        name: "Book 3",
        quantity: 10,
        releasedAt: "2012-04-21"
      }, {
        name: "Book 4",
        quantity: 10,
        releasedAt: "2013-04-21"
      }, {
        name: "Book 5",
        quantity: 10,
        releasedAt: "2014-04-21"
      }, {
        name: "Book 6",
        quantity: 10,
        releasedAt: "2015-04-21"
      }, {
        name: "Book 7",
        quantity: 10,
        releasedAt: "2016-04-21"
      }, {
        name: "Book 8",
        quantity: 10,
        releasedAt: "2017-04-21"
      }, {
        name: "Book 9",
        quantity: 10,
        releasedAt: "2018-04-21"
      }], {});
  },

  down: (queryInterface) => {
      return queryInterface.bulkDelete("Book", null);
  }
};
