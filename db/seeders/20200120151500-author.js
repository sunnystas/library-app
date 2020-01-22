"use strict";

module.exports = {
  up: (queryInterface) => {
      return queryInterface.bulkInsert("Author", [{
        firstName: "John",
        lastName: "Doe",
        dob: "1990-03-25"
      }, {
        firstName: "Jack",
        lastName: "Sparrow",
        dob: "1980-05-15"
      }, {
        firstName: "Jane",
        lastName: "Air",
        dob: "1985-10-05"
      }], {});
  },

  down: (queryInterface) => {
      return queryInterface.bulkDelete("Author", null);
  }
};
