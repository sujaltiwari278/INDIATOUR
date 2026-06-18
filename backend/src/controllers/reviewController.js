const Review = require("../models/Review");

const createReview = async (
  req,
  res
) => {
  try {
    const {
      place,
      rating,
      comment,
    } = req.body;

    const images =
      req.files?.map(
        (file) =>
          `/uploads/reviews/${file.filename}`
      ) || [];

    const review =
      await Review.create({
        user: req.user.id,
        place,
        rating,
        comment,
        images,
      });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

const getReviewsByPlace =
  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          place:
            req.params.place,
        });

      res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

const getPlaceStats =
  async (req, res) => {
    try {
      const stats =
        await Review.aggregate([
          {
            $match: {
              place:
                req.params
                  .place,
            },
          },
          {
            $group: {
              _id: "$place",

              averageRating:
                {
                  $avg:
                    "$rating",
                },

              totalReviews:
                {
                  $sum: 1,
                },
            },
          },
        ]);

      res.status(200).json({
        success: true,
        stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

const deleteReview = async (
  req,
  res
) => {
  try {

    const review =
      await Review.findById(
        req.params.id
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message:
          "Review not found",
      });
    }

    await Review.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Review deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};

const getTotalReviews =
  async (req, res) => {
    try {

      const totalReviews =
        await Review.countDocuments();

      res.status(200).json({
        success: true,
        totalReviews,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

module.exports = {
  createReview,
  getReviewsByPlace,
  getPlaceStats,
  deleteReview,
  getTotalReviews,
};