const dgram = require('dgram');
const { DEVICE_NAME, PIN, localIP } = require('./deviceInfo');

const BROADCAST_PORT = 41234;
const BROADCAST_INTERVAL = 3000;
const discoveredDevices = new Map();

function setupBroadcaster(httpPort) {
  const broadcaster = dgram.createSocket('udp4');
  broadcaster.bind(() => {
    broadcaster.setBroadcast(true);

    setInterval(() => {
      const message = JSON.stringify({
        deviceName: DEVICE_NAME,
        ip: localIP,
        port: httpPort,
        pin: PIN
      });

      broadcaster.send(
        message,
        0,
        message.length,
        BROADCAST_PORT,
        '255.255.255.255',
        (err) => err && console.error('UDP broadcast error:', err)
      );
    }, BROADCAST_INTERVAL);
  });
}

function setupListener() {
  const listener = dgram.createSocket('udp4');

  listener.on('error', (err) => {
    console.error(`UDP listener error:\n${err.stack}`);
    listener.close();
  });

  listener.on('message', (msg, rinfo) => {
    try {
      const device = JSON.parse(msg.toString());
      if (device.deviceName === DEVICE_NAME) return;

      discoveredDevices.set(device.deviceName, {
        ip: device.ip,
        port: device.port,
        pin: device.pin,
        lastSeen: Date.now()
      });
    } catch (err) {
      console.warn('Failed to parse UDP message:', err);
    }
  });

  listener.on('listening', () => {
    const address = listener.address();
    console.log(`UDP listener listening on ${address.address}:${address.port}`);
  });

  listener.bind(BROADCAST_PORT, () => {
    listener.setBroadcast(true);
  });
}

module.exports = {
  setupBroadcaster,
  setupListener,
  discoveredDevices
};
