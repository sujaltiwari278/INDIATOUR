const SafetyAlert = require(
  "../models/SafetyAlert"
);

const createSafetyAlert = async (
  req,
  res
) => {
  try {
    const alert = await SafetyAlert.create(
      req.body
    );

    res.status(201).json({
      success: true,
      alert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAlertsByCity = async (
  req,
  res
) => {
  try {
    const alerts =
      await SafetyAlert.find({
        city: req.params.city,
      });

    res.status(200).json({
      success: true,
      alerts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSafetyAlert,
  getAlertsByCity,
};