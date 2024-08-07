const { Router } = require('express');
const router = Router();

const user = require('./user.js');
const home = require('./home.js');
const batchProgramOfferings = require('./batchprogram-offerings.js');
const courseOfferings = require('./course-offerings.js');
const upload = require('./upload.js');

// router.use('/', user); // Not needed
router.use('/', home);
router.use('/coursepage', batchProgramOfferings);
router.use('/course-offerings', courseOfferings);
router.use('/upload', upload);

module.exports = router;
