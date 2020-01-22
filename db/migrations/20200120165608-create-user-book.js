'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserBook', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Book',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
      .then(() => queryInterface.addIndex("UserBook", ["userId"]))
      .then(() => queryInterface.addIndex("UserBook", ["bookId"]))
      .then(() => queryInterface.addIndex("UserBook", ["userId", "bookId"], { type: 'UNIQUE' }))
    },
  down: (queryInterface) => {
    return queryInterface.removeIndex("UserBook", ["userId"])
    .then(() => queryInterface.removeIndex("UserBook", ["bookId"])) 
    .then(() => queryInterface.removeIndex("UserBook", ["userId", "bookId"])) 
    .then(() => queryInterface.dropTable('UserBook'));
  }
};