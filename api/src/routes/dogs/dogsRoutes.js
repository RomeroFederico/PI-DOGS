const { Router } = require('express');
const { getBreeds, getBreedDetails, createBreed, getBreedsByPage } = require('./dogsControllers');

const router = Router();

router.get('/', getBreeds);
router.get('/page/:page', getBreedsByPage);
router.get('/create', createBreed);
router.get('/:idRaza', getBreedDetails);
//router.post('/create', createBreed);

module.exports = router;