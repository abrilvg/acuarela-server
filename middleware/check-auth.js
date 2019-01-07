const jwt = require('jsonwebtoken');

/**
 * Check authentification
 */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //TODO secret saves in an env variables and inprove it
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: 'jwt expired, please loggin again'
        });
      } else {
        res.userData = decoded; //do we need that information?, yes now we are using when re generating tokens each request
        next();
      }
    });
  } catch (err) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};
