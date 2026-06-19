const axios = require("axios");

const getIndianHolidays = async (year) => {
  try {
    const response = await axios.get(
  "https://api.api-ninjas.com/v1/holidays",
  {
    params: {
      country: "IN",
      year,
    },
    headers: {
      "X-Api-Key":
        process.env.API_NINJAS_KEY,
    },
  }
);

return response.data;

    return response.data.response.holidays;
  } catch (error) {
  console.log(
    error.response?.data ||
    error.message
  );

  throw new Error(
    error.response?.data?.meta?.error_detail ||
    error.message
  );
}
};

module.exports = {
  getIndianHolidays,
};