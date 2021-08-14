const authResolver = require('./auth');
const talesResolver = require('./tales');
const commentResolver = require('./comment');

const rootResolver = {
  ...authResolver,
  ...talesResolver,
  ...commentResolver
};

module.exports = rootResolver;
