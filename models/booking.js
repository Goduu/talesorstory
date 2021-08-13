const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    tale: {
      type: Schema.Types.ObjectId,
      ref: 'Tale'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
