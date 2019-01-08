const router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/reviews', require('./review/reviewRoutes'));
router.use('/products', require('./product/productRoutes'));

module.exports = router;
