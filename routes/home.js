var express = require('express');
var router = express.Router();
const fs = require("fs");
const { data } = require('jquery');
const path = require("path")

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = fs.readFileSync(path.resolve(__dirname, "../data/introductionArray.json"));
  let array = JSON.parse(data);
  res.render('home', { array: JSON.parse(data)});
  console.log(array);
});
console.log(data);
module.exports = router;