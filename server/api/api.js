const router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/reviews', require('./review/reviewRoutes'));

module.exports = router;
