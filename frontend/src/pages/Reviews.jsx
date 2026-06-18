import { useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

import {
  createReview,
  getReviews,
  getReviewStats,
  deleteReview as deleteReviewApi,
} from "../services/reviewService";
import { cityCoordinates } from "../data/cityCoordinates";

function Reviews() {
  const [place, setPlace] =
    useState("");

  const [search, setSearch] =
  useState("");

const [
  showDropdown,
  setShowDropdown,
] = useState(false);

const cities = Object.keys(
  cityCoordinates
).sort((a, b) =>
  a.localeCompare(b)
);

const filteredCities =
  cities.filter((city) =>
    city
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );

  const [rating, setRating] =
    useState("");

  const [comment, setComment] =
    useState("");

  const [images, setImages] =
    useState([]);

  const [reviews, setReviews] =
    useState([]);

const [stats, setStats] =
  useState(null);

const [
  selectedImage,
  setSelectedImage,
] = useState(null);

const [openMenu, setOpenMenu] =
  useState(null);

  const handleReview =
    async (e) => {
      e.preventDefault();

      try {
        const formData =
          new FormData();

        formData.append(
          "place",
          place
        );

        formData.append(
          "rating",
          rating
        );

        formData.append(
          "comment",
          comment
        );

        images.forEach(
          (image) => {
            formData.append(
              "images",
              image
            );
          }
        );

        await createReview(
          formData
        );

        toast.success(
          "Review Added Successfully"
        );

        setComment("");
        setRating("");
        setImages([]);

        fetchReviews();
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to add review"
        );
      }
    };

  const fetchReviews =
  async () => {

    if (!place.trim()) {
      toast.error(
        "Enter a destination name first"
      );
      return;
    }

    try {

      const reviewData =
        await getReviews(place);

      const statsData =
        await getReviewStats(
          place
        );

      setReviews(
        reviewData.reviews || []
      );

      setStats(
        statsData.stats?.[0] ||
          null
      );

    } catch (error) {

      console.log(
        "Review Error:",
        error
      );

      console.log(
        "Response:",
        error.response?.data
      );

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to load reviews"
      );
    }
  };

  const handleDeleteReview =
  async (reviewId) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this review?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await deleteReviewApi(
        reviewId
      );

      toast.success(
        "Review Deleted Successfully"
      );

      setReviews(
        reviews.filter(
          (review) =>
            review._id !==
            reviewId
        )
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete review"
      );

    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">

        <div className="max-w-7xl mx-auto px-8 py-10">

          <PageHeader
            title="Traveller Reviews"
            subtitle="Share experiences and discover what fellow travelers think."
          />

          <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-xl p-8 mb-8">

            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              Share Your Travel Experience
            </h2>

            <form
              onSubmit={
                handleReview
              }
              className="space-y-4"
            >

              <div className="relative">

  <input
    type="text"
    placeholder="Search Destination..."
    value={search}
    onFocus={() =>
      setShowDropdown(true)
    }
    onChange={(e) => {
      setSearch(
        e.target.value
      );
      setShowDropdown(true);
    }}
    className="w-full border border-slate-300 rounded-xl p-4"
  />

  {showDropdown && (
    <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-lg max-h-72 overflow-y-auto">

      {filteredCities.map(
        (city) => (
          <button
            key={city}
            type="button"
            onClick={() => {
              setPlace(city);
              setSearch(city);
              setShowDropdown(false);
            }}
            className="block w-full text-left px-4 py-3 hover:bg-slate-100 transition"
          >
            {city}
          </button>
        )
      )}

    </div>
  )}

</div>

              <select
                value={rating}
                onChange={(e) =>
                  setRating(
                    e.target.value
                  )
                }
                className="w-full border border-slate-300 rounded-xl p-4"
              >
                <option value="">
                  Select Rating
                </option>

                <option value="5">
                  ★★★★★
                </option>

                <option value="4">
                  ★★★★
                </option>

                <option value="3">
                  ★★★
                </option>

                <option value="2">
                  ★★
                </option>

                <option value="1">
                  ★
                </option>

              </select>

              <textarea
                placeholder="Tell other travelers about your experience..."
                value={comment}
                onChange={(e) =>
                  setComment(
                    e.target.value
                  )
                }
                rows="5"
                className="w-full border border-slate-300 rounded-xl p-4"
              />

              <div>

                <label className="block font-medium mb-2">
                  Upload Photos
                </label>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    setImages(
                      [
                        ...e.target.files,
                      ]
                    )
                  }
                  className="w-full border border-slate-300 rounded-xl p-3"
                />

              </div>

              {images.length >
                0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                  {images.map(
                    (
                      image,
                      index
                    ) => (
                      <img
                        key={
                          index
                        }
                        src={URL.createObjectURL(
                          image
                        )}
                        alt="preview"
                        className="h-28 w-full object-cover rounded-xl"
                      />
                    )
                  )}

                </div>
              )}

              <div className="flex flex-wrap gap-4">

                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Post Review
                </button>

                <button
  type="button"
  onClick={fetchReviews}
  className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
>
  Load Reviews
</button>

              </div>

            </form>

          </div>

          {stats && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">

              <div className="bg-white rounded-3xl shadow-md p-6 text-center">

                <p className="text-slate-500 mb-2">
                  Average Rating
                </p>

                <p className="text-4xl font-bold text-yellow-500">
                  {stats.averageRating?.toFixed(
                    1
                  )}
                </p>

              </div>

              <div className="bg-white rounded-3xl shadow-md p-6 text-center">

                <p className="text-slate-500 mb-2">
                  Total Reviews
                </p>

                <p className="text-4xl font-bold text-blue-600">
                  {
                    stats.totalReviews
                  }
                </p>

              </div>

              <div className="bg-white rounded-3xl shadow-md p-6 text-center">

                <p className="text-slate-500 mb-2">
                  Destination
                </p>

                <p className="text-2xl font-bold text-purple-600">
                  {place}
                </p>

              </div>

            </div>
          )}

          {reviews.length ===
          0 ? (
            <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-xl p-12 text-center">

              <h3 className="text-2xl font-bold mb-2">
                No Reviews Yet
              </h3>

              <p className="text-slate-500">
                Search for a destination
                and be the first traveler
                to share an experience.
              </p>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {reviews.map(
                (review) => (
                  <div
                    key={
                      review._id
                    }
                    className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >

                    <div className="flex items-start justify-between mb-4">

  <div>

    <p className="font-bold text-lg">
      {place}
    </p>

    <p className="text-yellow-500 font-semibold">
      ★ {review.rating}/5
    </p>

  </div>

  <div className="relative">

    <button
      onClick={() =>
        setOpenMenu(
          openMenu === review._id
            ? null
            : review._id
        )
      }
      className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 text-xl"
    >
      ⋮
    </button>

    {openMenu ===
      review._id && (
      <div className="absolute right-0 top-10 bg-white border border-slate-200 rounded-xl shadow-lg w-44 overflow-hidden z-50">

        <button
          onClick={() =>
            toast(
              "Edit Review Coming Soon"
            )
          }
          className="w-full text-left px-4 py-3 hover:bg-slate-50"
        >
          Edit Review
        </button>

        <button
          onClick={() =>
            handleDeleteReview(
              review._id
            )
          }
          className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
        >
          Delete Review
        </button>

      </div>
    )}

  </div>

</div>

<p className="text-slate-700 mb-4">
  {review.comment}
</p>

                    {review.images
                      ?.length >
                      0 && (
                      <div className="grid grid-cols-2 gap-2">

                        {review.images.map(
                          (
                            image,
                            index
                          ) => (
                            <a
  href={`http://localhost:5000${image}`}
  target="_blank"
  rel="noreferrer"
>
  <img
    key={index}
    src={`http://localhost:5000${image}`}
    alt="review"
    className="h-28 w-full object-cover rounded-xl cursor-pointer hover:scale-105 transition"
  />
</a>
                          )
                        )}

                      </div>
                    )}

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>
      {selectedImage && (
  <div
    className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
    onClick={() =>
      setSelectedImage(null)
    }
  >

    <img
      src={selectedImage}
      alt="preview"
      className="max-h-[90vh] max-w-[90vw] rounded-2xl"
    />

  </div>
)}

      <Footer />
    </>
  );
}

export default Reviews;