const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

//Setup options for JWT Strategy
const jwtOptions = {};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  //See if the user ID in the payload exists in our DB, if it does call done with user object, otherwise call done without user object
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
        done(null, false);
    }
  });
});

//Tell passport to use this strategy
