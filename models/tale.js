const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
});

module.exports = mongoose.model('Tale', taleSchema);
