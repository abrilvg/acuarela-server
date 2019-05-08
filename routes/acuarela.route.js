const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const acuarela_controller = require('../controllers/acuarelas.controller');

router.get('/', checkAuth, acuarela_controller.acuarela_all);

//TODO review if this endpoint is fine
router.get('/user/:id', checkAuth, acuarela_controller.acuarela_all_from);

router.post('/', checkAuth, acuarela_controller.acuarela_create);

router.get('/:id', checkAuth, acuarela_controller.acuarela_details);

//route protected with authentification token, apply to routes
router.put('/:id', checkAuth, acuarela_controller.acuarela_update);

router.delete('/:id', checkAuth, acuarela_controller.acuarela_delete);

module.exports = router;
