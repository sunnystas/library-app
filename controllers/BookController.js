"use strict";

const db = require("../models");
const { ErrorHandler } = require('../helpers/Error');

module.exports.availToTake = async (req, res, next) => {
    try {
        const books = await db.Book.getAvailable(req.user);
        return res.json({
            books: books
        });
    } catch (err) {
        next(err);
    }
};

module.exports.taken = async (req, res, next) => {
    try {
        const books = await db.Book.getTakenBooks(req.user);
        return res.json({
            books: books
        });
    } catch (err) {
        next(err);
    }
}

module.exports.take = async (req, res, next) => {
    try {
        const takenBooks = await db.Book.getTakenBooks(req.user);
        if (takenBooks.length < 5) {
            await db.UserBook.create({
                userId: req.user.id, 
                bookId: req.body.bookId
            });
            return res.json({ message: "Approved" });
        }
        throw new ErrorHandler(403, "Forbidden: you can take up to 5 books at a time");
    } catch (err) {
        next(err);
    }
}

module.exports.ret = async (req, res, next) => {
    try {
        await db.UserBook.destroy({
            where: {
                userId: req.user.id, 
                bookId: req.body.bookId
            }
        });
        return res.json({ message: "Returned" });
    } catch (err) {
        next(err);
    }
}

module.exports.add = async (req, res, next) => {
    try {
        const { name, quantity, releasedAt, authorIds } = req.body;
        if (!name || !authorIds) {
            throw new ErrorHandler(400, "Book name and authors are required");
        }
        let bookAuthors = [];
        const book = await db.Book.create({ name, quantity, releasedAt });
        if (!authorIds.isArray && !isNaN(+authorIds)) {
            bookAuthors.push({ bookId: +book.id, authorId: +authorIds });
        } else {
            authorIds.forEach(authorId => bookAuthors.push({ bookId: +book.id, authorId: +authorId }));
        }
        await db.AuthorBook.bulkCreate(bookAuthors);
        return res.status(201).json({ book: book });
    } catch (err) {
        next(err);
    }
};

module.exports.del = async (req, res, next) => {
    const { bookId } = req.body;
    try {
        await db.Book.destroy({
            where: {
                id: bookId
            }
        });
        await db.AuthorBook.destroy({
            where: {
                bookId: bookId
            }
        });
        return res.json({ message: "Deleted" });
    } catch (err) {
        next(err);
    }
};
