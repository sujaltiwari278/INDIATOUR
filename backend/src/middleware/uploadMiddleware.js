const multer =
  require("multer");

const {
  CloudinaryStorage,
} = require(
  "multer-storage-cloudinary"
);

const cloudinary =
  require(
    "../config/cloudinary"
  );

const storage =
  new CloudinaryStorage({
    cloudinary,

    params: {
      folder:
        "indiatour-reviews",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],
    },
  });

const upload =
  multer({
    storage,
  });

  console.log(
  "Cloud Name:",
  process.env.CLOUDINARY_CLOUD_NAME
);

console.log(
  "API Key:",
  process.env.CLOUDINARY_API_KEY
    ? "Loaded"
    : "Missing"
);

console.log(
  "API Secret:",
  process.env.CLOUDINARY_API_SECRET
    ? "Loaded"
    : "Missing"
);

module.exports =
  upload;
