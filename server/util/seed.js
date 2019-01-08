var User = require('../api/user/userModel');
var Review = require('../api/review/reviewModel');
var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding the Database');

var users = [
  {username: 'Jaime', password: 'test'},
  {username: 'Jesse', password: 'test'},
  {username: 'Matt', password: 'test'}
];

var reviews = [
  {text: 'This is an amazing product.', productId: 1610313959},
  {text: 'This product sucks'},
  {text: 'Whatever', productId: 1610313959}
];

var createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

var cleanDB = function() {
  logger.log('... cleaning the DB');
  var cleanPromises = [User, Review]
    .map(function(model) {
      return model.deleteMany().exec();
    });
  return Promise.all(cleanPromises);
}

var createUsers = function(data) {

  var promises = users.map(function(user) {
    return createDoc(User, user);
  });

  return Promise.all(promises)
    .then(function(users) {
      return _.merge({users: users}, data || {});
    });
};

var createReviews = function(data) {
  var newReviews = reviews.map(function(review, i) {
    review.author = data.users[i]._id;
    return createDoc(Review, review);
  });

  return Promise.all(newReviews)
    .then(function(savedReviews) {
      return Promise.all(savedReviews.map(function(review, i){
      }));
    })
    .then(function() {
      return 'Seeded DB with 3 Reviews, 3 Users';
    });
};

cleanDB()
  .then(createUsers)
  .then(createReviews)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
