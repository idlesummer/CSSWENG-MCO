const { Router } = require('express');
const { getBatchLists } = require('#controllers/HomeController.js');

const router = Router();

// GET
router.get('/', getBatchLists);

module.exports = router;
