/*const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  name: String,           // Optional note name/title
  fileUrl: String,        // Cloudinary or S3 URL
  subject: String,
  semester: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", noteSchema);
*/

const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fileUrl: { // Add this field to store the Cloudinary URL
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
