const Itinerary = require("../models/Itinerary");

const createItinerary = async (req, res) => {
  try {
    const {
      tripName,
      cities,
      budget,
      startDate,
      endDate,
    } = req.body;

    const itinerary = await Itinerary.create({
      user: req.user.id,
      tripName,
      cities,
      budget,
      startDate,
      endDate,
    });

    res.status(201).json({
      success: true,
      itinerary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: itineraries.length,
      itineraries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createItinerary,
  getMyItineraries,
};