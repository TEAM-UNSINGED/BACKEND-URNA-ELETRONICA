const { Router } = require('express');

const router = Router();
const voterController = require('../presentation/controllers/voterController');

router.get('/', (_req, res) => res.send({ message: 'api running' }));

//VOTER ROUTES
router.post('/voter',voterController.store);

module.exports = router;