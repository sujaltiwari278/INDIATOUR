const express = require("express");

const router = express.Router();

const {
  createSafetyAlert,
  getAlertsByCity,
} = require(
  "../controllers/safetyController"
);

router.post(
  "/create",
  createSafetyAlert
);

router.get(
  "/:city",
  getAlertsByCity
);

module.exports = router;