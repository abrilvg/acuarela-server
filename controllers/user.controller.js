const User = require('../models/user.model');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

exports.user_create = (req, res, next) => {

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length) {
        return res.status(409).json({
          message: 'Mail exists'
        });
      } else {
        const user = new User({
          birthDate: req.body.birthDate,
          country: req.body.country,
          description: req.body.description,
          email: req.body.email,
          userName: req.body.userName,
          name: req.body.name,
          password: passwordHash.generate(req.body.password),
          phoneNumber: req.body.phoneNumber
        });

        user.save()
          .then(userCreated => {
            const token = jwt.sign(
              {
                email: userCreated.email,
                userId: userCreated._id
              },
              'secret', //TODO needs put it in a env variables,
              {
                // expiresIn: '12000' //2 minutes
                expiresIn: '1h'
              }
            );

            res
              .status(201)
              .json({
                message: 'User created',
                token: token,
                data: {
                  name: userCreated.name,
                  email: userCreated.email,
                  country: userCreated.country,
                  birthDate: userCreated.birthDate,
                  userName: userCreated.userName,
                  _id: userCreated._id
                }
              });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              message: `Error when save user in DB ${err}`
            });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: `Error when check if user exists ${err}`
      });
    });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(users => {
      if (!users.length) {
        console.log('user doesnt exists');
        return res.status(404).json({
          message: 'Mail not found, user doesn\'t exists'
        });
      }
      let user = users[0];
      let matchPassword = passwordHash.verify(req.body.password, user.password);
      if (matchPassword) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id
          },
          'secret', //TODO needs put it in a env variables,
          {
            // expiresIn: '12000' //2 minutes
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
        res.status(200).json({
          message: 'User successfully logged in',
          token: token,
          data: {
            name: user.name,
            email: user.email,
            country: user.country,
            birthDate: user.birthDate,
            userName: user.userName,
            _id: user._id
          }
        });
      } else {
        res.status(401).json({
          message: 'Unauthorized user, incorrect credentials, please review credentials'
        });
        //here need to send error to server
      }
    })
    .catch(err => {
      console.log('error when trying to login', err);
      res.status(500).json({
        message: `error when trying to login. ${err}`
      });
    });
};

exports.user_logout = (req, res, next) => {
  //here the blacklist because we can not deleted tokens
};


//TODO user update info

//TODO user delete

exports.user_details = (req, res, next) => {
  //get only certain fields
  User.find({ _id: req.params.id }, 'birthDate country description email lastname name phoneNumber')
    .exec()
    .then(users => {
      if (users.length) {
        res.status(200).json({
          message: 'Get user successfully',
          user: users[0]
        });
      } else {
        console.log(`error user with email ${req.body.email} was not found`, err);
        res.status(500).json({
          message: `error user with email ${req.body.email} was not found. ${err}`
        });
      }
    })
    .catch(err => {
      console.log(`error when trying to get user with email ${req.body.email}`, err);
      res.status(500).json({
        message: `error when trying to get user with email ${req.body.email}. ${err}`
      });
    });
};
