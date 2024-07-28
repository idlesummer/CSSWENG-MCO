const { Router } = require('express');
const router = Router();

const home = require('./home.js');
const offerings = require('./offerings.js');

router.use(home);
router.use('/offerings', offerings);

module.exports = router;
