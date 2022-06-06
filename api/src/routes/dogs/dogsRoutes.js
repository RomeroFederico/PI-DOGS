const { Router } = require('express');
const { getBreeds, getBreedDetails, createBreed, getBreedsByPage } = require('./dogsControllers');

const router = Router();

router.get('/', getBreeds);
router.get('/page/:page', getBreedsByPage);
router.post('/create', createBreed);
router.get('/:idRaza', getBreedDetails);

module.exports = router;