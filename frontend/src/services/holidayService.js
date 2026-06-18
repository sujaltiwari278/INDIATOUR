import api from "./api";

export const getHolidays = async (
  year
) => {
  const response = await api.get(
    `/holidays/${year}`
  );

  return response.data;
};