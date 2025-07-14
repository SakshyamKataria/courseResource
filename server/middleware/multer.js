/*const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cmma",
    allowed_formats: ["pdf", "docx", "pptx"],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
*/

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => { // params can now be a function
    return {
      folder: "cmma",
      resource_type: "raw", // Explicitly set resource_type to 'raw'
      allowed_formats: ["pdf", "docx", "pptx"],
      public_id: file.originalname.split('.').slice(0, -1).join('.') // Use original name without extension as public ID
    };
  },
});

const upload = multer({ storage: storage });

module.exports = upload;