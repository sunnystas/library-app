"use strict";

const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const passport = require("passport");
const aclInstance = require("./AclInstance");

module.exports.auth = function(resource, permission) {
    let jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = process.env.JWT_SECRET;
    let authStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
        let allowed = false, userRoles = [];
        try {
            allowed = await aclInstance.isAllowed(jwtPayload.id, resource, permission);
            if (allowed) {
                userRoles = await aclInstance.userRoles(jwtPayload.id);
                return next(null, {
                    id: jwtPayload.id,
                    role: userRoles[0]
                });
            }
        } catch (err) {
            return next(err);
        }
        return next(null, allowed);
    });

    return passport.authenticate(authStrategy, {session: false});
};

