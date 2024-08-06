const { Router } = require('express');
const { 
  getBatchProgramOfferings, 
  getScheduleConflicts,
  deleteBatchProgramOfferingTakers
 } = require('#controllers/batchprogram-offerings-controller.js');

const router = Router();

// GET
router.get('/', getBatchProgramOfferings);
router.get('/find-conflicts', getScheduleConflicts);

// DELETE
router.delete('/', deleteBatchProgramOfferingTakers);

module.exports = router;
