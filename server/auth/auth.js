const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');

const checkToken = expressJwt({ secret: config.secrets.jwt });
const User = require('../api/user/userModel');

// use when we want to check the incoming requests token.
exports.decodeToken = () => {
  return (req, res, next) => {
    // optional to place token on query string
    // if it is, place it on the headers where it should be
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }

    // this will call next if token is valid and send error if its not. 
    // It will attached the decoded token to req.user
    checkToken(req, res, next);
  };
};

exports.getFreshUser = () => {
  return (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => {
        if (!user) {
          // check if user exists in db
          res.status(401).send('Unauthorized');
        } else {
          // update req.user with fresh user from stale token data
          req.user = user;
          next();
        }
      }, (err) => {
        next(err);
      });
  }
};

// checking signin user password and if exists in db
exports.verifyUser = () => {
  return (req, res, next) => {
    const { username } = req.body;
    const { password } = req.body;

    // if no username or password then send
    if (!username || !password) {
      res.status(400).send('You need a username and password');
      return;
    }

    // look user up in the DB so we can check
    // if the passwords match for the username
    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          res.status(401).send('No user with the given username');
        } else {
          // checking the passowords here
          if (!user.authenticate(password)) {
            res.status(401).send('Wrong password');
          } else {
            // if everything is good, then attach to req.user
            // and call next so the controller can sign a token from the req.user._id
            req.user = user;
            next();
          }
        }
      }, (err) => {
        next(err);
      });
  };
};

// util method to sign tokens on signup
exports.signToken = (id) => {
  return jwt.sign(
    { _id: id },
    config.secrets.jwt,
    { expiresIn: config.expireTime }
  );
};
