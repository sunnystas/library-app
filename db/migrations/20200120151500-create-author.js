'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Author', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATEONLY
      }
    }, {
      timestamps: false
    })
        .then(() => queryInterface.addIndex("Author", ["firstName", "lastName", "dob"], { type: 'UNIQUE' }));
  },
  down: (queryInterface) => {
    return queryInterface.removeIndex("Author", ["firstName", "lastName", "dob"])
        .then(() => queryInterface.dropTable('Author'));
  }
};
