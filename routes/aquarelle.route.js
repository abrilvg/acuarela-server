const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const aquarelle_controller = require('../controllers/aquarelles.controller');

router.get('/', aquarelle_controller.aquarelle_all);

//TODO review if this endpoint is fine
router.get('/user/:id', checkAuth, aquarelle_controller.aquarelle_all_from);

router.post('/', checkAuth, aquarelle_controller.aquarelle_create);

router.get('/:id', aquarelle_controller.aquarelle_details);

//route protected with authentification token, apply to routes
router.put('/:id', checkAuth, aquarelle_controller.aquarelle_update);

router.delete('/:id', checkAuth, aquarelle_controller.aquarelle_delete);

module.exports = router;
