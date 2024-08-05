const { Router } = require('express');
const { getBatchProgramOfferings } = require('#controllers/BatchProgramOfferingsController.js');

const router = Router();

// // GET
router.get('/', getBatchProgramOfferings);

module.exports = router;
