'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Book', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0
        }
      },
      releasedAt: {
        type: Sequelize.DATEONLY
      }
    }, {
      timestamps: false
    })
        .then(() => queryInterface.addIndex("Book", ["name"]));
  },
  down: (queryInterface) => {
    return queryInterface.removeIndex("Book", ["name"])
        .then(() => queryInterface.dropTable('Book'));
  }
};
