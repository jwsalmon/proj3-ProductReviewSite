const router = require('express').Router();
const controller = require('./productController');

router.route('/')
  .get(controller.get);

router.route('/:id')
  .get(controller.getOne);

module.exports = router;
