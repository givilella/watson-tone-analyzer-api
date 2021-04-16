const router = require('express').Router();
const fs = require('fs');
const credentials = JSON.parse(fs.readFileSync('./credentials.json'));

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: `${credentials.apikey}`,
  }),
  serviceUrl: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com',
});

router.post('/analyze', async (req, res) => {
  const toneParams = {
    toneInput: req.body,
    contentType: 'application/json',
    contentLanguage: 'en',
    acceptLanguage: 'pt-br',
  };
  toneAnalyzer
    .tone(toneParams)
    .then((toneAnalysis) => res.json(toneAnalysis.result))
    .catch((err) => res.send(err));
});

module.exports = router;
