const User = require('../models/user.model');
const passwordHash = require('password-hash');
const UserHelper = require('./userHelper');

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
            res
              .status(201)
              .json({
                message: 'User created',
                token: UserHelper.generateToken(userCreated.email, userCreated._id), //TODO dont forget check some es6 rules
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
        res.status(200).json({
          message: 'User successfully logged in',
          token: UserHelper.generateToken(user.email, user._id),
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
//TODO missing send new token, every request needs to return new token always
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
