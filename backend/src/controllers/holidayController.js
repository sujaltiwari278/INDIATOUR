const {
  getIndianHolidays,
} = require(
  "../services/holidayService"
);

const getHolidays = async (
  req,
  res
) => {
  try {
    const year =
      req.params.year;

    const holidays =
      await getIndianHolidays(
        year
      );

    res.status(200).json({
      success: true,
      holidays,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getHolidays,
};