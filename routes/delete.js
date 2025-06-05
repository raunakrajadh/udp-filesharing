const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.post('/', (req, res) => {
  const filename = req.body.filename;
  if (!filename) return res.status(400).send('Filename required.');

  const uploadsDir = path.join(__dirname, '../uploads');
  const filePath = path.join(uploadsDir, filename);
  if (!filePath.startsWith(uploadsDir)) return res.status(400).send('Invalid filename.');

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send('Failed to delete file.');
    res.redirect('/');
  });
});

module.exports = router;