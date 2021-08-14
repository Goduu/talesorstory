const Tale = require('../../models/tale');
const User = require('../../models/user');

const { transformTale } = require('./merge');

module.exports = {
  tales: async () => {
    try {
      const tales = await Tale.find();
      console.log("tales sonic", tales)
      return tales.map(tale => {
        return transformTale(tale);
      });
    } catch (err) {
      throw err;
    }
  },
  createTale: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const tale = new Tale({
      title: args.taleInput.title,
      text: args.taleInput.text,
      date: new Date(),
      creator: req.userId,
      comments: []
    });
    let createdTale;
    try {
      const result = await tale.save();
      createdTale = transformTale(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdTales.push(tale);
      await creator.save();

      return createdTale;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
