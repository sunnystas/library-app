"use strict";

const User = require("../models").User;
const randomString = require("randomstring");
const jwt = require("jsonwebtoken");
const roles = require("../base/Roles");
const aclInstance = require("../base/AclInstance");
const { ErrorHandler } = require('../helpers/Error');
const logger = require("../helpers/Winston");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});


module.exports.signup = async (req, res, next) => {
    try {
        let {email, password, confirmPassword, role} = req.body;
        if (!email || !password || !confirmPassword) {
            throw new ErrorHandler(400, "User data set is not full: email or password are missing");
        }
        if (password !== confirmPassword) {
            throw new ErrorHandler(400, "Password mismatch");
        }
        role = Object.values(roles).includes(role) ? role : roles.USER;

        const user = await User
            .findOrCreate({
                where: {
                    email: email
                },
                defaults: {
                    password: password,
                    role: role
                }
            });
        let newUser = user[0];
        await aclInstance.addUserRoles(newUser.id, role);

        let mail = await transporter.sendMail({
            from: `Administrator ${process.env.MAIL_FROM}`,
            to: newUser.email,
            subject: 'You have successfully signed up to the system',
            text: "Congrats!",
            html: "Congrats!"
        });
        logger.info(`Sign up message to ${newUser.role} ${newUser.email} has been sent. Message ID: ${mail.messageId}`);

        return res.status(201).json({ newUser, message: "account created successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        let user;
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ErrorHandler(400, "Missing login or password");
        }
        user = await User.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new ErrorHandler(400, "Invalid login or password");
        }
        if (!await user.matchPassword(password)) {
            throw new ErrorHandler(400, "Invalid login or password");
        }
        let payload = {id: user.id};
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        return res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            token: token
        });
    } catch (err) {
        next(err);
    }
};

module.exports.resetPassword = async (req, res, next) => {
    try {
        let email = req.body.email;
        if (!email) {
            throw new ErrorHandler(400, "Email is missing");
        }
        let newPass = randomString.generate(8);
        let result = {};
        result.status = 200;
        await User.update(
            {password: newPass},
            {where: {email: email}}
        );
        result.result = {
            email: email,
            password: newPass
        };

        let mail = await transporter.sendMail({
            from: `Administrator ${process.env.MAIL_FROM}`,
            to: email,
            subject: 'Password reset in the system',
            text: `Your new password: ${newPass}`,
            html: `Your new password: ${newPass}`
        });
        logger.info(`New password has been sent to ${email}. Message ID: ${mail.messageId}`);

        return res.json(result);
    } catch (err) {
        next(err);
    }
};
