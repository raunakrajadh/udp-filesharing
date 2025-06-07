const express = require('express');
const router = express.Router();

const path = require('path');
const os = require('os');
const fs = require('fs');
const tempUploadPath = path.join(os.tmpdir(), 'skidrop_uploads');
if (!fs.existsSync(tempUploadPath)) fs.mkdirSync(tempUploadPath, { recursive: true });

router.post('/', (req, res) => {
  
    const { ip, port, pin } = req.body;
    if (!ip || !port || !pin) {
        return res.status(400).send('IP, port, and pin are required');
    }

    fetch(`http://${ip}:${port}/loadfiles/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
    })
    .then(response => response.json())
    .then(data => {
        res.json({ files: data.files });
    })
    .catch(error => {
        res.status(500).send('Error fetching files');
    });
});

router.post('/local', (req, res) => {

    const { pin } = req.body;
    //check pin

    fs.readdir(tempUploadPath, (err, files) => {
        if (err) return res.json({ files: [] });
        const fileInfos = files.map(fileName => {
            const filePath = path.join(tempUploadPath, fileName);
            const stats = fs.statSync(filePath);
            return {
                name: fileName,
                size: stats.size
            };
        });
        res.json({ files: fileInfos });
    });
});

module.exports = router;