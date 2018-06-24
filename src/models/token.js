const mongoose = require('mongoose');
const redis = require('../helpers/redis');
const { Schema } = mongoose;

const tokenSchema = new Schema({
  created_at: { type: Date, default: Date.now },
  owner: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
});

// Redis operation hooks (http://mongoosejs.com/docs/middleware.html)
tokenSchema.post('save', doc => redis.rpush(`TOKEN:${doc.owner}`, doc.value));
tokenSchema.post('remove', doc => redis.lrem(`TOKEN:${doc.owner}`, 1, doc.value));

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
