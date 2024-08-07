const { Router } = require('express');
const download = require('#src/controllers/download-controller.js');

const router = Router();

router.get('/', download);

module.exports = router;
