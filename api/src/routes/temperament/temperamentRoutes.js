const { Router } = require('express');
const { getTemperaments } = require('./temperamentControllers');

const router = Router();

router.get('/', getTemperaments);

module.exports = router;