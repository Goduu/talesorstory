const Tale = require('../../models/tale');
const Comment = require('../../models/comment');
const { transformComment, transformTale } = require('./merge');

module.exports = {
  comments: async () => {
    try {
      const comments = await Comment.find();
      return comments.map(comment => {
        return transformComment(comment);
      });
    } catch (err) {
      throw err;
    }
  },
  commentTale: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const fetchedTale = await Tale.findOne({ _id: args.taleId });
    console.log('commentTale-- fetchedTale', fetchedTale)
    
    const comment = new Comment({
      user: req.userId,
      tale: fetchedTale,
      text: args.text
    });
    const result = await comment.save();
    console.log('commentTale-- fetchedTale res', result)
    fetchedTale.comments.push(result._id)
    await fetchedTale.save();
    return transformComment(result);
  },
  deleteComment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const comment = await Comment.findById(args.commentId).populate('tale');
      const tale = transformTale(comment.tale);
      await Comment.deleteOne({ _id: args.commentId });
      return tale;
    } catch (err) {
      throw err;
    }
  }
};
