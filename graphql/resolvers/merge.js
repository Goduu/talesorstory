const DataLoader = require('dataloader');

const Tale = require('../../models/tale');
const User = require('../../models/user');
const Comment = require('../../models/comment');
const { dateToString } = require('../../helpers/date');

const taleLoader = new DataLoader(taleIds => {
  return tales(taleIds);
});

const userLoader = new DataLoader(userIds => {
  console.log("User loaders", userIds, typeof userIds)
  return User.find({ _id: { $in: userIds } });
});

const commentLoader = new DataLoader(commentIds => {
  console.log("comment loaders", commentIds.filter(c => c !== ''), typeof commentIds)
  return Comment.find({ _id: { $in: ["6116827528f0534260909e6b"] } });
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
  console.log("user iD", userId)
  try {
    const user = await userLoader.load(userId.toString());
    console.log("User final", user)
    return {
      ...user._doc,
      _id: user.id,
      createdTales: () => taleLoader.loadMany(user._doc.createdTales)
    };
  } catch (err) {
    throw err;
  }
};

const comment = async commentIds => {
  console.log("comments iD", commentIds)
  try {
    const comment = await commentLoader.load(commentIds.toString());
    console.log("Comments final",comment)
    return {
      ...comment._doc,
      _id: comment.id,
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
    creator: user.bind(this, tale.creator),
    comments: comment.bind(this, tale.comments)
  };
};

const transformComment = comment => {
  return {
    ...comment._doc,
    _id: comment.id,
    user: user.bind(this, comment._doc.user),
    tale: singleTale.bind(this, comment._doc.tale),
    createdAt: dateToString(comment._doc.createdAt),
    updatedAt: dateToString(comment._doc.updatedAt),
    text: comment.text
  };
};

exports.transformTale = transformTale;
exports.transformComment = transformComment;

// exports.user = user;
// exports.tales = tales;
// exports.singleTale = singleTale;
