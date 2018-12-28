const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const user_controller = require('../controllers/user.controller');

router.post('/', user_controller.user_create);

router.get('/:id', checkAuth, user_controller.user_details);

router.post('/login', user_controller.user_login);

// router.post('logout', user_controller.user_logout);

module.exports = router;
