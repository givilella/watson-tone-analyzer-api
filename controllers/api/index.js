const router = require('express').Router();

router.use('/toneanalyzer', require('./watson-tone-analyzer'));

router.use('/translation', require('./google-translation'));

module.exports = router;
