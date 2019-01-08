const router = require('express').Router();
const controller = require('./reviewController');
const auth = require('../../auth/auth');

router.route('/')
  .get(controller.get)
  .post([
    auth.decodeToken(),
    auth.getFreshUser()
  ], controller.post);

router.route('/:id')
  .get(controller.findReviews);

module.exports = router;
