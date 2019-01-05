const _ = require('lodash');
const Review = require('./reviewModel');
const logger = require('../../util/logger');

exports.params = (req, res, next, id) => {
  Review.findById(id)
    .populate('author', 'username')
    .exec()
    .then((review) => {
      if (!review) {
        next(new Error('No review with that id'));
      } else {
        req.review = review;
        next();
      }
    }, (err) => {
      next(err);
    });
};

exports.get = (req, res, next) => {
  Review.find({})
    .populate('author')
    .exec()
    .then((reviews) => {
      res.json(reviews);
    }, (err) => {
      next(err);
    });
};

exports.getOne = (req, res, next) => {
  const { review } = req;
  res.json(review);
};

exports.put = (req, res, next) => {
  const { review } = req;

  const update = req.body;

  _.merge(review, update);

  review.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = (req, res, next) => {
  const newreview = req.body;
  Review.create(newreview)
    .then((review) => {
      res.json(review);
    }, (err) => {
      logger.error(err);
      next(err);
    });
};

exports.delete = (req, res, next) => {
  req.review.deleteOne((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
