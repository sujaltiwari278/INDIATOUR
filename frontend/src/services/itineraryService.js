import api from "./api";

export const createItinerary = async (tripData) => {
  const response = await api.post(
    "/itinerary/create",
    tripData
  );

  return response.data;
};

export const getMyItineraries = async () => {
  const response = await api.get(
    "/itinerary/my"
  );

  return response.data;
};