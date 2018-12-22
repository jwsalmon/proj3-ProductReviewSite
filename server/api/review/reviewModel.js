var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  text: {
    type: String,
    required: true
  },

  author: {type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('review', ReviewSchema);
