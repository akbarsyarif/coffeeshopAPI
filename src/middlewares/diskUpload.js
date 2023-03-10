const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = "./public/images";
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // gambar = images-field-timestamp.ekstensi
    const filename = `images-${file.originalname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const limits = 2e6; // 2 x 10^6

const fileFilter = (req, file, cb) => {
  const pattern = /jpg|png/i; // i = not case sensitive
  const ext = path.extname(file.originalname);
  if (!pattern.test(ext)) return cb(null, false);
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = {
  singleUpload: (fieldName) => upload.single(fieldName),
  multiUpload: (fieldName, maxCount) => upload.array(fieldName, maxCount),
};
