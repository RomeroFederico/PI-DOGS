const { Router } = require('express');
const multer = require('multer');
const path = require('path')
const { getBreeds, getBreedDetails, createBreed, getBreedsByPage, uploadTemporaryImage } = require('./dogsControllers');
const { PATH_TEMPORARY_IMAGES } = require('../../util/global-constants');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH_TEMPORARY_IMAGES)
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage });

const router = Router();

router.get('/', getBreeds);
router.get('/page/:page', getBreedsByPage);
router.post('/create', createBreed);
router.post('/image/upload', upload.single('file'), uploadTemporaryImage);
router.get('/:idRaza', getBreedDetails);

module.exports = router;