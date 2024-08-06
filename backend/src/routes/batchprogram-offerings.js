const { Router } = require('express');
const { getBatchProgramOfferings, deleteBatchProgramOfferingTakers } = require('#controllers/batchprogram-offerings-controller.js');

const router = Router();

// GET
router.get('/', getBatchProgramOfferings);

// DELETE
router.delete('/', deleteBatchProgramOfferingTakers);

module.exports = router;
