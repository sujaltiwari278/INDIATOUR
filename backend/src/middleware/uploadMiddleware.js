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

    params: async (req, file) => ({
  folder: "indiatour-reviews",
  resource_type: "image",
}),
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
