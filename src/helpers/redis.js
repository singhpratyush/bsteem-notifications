const redis = require('redis');
const bluebird = require('bluebird');

// https://github.com/NodeRedis/node_redis#bluebird-promises
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient(process.env.REDISCLOUD_URL);

module.exports = client;
