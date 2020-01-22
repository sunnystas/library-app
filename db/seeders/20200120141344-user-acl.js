"use strict";

const Promise = require("bluebird");
const Acl = require("acl");
const AclSeq = require("acl-sequelize");
const Sequelize = require("sequelize");
const User = require("../../models").User;
const env = process.env.NODE_ENV || "development";
const dbConfig = require("../config")[env];
const db = new Sequelize(dbConfig);
const aclInstance = new Acl(new AclSeq(db, {prefix: "acl_"}));

module.exports = {
    async up() {
        let newAdmin = await User.create({
            name: "Admin",
            email: "admin@admin.com",
            password: "admin",
            role: "admin"
        });
        await aclInstance.addUserRoles(newAdmin.dataValues.id, newAdmin.dataValues.role);

        let newUser = await User.create({
            name: "User",
            email: "user@user.com",
            password: "user",
            role: "user"
        });
        await aclInstance.addUserRoles(newUser.dataValues.id, newUser.dataValues.role);

        return aclInstance.allow([
            {
                roles: ["user"],
                allows: [
                    {resources: "userArea", permissions: ["access"]},
                    {resources: "userData", permissions: ["manage"]}
                ]
            },
            {
                roles: ["admin"],
                allows: [
                    {resources: "userArea", permissions: ["access"]},
                    {resources: "userData", permissions: ["manage"]},
                    {resources: "adminArea", permissions: ["access"]},
                    {resources: "adminData", permissions: ["manage"]}
                ]
            }
        ]);
    },

    down(queryInterface) {
        return queryInterface.sequelize.transaction(transaction => Promise.each([
            queryInterface.bulkDelete("User", null),
            queryInterface.dropTable("acl_meta", {transaction}),
            queryInterface.dropTable("acl_parents", {transaction}),
            queryInterface.dropTable("acl_permissions", {transaction}),
            queryInterface.dropTable("acl_resources", {transaction}),
            queryInterface.dropTable("acl_roles", {transaction}),
            queryInterface.dropTable("acl_users", {transaction})
        ], result => result));
    }
};
