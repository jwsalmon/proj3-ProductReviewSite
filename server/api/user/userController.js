const _ = require('lodash');
const User = require('./userModel');
// const signToken = require('../../auth/auth').signToken;
const { signToken } = require('../../auth/auth');

exports.params = (req, res, next, id) => {
  User.findById(id)
    .select('-password')
    .exec()
    .then((user) => {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, (err) => {
      next(err);
    });
};

exports.get = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.json(users);
    }, (err) => {
      next(err);
    });
};

exports.getOne = (req, res, next) => {
//   const user = req.user;
  const { user } = req;
  res.json(user);
};

exports.put = (req, res, next) => {
//   let user = req.user;
  const { user } = req;

  const update = req.body;

  _.merge(user, update);

  user.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = (req, res, next) => {
  const newUser = new User(req.body);

  newUser.save((err, user) => {
    if (err) {
      return next(err);
    }

    const token = signToken(user._id);
    res.json({ token: token });
  });
};

// Deprication - remove
// exports.delete = (req, res, next) => {
//   req.user.remove((err, removed) => {
//     if (err) {
//       next(err);
//     } else {
//       res.json(removed);
//     }
//   });
// };
exports.delete = (req, res, next) => {
  req.user.deleteOne((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

exports.me = (req, res) => {
  res.json(req.user.toJson());
};
