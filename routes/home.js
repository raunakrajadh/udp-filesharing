const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { DEVICE_NAME, PIN, localIP } = require('../utils/deviceInfo');

router.get('/', (req, res) => {
  fs.readdir(path.join(__dirname, '../uploads'), (err, files) => {
    if (err) files = [];
    res.render('index', {
      deviceName: DEVICE_NAME,
      pin: PIN,
      ip: localIP,
      port: 3000,
      files
    });
  });
});

module.exports = router;