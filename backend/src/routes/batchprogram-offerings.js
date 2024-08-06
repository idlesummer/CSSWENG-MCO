const { Router } = require('express');
const { getBatchProgramOfferings } = require('#controllers/batchprogram-offerings-controller.js');

const router = Router();

// // GET
router.get('/', getBatchProgramOfferings);

module.exports = router;
