const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const maxSize = 10 * 1024 * 1024; // 10MB

  if (req.file.size > maxSize) {
    fs.unlinkSync(req.file.path); // Delete the file if it exceeds the size limit
    return res.status(413).send('File too large. Max 10MB allowed.');
  }

  res.redirect('/');
});

module.exports = router;