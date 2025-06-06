const express = require('express');
const path = require('path');
const { DEVICE_NAME, PIN, localIP } = require('./utils/deviceInfo');
const { setupBroadcaster, setupListener } = require('./utils/udp');

const app = express();
const PORT = 8005;

// Middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/home'));
app.use('/connect', require('./routes/connect'));
app.use('/loadfiles', require('./routes/loadfiles'));
app.use('/upload', require('./routes/upload'));
app.use('/delete', require('./routes/delete'));
app.use('/devices', require('./routes/devices'));

// Start server
app.listen(PORT, () => {
    console.log(`HTTP server running at http://${localIP}:${PORT}`);
    console.log(`Device name: ${DEVICE_NAME}, PIN: ${PIN}`);
    setupBroadcaster(PORT);
    setupListener();
});