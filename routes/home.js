const express = require('express');
const path = require('path');
const router = express.Router();

const { DEVICE_NAME, PIN, localIP } = require('../utils/deviceInfo');

const os = require('os');
const fs = require('fs');
const tempUploadPath = path.join(os.tmpdir(), 'skidrop_uploads');
if (!fs.existsSync(tempUploadPath)) fs.mkdirSync(tempUploadPath, { recursive: true });

router.get('/', (req, res) => {
  fs.readdir(tempUploadPath, (err, files) => {
    if (err) files = [];
    res.render('index', { req, res, deviceName: DEVICE_NAME, pin: PIN, ip: localIP, port: 8005, files });
  });
});

module.exports = router;