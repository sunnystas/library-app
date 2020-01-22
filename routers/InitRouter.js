"use strict";

const Router = require("express").Router({ mergeParams: true });
const glob = require('glob');

module.exports = () => glob
    .sync('**/*.js', { cwd: `${__dirname}/` })
    .map(filename => require(`./${filename}`))
    .filter(router => Object.getPrototypeOf(router) === Object.getPrototypeOf(Router))
    .reduce((rootRouter, router) => rootRouter.use(router), Router);
