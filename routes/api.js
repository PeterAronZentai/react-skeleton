var express = require('express');
var router = express.Router();

/* GET users listing. */
var stores = []

router.get('/', function(req, res, next) {
  res.json({ok:1})
});

module.exports = router;
