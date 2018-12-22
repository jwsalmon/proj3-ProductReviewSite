const Review = require('./reviewModel');
const _ = require('lodash');
const logger = require('../../util/logger');

exports.params = function(req, res, next, id) {
  Review.findById(id)       // checks if id exists in db of that collection
    .populate('author', 'username')   // don't update with password, only username
    .exec()
    .then(function(review) {
      if (!review) {
        next(new Error('No review with that id'));
      } else {
        req.review = review;  // assigns that id review to req.review
        next();         // call next - it is middleware before called routes /:id
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Review.find({})
    .populate('author')
    .exec()
    .then(function(reviews){
      res.json(reviews);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  const review = req.review;
  res.json(review);
};

exports.put = function(req, res, next) {
  let review = req.review;

  const update = req.body;

  _.merge(review, update);

  review.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  const newreview = req.body;
  Review.create(newreview)
    .then(function(review) {
      res.json(review);
    }, function(err) {
      logger.error(err);
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.review.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
