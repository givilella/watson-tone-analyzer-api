const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const credentials = JSON.parse(fs.readFileSync('./credentials.json'));

router.use((req, res, next) => {
  req.credentials = credentials;
  return next();
});

router.post('/test', async (req, res, next) => {
  return res.json(req.body);
});

module.exports = router;
