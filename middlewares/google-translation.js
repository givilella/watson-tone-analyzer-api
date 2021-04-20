const { Translate } = require('@google-cloud/translate').v2;
const credentials = JSON.parse(process.env.GOOGLE_TRANSLATION_CREDENTIALS);
const DEFAULT_TARGET_LANGUAGE = 'en';

const translate = new Translate({
  credentials,
  projectId: credentials.project_id,
});

const detectLanguage = async (text) => {
  try {
    let response = await translate.detect(text);
    return response[0].language;
  } catch (error) {
    console.log(`Error at detectLanguage --> ${error}`);
    return 0;
  }
};

const translateText = async (text, targetLanguage) => {
  const selectedTargetLanguasge = targetLanguage || DEFAULT_TARGET_LANGUAGE;
  try {
    let [response] = await translate.translate(text, selectedTargetLanguasge);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
  }
};

module.exports = {
  detectLanguage,
  translateText,
};
