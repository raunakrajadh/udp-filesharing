const express = require('express');
const path = require('path');
const router = express.Router();

const os = require('os');
const fs = require('fs');
const tempUploadPath = path.join(os.tmpdir(), 'skidrop_uploads');
if (!fs.existsSync(tempUploadPath)) fs.mkdirSync(tempUploadPath, { recursive: true });

router.post('/', (req, res) => {
  const filename = req.body.filename;
  if (!filename) return res.status(400).send('Filename required.');

  const filePath = path.join(tempUploadPath, filename);
  if (!filePath.startsWith(tempUploadPath)) return res.status(400).send('Invalid filename.');

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send('Failed to delete file.');
    res.redirect('/');
  });
});

module.exports = router;