const authResolver = require('./auth');
const talesResolver = require('./tales');
const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver,
  ...talesResolver,
  ...bookingResolver
};

module.exports = rootResolver;
