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
  (req, res, next) => {
    upload.array("images", 5)(
      req,
      res,
      (err) => {
        if (err) {
          console.error(
            "MULTER ERROR FULL:",
            err
          );

          console.error(
            "MULTER MESSAGE:",
            err?.message
          );

          console.error(
            "MULTER STACK:",
            err?.stack
          );

          return res.status(500).json({
            success: false,
            message:
              err?.message ||
              "Upload failed",
          });
        }

        next();
      }
    );
  },
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