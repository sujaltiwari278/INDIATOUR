const Phrase = require("../models/Phrase");

const {
  translate,
} = require("@vitalets/google-translate-api");

const translatePhrase = async (req, res) => {
  try {
    const { english, language } = req.body;

    const phrase = await Phrase.findOne({
      english,
    });

    if (!phrase) {
      return res.status(404).json({
        success: false,
        message: "Phrase not found",
      });
    }

    res.status(200).json({
      success: true,
      translation:
        phrase[language.toLowerCase()],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const translateText = async (req, res) => {
  try {
    const { text, language } = req.body;

    const languageMap = {
      hindi: "hi",
      gujarati: "gu",
      telugu: "te",
      marathi: "mr",
    };

    const targetLanguage =
      languageMap[
        language.toLowerCase()
      ];

    if (!targetLanguage) {
      return res.status(400).json({
        success: false,
        message:
          "Unsupported language",
      });
    }

    const result = await translate(
      text,
      {
        to: targetLanguage,
      }
    );

    res.status(200).json({
      success: true,
      original: text,
      translatedText:
        result.text,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  translatePhrase,
  translateText,
};