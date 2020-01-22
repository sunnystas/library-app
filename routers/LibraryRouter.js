"use strict";

const router = require("express").Router({ mergeParams: true });
const Auth = require("../base/AclMiddleware").auth;
const BookController = require("../controllers/BookController");
const AuthorController = require("../controllers/AuthorController");


/* user level functionalities. Available for Admin */
router.get("/api/books", Auth("userArea", "access"), BookController.availToTake);
router.get("/api/books/taken", Auth("userArea", "access"), BookController.taken);
router.post("/api/book/take", Auth("userData", "manage"), BookController.take);
router.post("/api/book/return", Auth("userData", "manage"), BookController.ret);

/* admin level functionalities. Available ONLY for Admin */
router.get("/api/authors", Auth("adminData", "manage"), AuthorController.all);
router.post("/api/author", Auth("adminData", "manage"), AuthorController.add);
router.delete("/api/author", Auth("adminData", "manage"), AuthorController.del);
router.post("/api/book", Auth("adminData", "manage"), BookController.add);
router.delete("/api/book", Auth("adminData", "manage"), BookController.del);

module.exports = router;
