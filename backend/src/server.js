const express =
  require("express");

const cors =
  require("cors");

const dotenv =
  require("dotenv");

const path =
  require("path");

const authRoutes =
  require("./routes/authRoutes");

const connectDB =
  require("./config/db");

const protect =
  require("./middleware/authMiddleware");

const itineraryRoutes =
  require("./routes/itineraryRoutes");

const reviewRoutes =
  require("./routes/reviewRoutes");

const safetyRoutes =
  require("./routes/safetyRoutes");

const translatorRoutes =
  require("./routes/translatorRoutes");

const holidayRoutes =
  require(
    "./routes/holidayRoutes"
  );

dotenv.config();

const startServer =
  async () => {
    await connectDB();

    const app =
      express();

    app.use(cors());

    app.use(
      express.json()
    );

    app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "../uploads"
    )
  )
);

    app.use(
      "/api/auth",
      authRoutes
    );

    app.use(
      "/api/itinerary",
      itineraryRoutes
    );

    app.use(
      "/api/reviews",
      reviewRoutes
    );

    app.use(
      "/api/safety",
      safetyRoutes
    );

    app.use(
      "/api/translator",
      translatorRoutes
    );

    app.use(
      "/api/holidays",
      holidayRoutes
    );

    app.get(
      "/api/protected",
      protect,
      (req, res) => {
        res.json({
          success: true,
          message:
            "Protected Route Access Granted",
          user: req.user,
        });
      }
    );

    app.get(
      "/",
      (req, res) => {
        res.json({
          message:
            "INDIATOUR Backend Running 🚀",
        });
      }
    );

    const PORT =
      process.env.PORT ||
      5000;

    app.listen(
      PORT,
      () => {
        console.log(
          `Server running on port ${PORT}`
        );
      }
    );
  };

startServer();