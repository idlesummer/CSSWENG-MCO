const { Router } = require('express');

const router = Router();

const home = require('./home.js');
// const home = require
// const offerings = 



router.use(home);

module.exports = router;
