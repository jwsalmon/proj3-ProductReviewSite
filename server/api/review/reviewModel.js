const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  text: {
    type: String,
    required: true
  },

  author: { type: Schema.Types.ObjectId, ref: 'user' }
});

module.exports = mongoose.model('review', ReviewSchema);
