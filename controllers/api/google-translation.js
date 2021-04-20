const router = require('express').Router();
const {
  detectLanguage,
  translateText,
} = require('../../middlewares/google-translation');

const TARGET_LANGUAGE = 'en';

router.post('/translate', async (req, res) => {
  try {
    const text = req.body.text;
    /* const detectedLanguage = await detectLanguage(text); */

    const translatedText = await translateText(text, TARGET_LANGUAGE);
    if (translatedText)
      return res.json({
        translatedText,
      });
  } catch (error) {
    res.status(502).send(error);
  }
});

module.exports = router;
