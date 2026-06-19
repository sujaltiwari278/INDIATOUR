const axios = require("axios");

const getIndianHolidays = async (year) => {
  try {
    const response = await axios.get(
      "https://calendarific.com/api/v2/holidays",
      {
        params: {
          api_key:
            process.env.CALENDARIFIC_API_KEY,
          country: "IN",
          year,
        },
      }
    );

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