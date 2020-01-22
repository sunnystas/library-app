'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AuthorBook', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Author',
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
      }
    })
    .then(() => queryInterface.addIndex("AuthorBook", ["authorId"]))
    .then(() => queryInterface.addIndex("AuthorBook", ["bookId"]))
    .then(() => queryInterface.addIndex("AuthorBook", ["authorId", "bookId"], { type: 'UNIQUE' }))
},
  down: (queryInterface) => {
    return queryInterface.removeIndex("AuthorBook", ["authorId"])
    .then(() => queryInterface.removeIndex("AuthorBook", ["bookId"])) 
    .then(() => queryInterface.removeIndex("AuthorBook", ["authorId", "bookId"])) 
    .then(() => queryInterface.dropTable('AuthorBook'));
  }
};