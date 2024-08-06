const { Router } = require('express');
const { getBatchLists } = require('#src/controllers/home-controller.js');

const router = Router();

// GET
router.get('/', getBatchLists);

module.exports = router;
