const { Router } = require('express');

const router = Router();




router
	.get('/', (_req, res) => res.send({ message: 'api running' }))

	

module.exports = router;