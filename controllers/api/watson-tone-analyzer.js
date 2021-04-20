const router = require('express').Router();
const credentials = JSON.parse(process.env.WATSON_TONE_ANALYZER_CREDENTIALS);

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: `${credentials.apikey}`,
  }),
  serviceUrl: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com',
});

const {
  detectLanguage,
  translateText,
} = require('../middlewares/google-translation');

router.post('/analyze', async (req, res) => {
  let text = req.body.text;
  if (req.query.translate == 'true') {
    const detectedLanguage = await detectLanguage(text);
    if (detectedLanguage !== 'en') {
      console.log('Eu estou traduzindo!');
      text = await translateText(text);
    }
  }

  const toneParams = {
    toneInput: { text },
    contentType: 'application/json',
    contentLanguage: 'en',
    acceptLanguage: 'pt-br',
  };
  toneAnalyzer
    .tone(toneParams)
    .then((toneAnalysis) =>
      res.json({
        ...toneAnalysis.result,
        inputText: req.body.text,
        translatedInput: text,
      })
    )
    .catch((err) => res.send(err));
});

module.exports = router;
