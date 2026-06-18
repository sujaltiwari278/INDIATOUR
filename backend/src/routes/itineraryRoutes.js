const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createItinerary,
  getMyItineraries,
} = require("../controllers/itineraryController");

router.post("/create", protect, createItinerary);
router.get("/my", protect, getMyItineraries);

module.exports = router;