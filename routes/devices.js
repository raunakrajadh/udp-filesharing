const express = require('express');
const router = express.Router();
const { discoveredDevices } = require('../utils/udp');

router.get('/', (req, res) => {
  const now = Date.now();
  const DEVICE_TIMEOUT = 10 * 1000;

  for (const [name, device] of discoveredDevices) {
    if (now - device.lastSeen > DEVICE_TIMEOUT) discoveredDevices.delete(name);
  }

  res.json(Array.from(discoveredDevices.entries()).map(([deviceName, info]) => ({ deviceName, ip: info.ip, port: info.port, pin: info.pin})));
});

module.exports = router;