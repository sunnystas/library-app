"use strict";

const db = require("../models");

module.exports.all = async (req, res, next) => {
    try {
        const authors = await db.Author.findAll();
        return res.json({ authors: authors });
    } catch (err) {
        next(err);
    }
}

module.exports.add = async (req, res, next) => {
    try {
        const author = await db.Author.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob
        });
        return res.status(201).json({ author: author });
    } catch (err) {
        next(err);
    }
};

module.exports.del = async (req, res, next) => {
    try {
        await db.Author.destroy({
            where: {
                id: req.body.authorId
            }
        });
        return res.json({ message: "Deleted" });
    } catch (err) {
        next(err);
    }
};
