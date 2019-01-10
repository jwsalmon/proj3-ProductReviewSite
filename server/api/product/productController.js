const request = require('request');
const logger = require('../../util/logger');
const config = require('../../config/config');

exports.get = (req, res, next) => {
  request({
    url: config.shopUrl + config.shopQueryParams,
    method: 'GET'
  }, (err, resp, body) => {
    res.json(JSON.parse(body));
  }, (err) => {
    logger.error(err);
    next(err);
  });
};

exports.getOne = (req, res, next) => {
  const productId = `/${req.params.id}`;
  request({
    url: config.shopUrl + productId + config.shopQueryParams,
    method: 'GET'
  }, (error, response, body) => {
    res.json(JSON.parse(body));
  }, (err) => {
    logger.error(err);
    next(err);
  });
};
