const jwt = require('jsonwebtoken');
/**
 * handle how to generate user token
 */
exports.generateToken = (email, id) => {
  let token = jwt.sign(
    {
      email: email,
      userId: id
    },
    'secret', //TODO needs put it in a env variables,
    {
      // '1h'
      // (60 * 2) // 2 minutes
      /**
       * TODO
       * Set a reasonable expiration time on tokens
       * Delete the stored token from client side upon log out
       * Have DB of no longer active tokens that still have some time to live
       * Query provided token against The Blacklist on every authorized request
       */
      expiresIn: '1h'
    }
  );
  return token;
}
