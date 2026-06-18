const express = require("express");

const router = express.Router();

const {
  translatePhrase,
  translateText,
} = require(
  "../controllers/translatorController"
);
router.post(
  "/translate",
  translatePhrase
);
router.post(
  "/real",
  translateText
);

module.exports = router;