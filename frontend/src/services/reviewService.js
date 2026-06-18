import api from "./api";

export const createReview =
  async (formData) => {
    const response =
      await api.post(
        "/reviews/create",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export const getReviews =
  async (place) => {
    const response =
      await api.get(
        `/reviews/${place}`
      );

    return response.data;
  };

export const getReviewStats =
  async (place) => {
    const response =
      await api.get(
        `/reviews/stats/${place}`
      );

    return response.data;
  };

  export const deleteReview =
  async (id) => {

    const response =
      await api.delete(
        `/reviews/${id}`
      );

    return response.data;
  };

  export const getTotalReviews =
  async () => {

    const response =
      await api.get(
        "/reviews/count/all"
      );

    return response.data;
  };