"use strict";

const Acl = require("acl");
const AclSeq = require("acl-sequelize");
const sequelize = require("../models").sequelize;

module.exports = new Acl(new AclSeq(sequelize, {prefix: "acl_"}));
