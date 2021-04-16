const router = require('express').Router();

router.use('/docly', require('./clients/docly'));

module.exports = router;