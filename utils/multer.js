const multer = require('multer');
const path = require('path');

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200 MB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, base + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    // Optional: block certain file types here
    // Example: only allow images and zip
    // const allowedTypes = ['image/jpeg', 'image/png', 'application/zip'];
    // if (!allowedTypes.includes(file.mimetype)) return cb(new Error('Invalid file type'));
    cb(null, true);
  }
});

module.exports = upload;