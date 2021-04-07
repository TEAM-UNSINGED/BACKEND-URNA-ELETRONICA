const { Router } = require('express');

const router = Router();
const voterController = require('../presentation/controllers/voterController');
const candidateController = require('../presentation/controllers/candidateController');


router.get('/', (_req, res) => res.send({ message: 'api running' }));

//VOTER ROUTES
router.post('/voter',voterController.store);

router.get('/validate',voterController.getCpf);

//Candidate routes
router.post('/candidate',candidateController.store);
router.get('/candidate',candidateController.show);
router.get('/list',candidateController.index);
router.post('/vote',candidateController.vote);
router.get('/result',candidateController.result);



module.exports = router;