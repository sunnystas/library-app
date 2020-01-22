"use strict";

const router = require("express").Router({ mergeParams: true });
const AuthController = require("../controllers/AuthController");


router.post("/api/auth/signup", AuthController.signup);
router.post("/api/auth/login", AuthController.login);

module.exports = router;
