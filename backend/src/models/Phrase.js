const mongoose = require("mongoose");

const phraseSchema = new mongoose.Schema({
  category: String,

  english: String,

  hindi: String,

  gujarati: String,

  telugu: String,

  marathi: String,
});

module.exports = mongoose.model(
  "Phrase",
  phraseSchema
);