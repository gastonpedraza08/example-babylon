const express = require('express');
const router = express.Router();
const { v4: uuidV4 } = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { id: uuidV4() });
});

module.exports = router;
