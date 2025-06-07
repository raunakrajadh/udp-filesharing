const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('connect', { req, res })
});

module.exports = router;