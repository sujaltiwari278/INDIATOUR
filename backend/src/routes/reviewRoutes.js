const express = require("express");

const router =
  express.Router();

const protect =
  require("../middleware/authMiddleware");

const upload =
  require("../middleware/uploadMiddleware");

const {
  createReview,
  getReviewsByPlace,
  getPlaceStats,
  deleteReview,
  getTotalReviews,
} = require(
  "../controllers/reviewController"
);

router.post(
  "/create",
  protect,
  upload.array(
    "images",
    5
  ),
  createReview
);

router.get(
  "/count/all",
  getTotalReviews
);

router.get(
  "/stats/:place",
  getPlaceStats
);

router.get(
  "/:place",
  getReviewsByPlace
);

module.exports = router;

router.delete(
  "/:id",
  protect,
  deleteReview
);