const _ = require('lodash');

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3001,
  // 10 days in minutes
  expireTime: '10d',
  // cexpireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  },
  shopUrl: 'https://api.shop.com/AffiliatePublisherNetwork/v1/products',
  shopQueryParams: '?publisherID=TEST&locale=en_US&perPage=15&apikey=l7xx7b8fbbd51f7f4965ab8b3a55d2469d4b'
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;
try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}

module.exports = _.merge(config, envConfig);
