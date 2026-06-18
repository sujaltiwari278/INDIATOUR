import api from "./api";

export const getSafetyAlerts = async (
  city
) => {
  const response = await api.get(
    `/safety/${city}`
  );

  return response.data;
};