const mongoose = require("mongoose");

const safetyAlertSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SafetyAlert",
  safetyAlertSchema
);