const os = require('os');

const DEVICE_NAME = 'MyDevice-' + Math.floor(Math.random() * 10000);
const PIN = Math.floor(100000 + Math.random() * 900000).toString();

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '127.0.0.1';
}

module.exports = {DEVICE_NAME, PIN, localIP: getLocalIPAddress()};