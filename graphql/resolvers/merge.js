const DataLoader = require('dataloader');

const Tale = require('../../models/tale');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const taleLoader = new DataLoader(taleIds => {
  return tales(taleIds);
});

const userLoader = new DataLoader(userIds => {
  return User.find({ _id: { $in: userIds } });
});

const tales = async taleIds => {
  try {
    const tales = await Tale.find({ _id: { $in: taleIds } });
    tales.sort((a, b) => {
      return (
        taleIds.indexOf(a._id.toString()) - taleIds.indexOf(b._id.toString())
      );
    });
    return tales.map(tale => {
      return transformTale(tale);
    });
  } catch (err) {
    throw err;
  }
};

const singleTale = async taleId => {
  try {
    const tale = await taleLoader.load(taleId.toString());
    return tale;
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id,
      createdTales: () => taleLoader.loadMany(user._doc.createdTales)
    };
  } catch (err) {
    throw err;
  }
};

const transformTale = tale => {
  return {
    ...tale._doc,
    _id: tale.id,
    date: dateToString(tale._doc.date),
    creator: user.bind(this, tale.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    tale: singleTale.bind(this, booking._doc.tale),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

exports.transformTale = transformTale;
exports.transformBooking = transformBooking;

// exports.user = user;
// exports.tales = tales;
// exports.singleTale = singleTale;
