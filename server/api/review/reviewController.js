const _ = require('lodash');
const Review = require('./reviewModel');
const logger = require('../../util/logger');

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

exports.findReviews = (req, res, next) => {
  Review.find({ productId: req.params.id })
    .exec()
    .then((reviews) => {
      res.json(reviews);
    }, (err) => {
      logger.error(err);
      next(err);
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
