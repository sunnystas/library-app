'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      pic: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      timestamps: false,
    })
        .then(() => queryInterface.addIndex("User", ["email"], { type: 'UNIQUE' }));
  },
  down: (queryInterface) => {
    return queryInterface.removeIndex("User", ["email"])
        .then(() => queryInterface.dropTable('User'));
  }
};
