var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")

/* GET home page. */
router.get('/', function(req, res, next) {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/recommendations.json"));
  let recommendations = JSON.parse(rawdata);
  res.render('recommendations', { recommendations: recommendations });
});

module.exports = router;