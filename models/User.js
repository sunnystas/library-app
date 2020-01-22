'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    pic: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false,
    hooks: {
      beforeCreate: async user => {
        try {
          user.password = await bcrypt.hash(user.password, 10);
        } catch (err) {
          console.log(err);
        }
      },
      beforeBulkUpdate: async user => {
        try {
          user.attributes.password = await bcrypt.hash(user.attributes.password, 10);
        } catch (err) {
          console.log(err);
        }
      }
    },
  });

  User.prototype.matchPassword = async function(pass) {
    try {
      return await bcrypt.compare(pass, this.password);
    } catch (err) {
      return false;
    }
  };

  return User;
};
