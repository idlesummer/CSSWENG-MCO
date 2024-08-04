const { Router } = require('express');
const router = Router();

const home = require('./home.js');
const courseOfferings = require('./course-offerings.js');

router.use(home);
router.use('/course-offerings', courseOfferings);

module.exports = router;
