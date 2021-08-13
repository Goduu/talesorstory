const Tale = require('../../models/tale');
const Booking = require('../../models/booking');
const { transformBooking, transformTale } = require('./merge');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const bookings = await Booking.find({user: req.userId});
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookTale: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const fetchedTale = await Tale.findOne({ _id: args.taleId });
    const booking = new Booking({
      user: req.userId,
      tale: fetchedTale
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate('tale');
      const tale = transformTale(booking.tale);
      await Booking.deleteOne({ _id: args.bookingId });
      return tale;
    } catch (err) {
      throw err;
    }
  }
};
