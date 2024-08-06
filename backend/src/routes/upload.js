const { Router } = require('express');

const { createCourseOfferings } = require('#src/controllers/upload-controller.js');
const upload = require('#middleware/upload.js');

const router = Router();

// POST
router.post('/', upload.single('file'), createCourseOfferings);

module.exports = router;
