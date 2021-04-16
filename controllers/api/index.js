const router = require('express').Router();

router.use('/toneanalyzer', require('./watson-tone-analyzer'));

module.exports = router;